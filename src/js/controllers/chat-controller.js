/**
 * Controllers/Chat
 */

;(function(global, Controller, ChatModel, ChatListView, undefined){
  'use strict';

  var ChatController = global.ChatController = Controller.extend({
    view: new ChatListView(),
    init: function(){
      this.view.renderTo('#chatView');
    }
  });

  return ChatController;

})(window, Controller, ChatModel, ChatListView);