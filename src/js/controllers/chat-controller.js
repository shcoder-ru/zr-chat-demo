/**
 * Controllers/Chat
 */

;(function(global, Controller, MessageModel, ChatListView, ChatFormView, undefined){
  'use strict';

  var ChatController = global.ChatController = Controller.extend({
    init: function(){

      var self = this;
      self.__super__.init.call(this);
      self.listView = new ChatListView(self.event);
      self.formView = new ChatFormView(self.event);
      self.formView.render('#chatView');

      self.load();

    },
    events: {
      reply: function(event, id){
        this.formView.open(id);
      },
      submit: function(event, data){
        var self = this;
        MessageModel
          .create(data)
          .done(function(){
            self.load();
            self.formView.close();
          })
          .fail(function(err){
            console.log(err);
          });
      }
    },
    load: function(){
      var self = this;
      MessageModel
        .find()
        .done(function(items){
          self.listView
            .setData({items: items})
            .render('#chatView');
          if (items.length === 0){
            self.formView.show();
          }
        })
        .fail(function(err){
          console.log('err:', err);
        });
    }
  });

  return ChatController;

})(window, Controller, MessageModel, ChatListView, ChatFormView);