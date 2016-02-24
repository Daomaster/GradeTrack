angular.module('services', [])

.factory('ScheduleService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var schedules = [
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
    }
  };
})


/*
	-------CLASS FORMAT-------
	Class
	{
		int 	id;					// for internal/array usage
		string  name;				// name of class
		assignments[];				// assignments in class (array)
		function addAssignment		// add an assignment to this class
		function removeAssignment	// remove an assignment from this class
	}
	-------ASSIGNMENT FORMAT--------
	Assignment
	{
		int 	id;			// for internal/array usage
		string 	name;		// assignment name
		Date 	dueDate;	// assignment due date
		int 	weight;		// how much the assignment is worth
		int 	score;		// score user recieved on the assignment
		int 	average;	// class average of the assignment
		class	parent;		// holds the class this assignment belongs to, for referencing purposes
	}
	
	Usage:
	var c = this.addClass("CS477");
	c.addAssignment("Quiz 1", new Date(2016, 5, 25), 20, 200, 50)   	// name, duedate, score, weight, average
	
*/
.service('ClassScheduleService', function() {

	var classes = [];
	
	this.addClass = function(_name)
	{
		var _class =
		{
			name: 			_name,
			id: 			classes.length,	// farthest id
			assignments: 	[],				// empty assignment array
			
		    addAssignment: function(_name,_dueDate, _score, _weight,_average)
			{
				var assignment =
				{
					id: 		this.assignments.length,
					name: 		_name,
					dueDate: 	_dueDate,
					score:		_score,
					weight: 	_weight,
					average: 	_average,
					parent:		this
				}
				_class.assignments.push(assignment);
			},
			removeAssignment: function(_name)
			{
				for (var i in this.assignments)
				{
					if (this.assignments[i].name == _name)
					{
						array.splice(i, 1);
						return;
					}
				}
			}
			
			
		}
		classes.push(_class);
		return _class;			// for ease of use
	}
	this.letterGrade = function(percent)
	{
		if (percent >=0.9)
			return 'A';
		if (percent >=0.8)
			return 'B';
		if (percent >= 0.7)
			return 'C';
		if (percent >= 0.6)
			return 'D';
		return 'F';
	}
	
	this.overallAssignmentList = function()
	{
		var result = [];
		for (var i in classes)
		{
			for (var j in classes[i].assignments)
			{
				result.push(classes[i].assignments[j]);
			}
		}
		result.sort(function(a,b) { return a.dueDate - b.dueDate; });
		return result;
	}
	this.completedAssignments = function(_class)
	{
		var result = 0;
		for (var i =0; i<_class.assignments.length;++i)
		{
			if (new Date() < _class.assignments[i].dueDate)
			++result;
		}
		return result;
	}
	this.totalAssignments = function(_class)
	{
		return _class.assignments.length;
	}
	this.earliestAssignmentDue = function(_class)
	{
		var result = _class.assignments[0];
		for (var i =0; i<_class.assignments.length;++i)
		{
			if ((_class.assignments[i].dueDate > result.dueDate)		// earliest due
				&& (_class.assignments[i].dueDate > new Date()))		// and not already done	
				result = _class.assignments[i];
		}
		return result;
	}
	
	this.totalScore = function(_class)
	{
		var total = 0;
		for (i in _class.assignments)
		{
			total += _class.assignments[i].score;
		}
		return total;
	}
	this.totalWeight = function(_class)
	{
		var total = 0;
		for (i in _class.assignments)
		{
			if (new Date() < _class.assignments[i].dueDate)	// only count finished assignments
				total += _class.assignments[i].weight;
		}
		return total;
	}
	this.overallWeight = function(_class)
	{
		var total = 0;
		for (i in _class.assignments)
		{
				total += _class.assignments[i].weight;
		}
		return total;
	}
	this.totalPercent = function(_class)
	{
		return this.totalScore(_class) / this.totalWeight(_class);
	}
	this.getClasses = function() { return classes; }
	this.getClass = function(id)
	{
		for (i in classes)
		{
			if (classes[i].id == id) return classes[i];
		}
	}
	this.getCompletedGradeArray = function(id)
	{
		var c = this.getClass(id);
		var array = [];
		for (i in c.assignments)
		{
			if (new Date() < c.assignments[i].dueDate)	// past due date
				array.push(c.assignments[i].score);
		}
		return array;
	}
	this.getAverageCompletedGradeArray = function(id)
	{
		var c = this.getClass(id);
		var array = [];
		for (i in c.assignments)
		{
			if (new Date() < c.assignments[i].dueDate)	// past due date
				array.push(c.assignments[i].average);
		}
		return array;
	}
	this.getCompletedLabelArray = function(id)
	{
		var c = this.getClass(id);
		var array = [];
		for (i in c.assignments)
		{
			if (new Date() < c.assignments[i].dueDate)	// past due date
				array.push(c.assignments[i].name);
		}
		return array;
	}
	this.getCompiledGradeArray = function(id)
	{
		return [this.getCompletedGradeArray(id),this.getAverageCompletedGradeArray(id)];
	}
})
;