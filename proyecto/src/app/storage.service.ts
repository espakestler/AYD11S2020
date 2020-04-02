import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  secretKey:string = "gtec"

  constructor(
    public storage: Storage
    ) { }

  // set a key/value
async set(key: string, value: any): Promise<any> 
{
  try 
  {
    let data = CryptoJS.AES.encrypt(value.toString(), this.secretKey).toString();

    const result = await this.storage.set(key, data);

    console.log('set string in storage: ' + result);
    
    return true;
  } 
  catch (reason) 
  {
    console.log(reason);
    
    return false;
  }
}

  // to get a key/value pair
  async get(key: string): Promise<any> 
  {
    try 
    {
      const result = await this.storage.get(key);

      console.log('storageGET: ' + key + ': ' + result);
      
      if (result != null) 
      {
        let bytes = CryptoJS.AES.decrypt(result, this.secretKey);

        return bytes.toString(CryptoJS.enc.Utf8);
      }
  
      return null;
    } 
    catch (reason) 
    {
      console.log(reason);

      return null;
    }
  }
  
  // set a key/value object
  async setObject(key: string, object: Object) 
  {
    try 
    {
      let data = CryptoJS.AES.encrypt(JSON.stringify(object), this.secretKey).toString();
      const result = await this.storage.set(key, data);
      
      console.log('set Object in storage: ' + result);
      
      return true;
    } 
    catch (reason) 
    {
      console.log(reason);
      
      return false;
    }
  }

  // get a key/value object
  async getObject(key: string): Promise<any> 
  {
    try 
    {
      const result = await this.storage.get(key);

      if (result != null) 
      {
        let bytes = CryptoJS.AES.decrypt(result, this.secretKey);

        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    
      return null;

    } 
    catch (reason) 
    {
      console.log(reason);
      
      return null;
    }
  }

  // remove a single key value:
  remove(key: string) 
  {
    this.storage.remove(key);
  }
  //  delete all data from your application:
  clear() 
  {
    this.storage.clear();
  }

  async getCurrentUser() : Promise<any> 
  {
    try 
    {
      const result = await this.storage.get('usuario');
      
      if (result != null) 
      {
        let bytes = CryptoJS.AES.decrypt(result, this.secretKey);

        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    
      return null;

    } 
    catch (reason) 
    {
      console.log(reason);
      
      return null;
    }
  }

}
