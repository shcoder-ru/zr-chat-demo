/**
 * Base/Model
 */

;(function(global, Base, undefined){
  'use strict';

  var Model = global.Model = Base.extend({
    _attributes: {},
    init: function(data){
      var self = this;
      if (!data || typeof data !== 'object'){
        throw new TypeError('"data" must be a object type');
      }
      if (!this.storage){
        throw new TypeError('"storage" must be defined');
      }
      if (!this.schema){
        throw new TypeError('"schema" must be defined');
      }
      this.each(this.schema, function(key){
        self.setAttribute(key, data[key]);
      });
    },
    setAttribute: function(key, value){
      if (!this.schema[key]){
        throw new TypeError('property "'+key+'" is unacceptable');
      }
      if (this.schema[key].required && typeof value === 'undefined'){
        throw new TypeError('property "'+key+'" is required');
      }
      if (typeof value === 'undefined'){
        return this;
      }
      if (this.schema[key].type){
        this._attributes[key] = global[this.schema[key].type](value);
      } else {
        this._attributes[key] = value;
      }
      return this;
    },
    getAttribute: function(key){
      if (!this.schema[key]){
        throw new TypeError('property "'+key+'" is unacceptable');
      }
      return this._attributes[key];
    },
    save: function(){
      var self = this;
      if (this._attributes.id){
        return this.storage
          .update(this._attributes.id, this._attributes)
          .pipe(function(item){
             return new self.constructor(item);
          });
      }
      return this.storage
        .create(this._attributes)
        .pipe(function(item){
           return new self.constructor(item);
        });
    },
    remove: function(id){
      return this.storage.remove(id);
    }
  }, {
    create: function(value){
      var Self = this;
      return Self.prototype
        .storage
        .create(value)
        .pipe(function(item){
          return new Self(item);
        });
    },
    get: function(id){
      var Self = this;
      return this.prototype
        .storage
        .fetchOne(id)
        .pipe(function(item){
          return new Self(item);
        });
    },
    find: function(){
      var Self = this;
      return Self.prototype
        .storage
        .fetch()
        .pipe(function(list){
          return Self.prototype.map(list, function(item){
            return new Self(item);
          });
        });
    }
  });

  return Model;

})(window, Base);