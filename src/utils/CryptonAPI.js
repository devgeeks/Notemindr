/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

crypton.host = __CRYPTON_HOST__;
crypton.port = __CRYPTON_PORT__;

export let cryptonSession = null;

export default {

  login: (username, passphrase) => {
    return new Promise((resolve, reject) => {
      crypton.authorize(username, passphrase, (err, session) => {
        if (err !== null) return reject(err);
        cryptonSession = window.session = session;
        resolve(session.account);
      });
    });
  },

  logout: (username) => {
    return new Promise((resolve, reject) => {
      if (cryptonSession && cryptonSession.account
            && username === cryptonSession.account.username) {
        cryptonSession = null;
        resolve(null);
      }
      else {
        // @TODO better error message... could this even happen?
        reject('Credentials do not match');
      }
    });
  },

  getOrCreateItem: (key) => {
    return new Promise((resolve, reject) => {
      cryptonSession.getOrCreateItem(key, (err, item) => {
        if (err !== null) return reject(err);
        resolve({
          name: item.name,
          value: item.value
        });
      });
    });
  },

  getLocallyCachedItem: (key, username, passphrase) => {
    // fetch a locally cached Item from localStorage and decrypt it
    return new Promise((resolve, reject) => {
      const hashArray = sjcl.hash.sha256.hash(username);
      const hashedUsername = sjcl.codec.hex.fromBits(hashArray);
      const localCacheKey = `${key}_${hashedUsername}`;
      const encryptedCachedItem = localStorage.getItem(localCacheKey);
      if (encryptedCachedItem) {
        try {
          const decryptedCachedItemJson =
            sjcl.decrypt(passphrase, encryptedCachedItem, crypton.cipherOptions);
          resolve(decryptedCachedItemJson);
        }
        catch (ex) {
          reject(ex.message);
        }
      } else {
        resolve(null);
      }
    });
  },

  setLocallyCachedItem: (key, item, username, passphrase) => {
    return new Promise((resolve, reject) => {
      const hashArray = sjcl.hash.sha256.hash(username);
      const hashedUsername = sjcl.codec.hex.fromBits(hashArray);
      const localCacheKey = `${key}_${hashedUsername}`;
      const unencryptedItem = JSON.stringify(item);
      try {
        const encryptedItem = sjcl.encrypt(
          passphrase,
          unencryptedItem,
          crypton.cipherOptions
        );
        localStorage.setItem(localCacheKey, encryptedItem);
        resolve(true);
      }
      catch (ex) {
        reject(ex.message);
      }
    });
  }

}
