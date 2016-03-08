/**
 * Base/View
 */

;(function(global, $, Base, undefined){
  'use strict';

  var View = global.View = Base.extend({
    $: $,
    data: {},
    setData: function(data){
      this.extend(this.data, data);
      return this;
    },
    render: function(parent){
      if (!parent || this.el){
        return this;
      }
      this.el = this.$(this.template);
      this.$(parent).append(this.el);
      return this;
    }
  }, {
    template: function(templateId){
      return $('#'+templateId).html();
    }
  });

  return View;

})(window, jQuery, Base);