/**
 * Services/Storage
 */

;(function(global, Base, undefined){
  'use strict';

  var Storage = global.Storage = Base.extend({
    storage: global.localStorage,
    name: '',
    init: function(name){
      if (!name || typeof name !== 'string'){
        throw new TypeError('"name" must be a string type');
      }
      this.name = name;
    },
    _fetchData: function(){
      return JSON.parse(this.storage[this.name+'Collection'] || '[]');
    },
    _saveData: function(data){
      this.storage[this.name+'Collection'] = JSON.stringify(data);
    },
    _getIndexById: function(id, data){
      var i, len;
      for (i = 0, len = data.length; i < len; i++){
        if (data[i].id = id){
          return i;
        }
      }
      return -1;
    },
    create: function(value, cb){
      var dfd = this.deferred();
      var data = this._fetchData();
      var id = Date.now();
      value.id = id;
      value.created = value.updated = new Date();
      data.push(value);
      this._saveData(data);
      dfd.resolve(value);
      return dfd.promise();
    },
    update: function(id, value){
      var dfd = this.deferred();
      var data = this._fetchData();
      var index = this._getIndexById(id, data);
      if (index === -1){
        dfd.reject('Not found');
        return dfd.promise();
      }
      this.extend(data[index], value);
      value.updated = new Date();
      this._saveData(data);
      dfd.resolve(data[index]);
      return dfd.promise();
    },
    fetchOne: function(id){
      var dfd = this.deferred();
      var data = this._fetchData();
      var index = this._getIndexById(id, data);
      if (index === -1){
        dfd.reject('Not found');
      } else {
        dfd.resolve(data[index]);
      }
      return dfd.promise();
    },
    fetch: function(){
      var dfd = this.deferred();
      dfd.resolve(this._fetchData());
      return dfd.promise();
    },
    remove: function(id){
      var dfd = this.deferred();
      var data = this._fetchData();
      var index = this._getIndexById(id, data);
      data.splice(index, 1);
      this._saveData(data);
      dfd.resolve();
      return dfd.promise();
    },
    clear: function(){
      var dfd = this.deferred();
      this._saveData([]);
      dfd.resolve();
      return dfd.promise();
    }
  });

  return Storage;

})(window, Base);