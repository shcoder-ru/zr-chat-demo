/**
 * Base/Model
 */

;(function(global, Base, undefined){
  'use strict';

  var Model = global.Model = Base.extend({
    update: function(){},
    save: function(){},
    remove: function(){}
  }, {
    create: function(){},
    get: function(){},
    find: function(){}
  });

  return Model;

})(window, Base);