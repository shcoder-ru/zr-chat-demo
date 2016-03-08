/**
 * Views/ChatList
 */

;(function(global, View, ChatListItemView, undefined){
  'use strict';

  var ChatListView = global.ChatListView = View.extend({
    itemsIndex: {},
    template: View.template('chatList'),
    render: function(parent){
      // @TOD update
      return this.__super__.render.call(this, parent);
    },
    addItem: function(data){
      // @TODO new ChatListItemView and append to itemsIndex
    }
  });

  return ChatListView;

})(window, View, ChatListItemView);