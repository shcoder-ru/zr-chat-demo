/**
 * Views/ChatListItem
 */

;(function(global, View, undefined){
  'use strict';

  var ChatListItemView = global.ChatListItemView = View.extend({
    template: View.template('chatListItem'),
    renderTo: function(parent){
      if (!parent){
        return this;
      }
      this.el = this.$(this.template);
      this.$(parent).append(this.el);
      return this;
    }
  });

  return ChatListItemView;

})(window, View);