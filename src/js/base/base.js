/**
 * Base
 */

;(function(global, $, undefined){
  'use strict';

  var Base = global.Base = function(){
    this.init.apply(this, arguments);
  };

  $.extend(Base.prototype, {
    init: function(){}
  });

  Base.extend = function(protoProps, staticProps){
    var child, parent = this;
    if (protoProps && protoProps.hasOwnProperty('constructor')){
      child = protoProps.constructor;
    } else {
      child = function(){
        return parent.apply(this, arguments);
      };
    }
    $.extend(child, parent, staticProps);
    child.prototype = Object.create(parent.prototype);
    $.extend(child.prototype, protoProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
  };

  return Base;

})(window, jQuery);