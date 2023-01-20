import localStorage from './dataSource/localStorage';
import sessionStorage from './dataSource/sessionStorage';
import cookie from './dataSource/cookie';
import cache from './dataSource/cache';
import {s3} from './dataSource/s3';

export default function StorageManager(type = 'localStorage') {
  let dataSource;

  if (type === 'localStorage') {
    dataSource = localStorage();
  } else if (type === 'sessionStorage') {
    dataSource = sessionStorage();
  } else if (type === 'cookie') {
    dataSource = cookie();
  } else if (type === 'cache') {
    dataSource = cache();
  } else if (type === 's3') {
    dataSource = s3();
  } else {
    throw new Error(`Invalid storage type: ${type}`);
  }

  const { set: setData, get: getData, remove: deleteData, clear: clearData, getAll: getAllData, has: hasData } = dataSource;

  const salt = 'h9#g1$f8@d7%b6^c5&e4*a3';

  function encryptKey(data) {
    if (type === 's3') {
      return data;
    }
    const dataString = JSON.stringify(data);
    const dataStringWithSalt = salt + dataString + salt;
    console.log('dataStringWithSalt:', dataStringWithSalt);
    const encryptedData = btoa(dataStringWithSalt);
    console.log('encryptedData:', encryptedData);
    return encryptedData;
  }

  this.set = function(key, value) {
    if (type === 's3') {
      setData(key, value);
      return;
    }
    const dataString = JSON.stringify(value);
    const dataStringWithSalt = salt + dataString + salt;
    const encodedDataString = btoa(dataStringWithSalt);
    const encryptedKey = encryptKey(key);
    setData(encryptedKey, encodedDataString);
  }

  this.get = async function(key) {
    const encryptedKey = encryptKey(key);
    const encodedDataString = await getData(encryptedKey);
    if (encodedDataString) {
      if (type === 's3') {
        return encodedDataString;
      }
      const dataStringWithSalt = atob(encodedDataString);
      const dataString = dataStringWithSalt.slice(salt.length, -salt.length);
      return JSON.parse(dataString);
    }
    return false;
  }

  this.remove = function(key) {
    const encryptedKey = encryptKey(key);
    deleteData(encryptedKey);
  }

  this.clear = function() {
    clearData();
  }

  this.getAll = function() {
    const allData = getAllData();
    const decryptedData = {};
    for (const [encryptedKey, encodedValue] of Object.entries(allData)) {
      const dataStringWithSalt = atob(encodedValue);
      const dataString = dataStringWithSalt.slice(salt.length, -salt.length);
      const value = JSON.parse(dataString);
      const key = JSON.parse(atob(encryptedKey));
      decryptedData[key] = value;
    }
    return decryptedData;
  }
  
  this.has = function(key) {
    const encryptedKey = encryptKey(key);
    return hasData(encryptedKey);
  }
}