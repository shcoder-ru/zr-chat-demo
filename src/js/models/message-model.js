/**
 * Models/Chat
 */

;(function(global, Model, Storage, undefined){
  'use strict';

  var MessageModel = global.MessageModel = Model.extend({
    storage: new Storage('message'),
    schema: {
      id: {
        type: 'Number',
        required: false
      },
      parentId: {
        type: 'Number',
        required: false,
        defaultValue: 0
      },
      text: {
        type: 'String',
        required: true
      },
      avatar: {
        type: 'String',
        required: false,
        defaultValue: '/img/default-avatar.png'
      },
      created: {
        type: 'Date',
        required: false
      },
      updated: {
        type: 'Date',
        required: false
      }
    }
  });

  return MessageModel;

})(window, Model, Storage);