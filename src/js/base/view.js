/**
 * Base/View
 */

;(function(global, $, Base, undefined){
  'use strict';

  var View = global.View = Base.extend({
    $: $,
    init: function(){
      this._inserted = false;
      this.data = {};
      this.el = this.$(this.template);
    },
    setData: function(data){
      this.extend(this.data, data);
      return this;
    },
    render: function(parent){
      if (!parent || this._inserted){
        return this;
      }
      this.$(parent).append(this.el);
      this._inserted = true;
      return this;
    }
  }, {
    template: function(templateId){
      return this.prototype.$('#'+templateId).html();
    }
  });

  return View;

})(window, jQuery, Base);