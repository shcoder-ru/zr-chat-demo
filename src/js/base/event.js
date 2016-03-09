/**
 * Base/Event
 */

;(function(global, $, Base, undefined){
  'use strict';

  var Event = global.Event = Base.extend({
    init: function(){
      this.handlers = {};
    },
    on: function(name, fn){
      if (typeof name !== 'string'){
        throw new TypeError('"name" must be a string type');
      }
      if (typeof fn !== 'function'){
        throw new TypeError('"fn" must be a function');
      }
      this.handlers[name] = this.handlers[name] || [];
      this.handlers[name].push(fn);
    },
    trigger: function(name){
      var i, len;
      if (!this.handlers[name]){
        return;
      }
      for (i = 0, len = this.handlers[name].length; i < len; i++){
        this.handlers[name][i].apply(this, arguments);
      }
    }
  });

  return Event;

})(window, jQuery, Base);