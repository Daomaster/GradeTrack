angular.module('services', [])

.factory('ScheduleService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var schedules = [
    {
      label: "HW 1",
      time : new Date(2016, 1, 10),//"Jan 12th 10:40 am",
	  difficulty: 5,
	  classId: "#bdf8e6", // will prolly need better way to identify/translate to this
      id : 1,
	  note: "look at ch2 pg59-62"
    },
    {
      label: "HW 1",
      time : new Date(2016, 1, 10),//"Jan 1st 11:40 am",
	  difficulty: 2,
	  classId: "#add8e6",
      id : 2,
	  note: "review big-o"
    },
    {
      label: "HW 1",
      time : new Date(2016, 1, 11),//"Jan 1st 11:40 am",
	  difficulty: 3,
	  classId: "#adb8e6",
	  note: "ask that one guy for help"
    },
    {
      label: "HW 1",
		time : new Date(2016, 1, 12),//"Jan 20th 1:40 pm",
		difficulty: 5,
	  classId: "#7cc8e6",
	  note: "i dont even go here"
    }
  ];

  return {
    all: function() {
		var x = 0;
		var j = 0;
		
	   // insertion sort by difficulty
	   for (var i = 1; i < schedules.length; i++) {
		  x = schedules[i];
		  j = i - 1;
		  while (j >= 0 && schedules[j].difficulty < x.difficulty) {
			  schedules[j + 1] = schedules[j];
			  j = j - 1;
		  }
		  schedules[j + 1] = x;
	  }
		
	  // insertion sort by date object
	  for (var i = 1; i < schedules.length; i++) {
		  x = schedules[i];
		  j = i - 1;
		  while (j >= 0 && schedules[j].time > x.time) {
			  schedules[j + 1] = schedules[j];
			  j = j - 1;
		  }
		  schedules[j + 1] = x;
	  }
		
      return schedules;
    },
    remove: function(chat) {
      schedules.splice(schedules.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < schedules.length; i++) {
        if (schedules[i].id === parseInt(chatId)) {
          return schedules[i];
        }
      }
      return null;
    },
	plusOne: function(index) {
		schedules[index].difficulty++;
	},
	minusOne: function(index) {
		schedules[index].difficulty--;
	}
  };
})

.service('GradeService', function() {
  this.labels = ["Quiz 1", "Quiz 2", "Test 1", "Quiz 3", "Group Project", "Quiz 4", "Final"];
  this.series = ['Average', 'Yours'];
  this.yours = [28, 48, 40, 19, 86, 27, 90];
  this.average = [65, 59, 80, 81, 56, 55, 40];

  this.grades = [this.yours,this.average];

  //this.grades = [this.average,this.yours];


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
