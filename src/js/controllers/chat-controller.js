/**
 * Controllers/Chat
 */

;(function(global, Controller, MessageModel, ChatListView, undefined){
  'use strict';

  var ChatController = global.ChatController = Controller.extend({
    view: new ChatListView(),
    init: function(){

      // var newItem = new MessageModel({
      //   text: 'Test text'
      // });
      // newItem.save();

      MessageModel
        .find()
        .done(function(items){
          console.log('items:', items);
        })
        .fail(function(err){
          console.log('err:', err);
        });

      this.view
        .setData({
          items: []
        })
        .render('#chatView');
    }
  });

  return ChatController;

})(window, Controller, MessageModel, ChatListView);