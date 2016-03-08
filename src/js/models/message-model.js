/**
 * Models/Chat
 */

;(function(global, Model, Storage, undefined){
  'use strict';

  var MessageModel = global.MessageModel = Model.extend({
    storage: new Storage('message'),
    schema: {
      id: {
        type: 'String',
        required: false
      },
      text: {
        type: 'String',
        required: true
      }
    }
  });

  return MessageModel;

})(window, Model, Storage);