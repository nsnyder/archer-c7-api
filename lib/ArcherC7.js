import axios from 'axios';
import encrypt from './vendor/encrypt.js';

const errorCodes = {
  authenticationExpired: 'Authentication expired.',
  loginFailed: 'Login failed. Please check your username and password.',
  unknown: 'Unknown error.',
  userConflict: 'Another user is logged in to this device.',
};

const tpLinkErrors = {
  timeout: 'timeout',
  loginFailed: 'login failed',
  userConflict: 'user conflict',
};

export default class ArcherC7 {
  cookie;
  domain;
  forceLogin;
  hasAuthentication = false;
  password;
  polite;
  token = null;
  username;

  constructor(
    domain,
    username,
    password,
    config = { debug: false, polite: true }
  ) {
    this.polite = !!config.polite;

    if (config.debug) {
      axios.interceptors.request.use(request => {
        console.log('Request', JSON.stringify(request));
        return request;
      });
      axios.interceptors.response.use(response => {
        console.log('Response', response.data, response.status);
        return response;
      });
    }

    this.domain = domain;
    this.password = password;
    this.username = username;
  }

  _prepareFormData(params) {
    const formData = new URLSearchParams();

    for (const param in params) {
      formData.append(param, params[param]);
    }

    return formData;
  }

  async _fetchToken() {
    console.log('Fetching a new token.');

    // const keyFormData = new URLSearchParams();
    // keyFormData.append('operation', 'read');
    const keyFormData = this._prepareFormData({
      operation: 'read'
    });

    const { data: { data: { password: loginKeys } } } = await axios.post(
      `${ this.domain }/cgi-bin/luci/;stok=/login?form=cloud_login`,
      keyFormData.toString()
    );

    // The loginKeys may need to be converted into an object of the form:
    // {
    //   0: 'FD69E944E9B7DFBD30F2135D12E80A786AB1071E1A32C9FC66D30B24F2DF09FE8FE7ADD05113673B45A3F5497649804022F185E7874EDB6BEC3D875B0576B14969164206A7B3C3674B058A358E2A0E3D8AE309D14630C82EE271B4FA3AD6C316AB5A553BD880F843154731D7F1276BDBB200B1540AEBFF34FA1F29676F5E438B',
    //   1: '10001'
    // }
    const tokenizedPassword = encrypt(this.password, loginKeys);

    const loginObject = {
      operation: 'login',
      username: this.username,
      password: tokenizedPassword
    };
    if (this.forceLogin) {
      loginObject.confirm = 'true';
    }
    const loginFormData = this._prepareFormData(loginObject);

    const response = await axios.post(
      `${ this.domain }/cgi-bin/luci/;stok=/login?form=cloud_login`,
      loginFormData.toString()
    );
    const {
      headers: { 'set-cookie': cookies },
      data: { data: { stok: token }, errorcode: errorCode }
    } = response;

    if (errorCode === tpLinkErrors.loginFailed) {
      throw errorCodes.loginFailed;
    }

    const parsedCookies = cookies.shift()
      .split(';')
      .reduce((prev, curr) => {
        const splitValues = curr.split('=');
        prev[splitValues[0]] = curr;
        return prev;
      }, {});

    // Store the token and the cookie for the next request.
    this.cookie = parsedCookies['sysauth'];
    this.token = token;
    this.hasAuthentication = true;
  }

  _resetAuth() {
    this.token = null;
    this.cookie = null;
    this.hasAuthentication = false;
  }

  async fetchDevices() {
    try {
      const {
        access_devices_wired: devices,
        access_devices_wireless_host: wirelessDevices
      } = await this.fetchStatus();
  
      // Merge the wired and wireless devices.
      return devices.concat(wirelessDevices);
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }

  async fetchStatus() {
    let tokenIsFresh = false;

    // This request actually has a *ton* more data than I'm returning right now.
    // This is a good start.
    try {
      if (!this.hasAuthentication) {
        await this._fetchToken();
        tokenIsFresh = true;
      }

      const formData = this._prepareFormData({
        operation: 'read'
      });

      const { data: { data, errorcode: errorCode } } = await axios.post(
        `${ this.domain }/cgi-bin/luci/;stok=${ this.token }/admin/status?form=all`,
        formData.toString(),
        { headers: { Cookie: this.cookie } }
      );

      if (!data) {
        if (errorCode === tpLinkErrors.timeout) {
          throw errorCodes.authenticationExpired;
        }
        if (errorCode === tpLinkErrors.userConflict) {
          throw errorCodes.userConflict;
        }

        throw errorCodes.unknown;
      }

      return data;
    } catch (exception) {
      // If the authentication is expired and we didn't get a fresh token,
      // reset the authorization and try again.
      if (
        !tokenIsFresh &&
        (
          exception === errorCodes.authenticationExpired ||
          (exception === errorCodes.userConflict && !this.polite)
        )
      ) {
        console.log('Authorization expired.');

        this._resetAuth();
        this.forceLogin = true;
        return await this.fetchStatus();
      }

      throw exception;
    }
  }

  async logout() {
    if (!this.token || !this.cookie) {
      return;
    }

    const formData = this._prepareFormData({ operation: 'write' });
    await axios.post(
      `${ this.domain }/cgi-bin/luci/;stok=${ this.token }/admin/system?form=logout`,
      formData.toString(),
      { headers: { Cookie: this.cookie } }
    );
  }
}
