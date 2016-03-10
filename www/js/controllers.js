angular.module('controllers', [])

.controller('ScheduleCtrl', function($scope, ScheduleService) {
    $scope.schedules = ScheduleService.all();
    $scope.remove = function(scheduleId) {
		ScheduleService.remove(scheduleId);
	};
  
	$scope.moveItem = function(item, fromIndex, toIndex) {
		ScheduleService.moveItem(item, fromIndex, toIndex);
  };
	
	$scope.getReorder = function() {
		return ScheduleService.getReorder();
	}
})

.controller('GradeCtrl', function($scope, $window, GradeService) {

  $scope.labels = GradeService.getObjects('labels');
  $scope.series = GradeService.getObjects('series');
  $scope.grades = GradeService.getObjects('grades');
  $scope.yours = GradeService.getObjects('yours');
  $scope.width = $window.innerWidth;
  console.log($scope.width);
  $scope.height = $window.innerHeight;
  console.log($scope.height);

})

.controller('ListCtrl', function($scope,$state, ScheduleService) {

  $scope.account = function(){ $state.go('lists.account');};
  $scope.grade = function(){$state.go('lists.grade');};
  $scope.schedule = function(){$state.go('lists.schedule');};
  
  $scope.toggleShowReorder = function() {
		ScheduleService.toggleShowReorder();
	}
})


.controller('PolarAreaCtrl', function ($scope, GradeService) {
  $scope.labels = GradeService.getObjects('labels');
  $scope.yours = GradeService.getObjects('yours');
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
