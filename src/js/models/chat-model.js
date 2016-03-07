/**
 * Models/Chat
 */

;(function(global, Model, undefined){
  'use strict';

  var ChatModel = global.ChatModel = Model.extend({
    schema: {
      id: {
        type: 'String',
        length: 20,
        id: 1
      },
      text: {
        type: 'String',
        required: true,
        length: 500
      },
      date: {
        type: 'Date',
        required: true
      }
    }
  });

  return ChatModel;

})(window, Model);