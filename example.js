import ArcherC7 from './lib/ArcherC7.js';

const example = async function() {
  const archer = new ArcherC7('http://192.168.1.1', 'email', 'password');
  
  const devices = await archer.fetchDevices();
  console.log(devices);
}

example();
