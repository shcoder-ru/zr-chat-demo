/**
 * Base/Controller
 */

;(function(global, $, Base, Event, undefined){
  'use strict';

  var Controller = global.Controller = Base.extend({
    init: function(){
      var self = this;
      self.event = new Event();
      if (typeof self.events === 'object'){
        self.each(self.events, function(name, handler){
          self.event.on(name, function(){
            handler.apply(self, arguments);
          });
        });
      }
    }
  });

  return Controller;

})(window, jQuery, Base, Event);