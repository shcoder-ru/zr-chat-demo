/**
 * Base
 */

;(function(global, $, undefined){
  'use strict';

  var Base = global.Base = function(){};

  Base.extend = function(protoProps, staticProps){
    var child, parent = this;
    if (protoProps && protoProps.constructor) {
      child = protoProps.constructor;
    } else {
      child = function(){
        return parent.apply(this, arguments);
      };
    }
    $.extend(child, parent, staticProps);
    $.extend(child.prototype, parent.prototype, protoProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
  };

  return Base;

})(window, jQuery);