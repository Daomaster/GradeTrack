angular.module('services', [])

.factory('ScheduleService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shcedules = [
    {
      label: "Quiz 1",
      time : "Jan 1st 11:40 am",
      id : 1
    },
    {
      label: "Quiz 2",
      time : "Jan 12th 10:40 am",
      id : 2
    },
    {
      label: "Quiz 3",
    time : "Jan 20th 1:40 pm",
      id : 3
    }
  ];

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
})

.service('GradeService', function() {
  this.labels = ["Quiz 1", "Quiz 2", "Test 1", "Quiz 3", "Group Project", "Quiz 4", "Final"];
  this.series = ['Average', 'Yours'];
  this.yours = [28, 48, 40, 19, 86, 27, 90];
  this.average = [65, 59, 80, 81, 56, 55, 40];
  this.grades = [this.average,this.yours];


  this.getObjects = function(name){
    switch(name){

      case 'labels':
      return this.labels;
      break;

      case 'series':
      return this.series;
      break;

      case 'grades':
      return this.grades;
      break;

      case 'yours':
      return  this.yours;
      break;

    }
  };


});
