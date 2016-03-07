/**
 * Base/View
 */

;(function(global, $, Base, undefined){
  'use strict';

  var View = global.View = Base.extend({
    renderTo: function(){
      return this;
    },
    $: $
  }, {
    template: function(templateId){
      return $('#'+templateId).html();
    }
  });

  return View;

})(window, jQuery, Base);