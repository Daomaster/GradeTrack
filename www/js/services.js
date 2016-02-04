angular.module('services', [])

.factory('ScheduleService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shcedules = [];

  return {
    all: function() {
      return shcedules;
    },
    remove: function(chat) {
      shcedules.splice(shcedules.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < shcedules.length; i++) {
        if (shcedules[i].id === parseInt(chatId)) {
          return shcedules[i];
        }
      }
      return null;
    }
  };
});
