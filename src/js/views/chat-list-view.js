/**
 * Views/ChatList
 */

;(function(global, View, ChatListItemView, undefined){
  'use strict';

  var ChatListView = global.ChatListView = View.extend({
    itemsIndex: {},
    template: View.template('chatList'),
    render: function(parent){
      var self = this;
      this.__super__.render.call(this, parent);
      if (this.data.items && this.data.items.length > 0){
        this.each(this.data.items, function(key, item){
          if (item.getAttribute('parentId') === 0){
            self.addItem(item);
          }
        });
      }
      return this;
    },
    addItem: function(item){
      var itemView = new ChatListItemView();
      itemView
        .setData({item: item})
        .render(this.el);
    }
  });

  return ChatListView;

})(window, View, ChatListItemView);