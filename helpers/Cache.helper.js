'use strict';

class Cache {

  constructor(savedData) {
    this.savedData = savedData;
    this.timeStamp = Date.now();
  }

}

module.exports = Cache;