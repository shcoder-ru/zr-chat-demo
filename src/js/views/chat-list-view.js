/**
 * Views/ChatList
 */

;(function(global, View, ChatListItemView, undefined){
  'use strict';

  var ChatListView = global.ChatListView = View.extend({
    itemsIndex: {},
    template: View.template('chatList'),
    renderTo: function(parent){
      if (!parent){
        return this;
      }
      this.el = this.$(this.template);
      this.$(parent).append(this.el);
      return this;
    },
    createItem: function(data){
      // @TODO new ChatListItemView and append to itemsIndex
    }
  });

  return ChatListView;

})(window, View, ChatListItemView);