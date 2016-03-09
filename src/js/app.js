;(function(ChatController, Storage, MessageModel){
  'use strict';


  /**
   * Test messages
   */
  var tmpStorage = new Storage('tmp');

  tmpStorage
    .fetchOne('mockupFirstLoaded')
    .fail(function(){

      var mockupText = 'Lorem ipsum dolor sit amet, consectetur '+
      'adipisicing elit, sed do eiusmod tempor incididunt ut labore '+
      'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '+
      'exercitation ullamco laboris nisi ut aliquip ex ea commodo '+
      'consequat.';

      MessageModel
        .create({text: mockupText})
        .done(function(message){
          MessageModel.create({
            parentId: message.getAttribute('id'),
            text: mockupText
          });
        });
      MessageModel.create({text: mockupText});

      /**
       * Clear only messages
       * new Storage('message').clear();
       *
       * Clear all
       * localStorage.clear();
       */

      tmpStorage.create({id: 'mockupFirstLoaded'});

    });

  /**
   * Init controller
   */
  new ChatController();

})(ChatController, Storage, MessageModel);