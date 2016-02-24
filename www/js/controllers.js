angular.module('controllers', [])


.controller('ScheduleCtrl', function($scope, ClassScheduleService) {

    $scope.schedules = ClassScheduleService.overallAssignmentList();
   
})

.controller('GradeCtrl', function($scope, ClassScheduleService) {

  $scope.labels = ClassScheduleService.getCompletedLabelArray(0);
  $scope.series = ['Average', 'Yours'];
  $scope.grades = ClassScheduleService.getCompiledGradeArray(0);
  $scope.yours = ClassScheduleService.getCompletedGradeArray(0);

})

.controller('PolarAreaCtrl', function ($scope, GradeService) {
  $scope.labels = GradeService.getObjects('labels');
  $scope.yours = GradeService.getObjects('yours');
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})








.controller('DashboardCtrl', function($scope, ClassScheduleService) {
	
	//populate class array randomly for now 
	$scope.randomInt = function(min,max)
	{
		return Math.floor((Math.random() * (max-min)) + min)
	}
	for (var j = 0; j < 10; ++j)
	{
		var c = ClassScheduleService.addClass("CS" + (450+j));
		for (var i = 0; i < 20; ++i)
		{
			var due = new Date(2016, $scope.randomInt(0,5),$scope.randomInt(1,30));
			var score = $scope.randomInt(0, 300);
			var weight = $scope.randomInt(0, 300) + score;
			var ave = $scope.randomInt(0, weight);
			c.addAssignment("Assignment"+i, due, score, weight, ave)
		}
	}
	$scope.groups = ClassScheduleService.getClasses();
	
	//gettors
	$scope.classLetterGrade = 		 function(_class) 	{ return ClassScheduleService.letterGrade(ClassScheduleService.totalPercent(_class)); 	};
	$scope.classPercent = 			 function(_class) 	{ return ClassScheduleService.totalPercent(_class); 									};
	$scope.getTotalPoints = 		 function(_class) 	{ return ClassScheduleService.overallWeight(_class); 									};
	$scope.getEarnedPoints = 		 function(_class) 	{ return ClassScheduleService.totalScore(_class);										};
	$scope.getEarliestDue = 		 function(_class) 	{ return ClassScheduleService.earliestAssignmentDue(_class); 							};
	$scope.getCompletedAssignments = function(_class) 	{ return ClassScheduleService.completedAssignments(_class); 							};
	$scope.getPossiblePoints = 		 function(_class)	{ return ClassScheduleService.totalWeight(_class);			 							};
	$scope.getTotalAssignments = 	 function(_class)	{ return ClassScheduleService.totalAssignments(_class);									};
	
	// group collapsing
	$scope.toggleGroup =  function(group) 				{ group.show = !group.show; 															};
	$scope.isGroupShown = function(group) 				{ return group.show; 																	};
	
});
