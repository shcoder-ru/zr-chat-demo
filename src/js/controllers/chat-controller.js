/**
 * Controllers/Chat
 */

;(function(global, Controller, ChatModel, ChatView, undefined){
  'use strict';

  var ChatController = global.ChatController = Controller.extend({
    view: new ChatView({
      tplList: 'chatList',
      tplListItem: 'chatListItem'
    })
  });

  return ChatController;

})(window, Controller, ChatModel, ChatView);