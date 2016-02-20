angular.module('controllers', [])

.controller('ScheduleCtrl', function($scope, ScheduleService) {
    $scope.schedules = ScheduleService.all();
    $scope.remove = function(scheduleId) {
    ScheduleService.remove(scheduleId);
  };
})

.controller('GradeCtrl', function($scope, GradeService) {

  $scope.labels = GradeService.getObjects('labels');
  $scope.series = GradeService.getObjects('series');
  $scope.grades = GradeService.getObjects('grades');
  $scope.yours = GradeService.getObjects('yours');

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








.controller('DashboardCtrl', function($scope) {
  $scope.groups = [];
  
  // populate the group with random data
	for (var i = 0; i <10; ++i)
	{
		$scope.groups[i] =
		{
			name: 'CS' + (420+i),
			items: [],
			show: false
		};
		for (var j = 0; j < Math.floor((Math.random()*200)+1); ++j) 
		{
			$scope.groups[i].items.push(
							{
								name:'Quiz ' + (j+1),
								weight: Math.floor((Math.random()*200)+1),
								score:	0,
								complete: false,
								duedate: new Date('2016', Math.floor((Math.random()*4)+1), Math.floor((Math.random()*30+1)))
							}
							);
			if ($scope.groups[i].items[j].duedate < new Date()) // past current date
				$scope.groups[i].items[j].complete = true;
			if ($scope.groups[i].items[j].complete)
				$scope.groups[i].items[j].score = Math.floor((Math.random()*$scope.groups[i].items[j].weight));
		}
	}
	
	//total points for all classes
	$scope.getTotalPoints = function(group)
	{
		var result = 0;
		for (var i = 0; i < group.items.length; ++i)
		{
			result += group.items[i].weight;
		}
		return result;
	}
	//total points earned
	$scope.getEarnedPoints = function(group)
	{
		var result = 0;
		for (var i =0; i < group.items.length; ++i)
		{
			result += group.items[i].score
		}
		return result;
	}
	// object of the earliest due assignment
	$scope.getEarliestDue = function(group)
	{
		var result = group.items[0];
		for (var i =0; i<group.items.length;++i)
		{
			if (group.items[i].duedate < result.duedate)
				result = group.items[i];
		}
		return result;
	}
	// number of completed assignments
	$scope.getCompletedAssignments = function(group)
	{
		var result = 0;
		for (var i =0; i<group.items.length;++i)
		{
			if (group.items[i].complete)
			++result;
		}
		return result;
	}
	// number of points in assignments that aren't due in the future
	$scope.getPossiblePoints = function(group)
	{
		var result = 0;
		var currentDate = new Date();
		for (var i = 0; i < group.items.length; ++i)
		{
			if (group.items[i].duedate < currentDate)
				result += group.items[i].weight;
		}
		return result;
	}
	// percent value of current grade (0-1), (earned / possible)
	$scope.getGradePercentage = function(group)
	{
		var score = 0.0;
		var total = 0.0;
		var currentDate = new Date();
		var num = 0;
		for (var i = 0; i < group.items.length; ++i)
		{
			if (group.items[i].duedate < currentDate)
			{
			++num;
				score += group.items[i].score;
				total += group.items[i].weight;
			}
		}
		
		if (total > 0)
			return score/total;
		return 1222;	// 100% if 0/0
	}
	// translates a grade percentage to a letter
	$scope.getGradeLetter = function(percent)
	{
		if (percent > 0.9)
			return 'A';
		if (percent > 0.8)
			return 'B';
		if (percent > 0.7)
			return 'C';
		if (percent > 0.6)
			return 'D';
		return 'F';
	}
	
	// group collapsing
	$scope.toggleGroup = function(group) {
		group.show = !group.show;
		};
	$scope.isGroupShown = function(group) {
		return group.show;
	};
});
