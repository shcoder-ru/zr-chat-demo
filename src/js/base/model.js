/**
 * Base/Model
 */

;(function(global, Base, undefined){
  'use strict';

  var Model = global.Model = Base.extend({
    init: function(data){
      var self = this;
      this._attributes = {};
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
        if ('defaultValue' in this.schema[key]){
          value = this.schema[key].defaultValue;
        } else {
          return this;
        }
      }
      if (this.schema[key].type){
        if (this.schema[key].type === 'Date'){
          this._attributes[key] = new global[this.schema[key].type](value);
        } else {
          this._attributes[key] = global[this.schema[key].type](value);
        }
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
            self.each(self.schema, function(key){
              self.setAttribute(key, item[key]);
            });
             return self;
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
      var self = this;
      var item = new self.prototype.constructor(value);
      return item.save();
    },
    get: function(id){
      var self = this;
      return this.prototype
        .storage
        .fetchOne(id)
        .pipe(function(item){
          return new self.prototype.constructor(item);
        });
    },
    find: function(){
      var self = this;
      return self.prototype
        .storage
        .fetch()
        .pipe(function(list){
          self.prototype.each(list, function(i, item){
            list[i] = new self.prototype.constructor(item);
          });
          return list;
        });
    }
  });

  return Model;

})(window, Base);