/**
 * Views/ChatList
 */

;(function(global, View, ChatListItemView, undefined){
  'use strict';

  var ChatListView = global.ChatListView = View.extend({
    template: View.template('chatList'),
    init: function(event){
      this.__super__.init.call(this);
      this.itemsIndex = {};
      this.event = event;
    },
    render: function(parent){
      var self = this;
      var lastEl;
      self.__super__.render.call(self, parent);
      if (self.data.items && self.data.items.length > 0){

        self.each(self.data.items, function(key, item){
          var itemView, id = item.getAttribute('id');
          if (self.itemsIndex[id]){
            return;
          }
          itemView = new ChatListItemView(self.event);
          itemView.setData({item: item});
          self.itemsIndex[id] = itemView;
          lastEl = itemView.el;
        });

        self.each(self.itemsIndex, function(id, itemView){
          var parentEl;
          var parentId = itemView.data.item.getAttribute('parentId');
          if (parentId === 0){
            parentEl = self.el;
          } else {
            parentEl = self.itemsIndex[parentId].listEl;
          }

          itemView.render(parentEl);

        });

        if (lastEl){
          self.$('html, body').animate({
            scrollTop: lastEl.offset().top - parseInt($('.main').css('padding-top'))
          }, 400);
        }

      }
      return self;
    }
  });

  return ChatListView;

})(window, View, ChatListItemView);