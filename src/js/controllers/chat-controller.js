/**
 * Controllers/Chat
 */

;(function(global, Controller, MessageModel, ChatListView, undefined){
  'use strict';

  var ChatController = global.ChatController = Controller.extend({
    view: new ChatListView(),
    init: function(){

      var self = this;
      // MessageModel.create({
      //   text: 'Test text'
      // }).done(function(item){
      //   console.log(item);
      // });

      MessageModel
        .find()
        .done(function(items){

          console.log(items);

          self.view
            .setData({
              items: items
            })
            .render('#chatView');

        })
        .fail(function(err){
          console.log('err:', err);
        });

    }
  });

  return ChatController;

})(window, Controller, MessageModel, ChatListView);