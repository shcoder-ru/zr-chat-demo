/**
 * Views/Chat
 */

;(function(global, View, undefined){
  'use strict';

  var ChatView = global.ChatView = View.extend({
    init: function(props){
      console.log(props);
    }
  });

  return ChatView;

})(window, View);