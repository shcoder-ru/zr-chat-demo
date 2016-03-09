/**
 * Views/ChatListItem
 */

;(function(global, View, undefined){
  'use strict';

  var ChatFormView = global.ChatFormView = View.extend({
    template: View.template('chatForm'),
    init: function(event){
      var self = this;
      var submitHandler = function(){
        var value = self.valueEl.val();
        if (!value){
          return;
        }
        self.event.trigger('submit', {
          parentId: self.parentId || 0,
          text: value
        });
      };
      this._isOpened = false;
      this.__super__.init.call(this);
      this.event = event;
      this.hide();
      this.el.click(function(e){
        e.stopPropagation();
      });
      this.$('body').click(function(){
        self.close(true);
      });
      this.valueEl = this.el.find('[data-value]');
      this.submitEl = this.el.find('[data-submit]');
      this.submitEl.click(submitHandler);
      this.valueEl.keypress(function(e) {
        if(e.which === 13 && !e.shiftKey) {
          submitHandler();
        }
      });
    },
    hide: function(){
      this.el.hide();
    },
    show: function(){
      var self = this;
      this.el.show();
      setTimeout(function(){
        self.valueEl.focus();
      });
    },
    open: function(parentId){
      var self = this;
      this.parentId = parentId;
      this.el.slideDown(function(){
        self._isOpened = true;
        self.valueEl.focus();
      });
    },
    close: function(noForced){
      var self = this;
      if (this._isOpened || !noForced){
        this._isOpened = false;
        this.el.slideUp(function(){
          self.valueEl.val('');
          self.parentId = 0;
        });
      }
    }
  });

  return ChatFormView;

})(window, View);