/**
 * Views/ChatListItem
 */

;(function(global, View, undefined){
  'use strict';

  var ChatListItemView = global.ChatListItemView = View.extend({
    template: View.template('chatListItem'),
    render: function(parent){
      this.__super__.render.call(this, parent);
      return this;
    }
  });

  return ChatListItemView;

})(window, View);