angular.module('services', [])

.service('ScheduleService', function() {
  // Might use a resource here that returns a JSON array
  var showReorderBtn = false;
  var toggleVisibility = true;
  var paddingFromRight = 0;

  var username;
  var password;
  var loggedIn = false;

  // Some fake testing data
  var schedules = [
    {
      label: "HW 1",
      time : new Date(2016, 1, 10),//"Jan 12th 10:40 am",
	  classId: "#bdf8e6", // will prolly need better way to identify/translate to this
      id : 1,
	  note: "look at ch2 pg59-62"
    },
    {
      label: "HW 1",
      time : new Date(2016, 1, 10),//"Jan 1st 11:40 am",
	  classId: "#add8e6",
      id : 2,
	  note: "review big-o"
    },
    {
      label: "HW 1",
      time : new Date(2016, 1, 11),//"Jan 1st 11:40 am",
	  classId: "#adb8e6",
	  note: "ask that one guy for help"
    },
    {
      label: "HW 1",
		time : new Date(2016, 1, 12),//"Jan 20th 1:40 pm",
	  classId: "#7cc8e6",
	  note: "i dont even go here"
    }
  ];

  return {
    all: function() {
		var x = 0;
		var j = 0;
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
	moveItem: function(item, fromIndex, toIndex) {
		//Move the item in the array
		schedules.splice(fromIndex, 1);
		schedules.splice(toIndex, 0, item);
	},
	showToggle: function(show) {
		toggleVisibility = show;
	},
	isToggleShown: function () {
		return toggleVisibility;
	},
	toggleShowReorder: function() {
		showReorderBtn = !showReorderBtn;
		if (showReorderBtn) {
			paddingFromRight = 11;
		} else {
			paddingFromRight = 0;
		}
	},
	showReorder: function(show) {
		showReorderBtn = show;
	},
	getReorder: function() {
		return {show: showReorderBtn, pad: paddingFromRight};
	},
	asn: function(index) {
		return schedules[index];
	},
	setNote: function(index, res) {
		schedules[index].note = res;
	}
  };
})


  .service('RealGradeService', function() {

    this.activeCourseID = 0;
    this.getActiveCourse = function()
    {
      return classes[this.activeCourseID];
    };

    var schedules = [];
    this.getAssignmentArray = function() { return schedules; };
    this.populateAssignmentArray = function()
    {
      for (var i in classes)
      {
        for (var j in classes[i].assignments)
        {
          schedules.push(classes[i].assignments[j]);
        }
      }
    };

    var classes = [];
    // always use this when adding a class
    this.addClass = function(_name, _weights, _grade, _average)
    {
      var _class =
      {
        name: 		_name,
        weights:    _weights,
        grade:    _grade,
        average:  _average,
        id: 			classes.length,	// farthest id
        assignments: 	[],				// empty assignment array

        // always use when adding assignment to a class
        addAssignment: function(_name,_dueDate, _grade, _average, _points, _total, _type)
        {
          var assignment =
          {
            parent:		this,
            id: 		  this.assignments.length,
            name: 		_name,
            dueDate: 	_dueDate,
            grade:  _grade,
            average: 	_average,
            points:		_points,
            total: 	_total,
            type: _type,
            //schedule vars
            classId: "#7cc8e6",
            note: "i dont even go here"
          };
          _class.assignments.push(assignment);
          return assignment;
        }
      };
      classes.push(_class);
      return _class;			// for ease of use
    };

    this.getAllAssignments = function()
    {
      var result = [];
      for (i in classes)
      {
        for (var j in classes[i].assignments)
          result.push(classes[i].assignments[j])
      }
      return result;
    };


    this.getCategoryPoints = function(_class, category)
    {
      var total = 0;
      for (var i in _class.assignments) {
        if (_class.assignments[i].type == category)
          total += _class.assignments[i].points;
      }
      return total;
    };

    this.getCategoryTotalPoints = function(_class, category)
    {
      var total = 0;
      for (var i in _class.assignments) {
        if (_class.assignments[i].type == category)
          total += _class.assignments[i].total;
      }
      return total;
    };

    this.getClasses = function() { return classes; };
    this.classGrade = function(_class) {
      return _class.grade;
    };
    this.classLetterGrade = function(_class) {
      var grade = _class.grade;
      if (grade >= 90)
        return 'A';
      if (grade >= 80)
        return 'B';
      if (grade >= 70)
        return 'C';
      if (grade >= 60)
        return 'D';
      return 'F';
    };
    this.earliestAssignmentDue = function(_class)
    {
      var result = _class.assignments[0];
      for (var i =0; i<_class.assignments.length;++i)
      {
        if ((_class.assignments[i].dueDate > result.dueDate)		// earliest due
          && (_class.assignments[i].dueDate > new Date()))		  // and not already done
          result = _class.assignments[i];
      }
      return result;
    };
    this.getCategoryGrade = function(_class, category)
    {
      var pts = this.getCategoryPoints(_class, category);
      var total = this.getCategoryTotalPoints(_class, category);
      if (total != 0)
        return pts / total * 100;
      return  "100"
    };
    this.getCompletedAssignments = function(_class)
    {
      var result = 0;
      for (var i in _class.assignments)
      {
        if (new Date() > _class.assignments[i].dueDate)
          ++result;
      }
      return result;

    };

    //
    //    graph functions
    //
    this.getTotalAssignments = function(_class)
    {
      return _class.assignments.length;
    };
    this.getLabelArray = function(_class)
    {
      _class = classes[this.activeCourseID];
      var result = [];
      for (var i in _class.assignments)
      {
        result.push(_class.assignments[i].name);
      }
      return result;
    };
    this.getMyGradeArray = function(_class)
    {
      _class = classes[this.activeCourseID];
      var result = [];
      for (var i in _class.assignments)
      {
        result.push(_class.assignments[i].grade);
      }
      return result;
    };
    this.getAverageArray = function(_class)
    {
      _class = classes[this.activeCourseID];
      var result = [];
      for (var i in _class.assignments)
      {
        result.push(_class.assignments[i].average);
      }
      return result;
    };
    this.compiledGradeArray = function(_class)
    {
      return [this.getMyGradeArray(_class), this.getAverageArray(_class)];
    };
    this.seriesArray = function()
    {
      return ['Average','Yours'];
    };
    this.series = ['Average', 'Yours'];

    //
    // schedule functions -- probably a better way to do this in separate services, but this works for now
    //
    var showReorderBtn = false;
    var toggleVisibility = true;
    var paddingFromRight = 0;
    this.remove = function(chat) {
      schedules.splice(schedules.indexOf(chat), 1);
    };
    this.get = function(chatId) {
      for (var i = 0; i < schedules.length; i++) {
        if (schedules[i].id === parseInt(chatId)) {
          return schedules[i];
        }
      }
      return null;
    };
    this.moveItem = function(item, fromIndex, toIndex) {
      //Move the item in the array
      schedules.splice(fromIndex, 1);
      schedules.splice(toIndex, 0, item);
    };
      this.showToggle =  function (show) {
        toggleVisibility = show;
      };
      this.isToggleShown = function () {
        return toggleVisibility;
      };
      this.toggleShowReorder = function () {
        showReorderBtn = !showReorderBtn;
        if (showReorderBtn) {
          paddingFromRight = 11;
        } else {
          paddingFromRight = 0;
        }
      };
      this.showReorder = function (show) {
        showReorderBtn = show;
      };
      this.getReorder= function () {
        return {show: showReorderBtn, pad: paddingFromRight};
      };
      this.asn= function (index) {
        return schedules[index];
      };
      this.setNote= function (index, res) {
        schedules[index].note = res;
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
