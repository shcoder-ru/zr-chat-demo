/**
 * Views/ChatListItem
 */

;(function(global, View, undefined){
  'use strict';

  var ChatListItemView = global.ChatListItemView = View.extend({
    template: View.template('chatListItem'),
    init: function(event){
      var self = this;
      this.__super__.init.call(this);
      this.listEl = this.el.find('[data-chat-list]');
      this.textEl = this.el.find('[data-text]');
      this.avatarEl = this.el.find('[data-avatar]');
      this.el.find('.reply').click(function(){
        event.trigger('reply', self.data.item.getAttribute('id'));
      });
    },
    render: function(parent){
      this.__super__.render.call(this, parent);
      this.textEl.text(this.data.item.getAttribute('text'));
      this.avatarEl.attr('src', this.data.item.getAttribute('avatar'));
      return this;
    }
  });

  return ChatListItemView;

})(window, View);