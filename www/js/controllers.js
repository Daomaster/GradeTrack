angular.module('controllers', [])

.controller('ScheduleCtrl', function($scope, ScheduleService) {
    $scope.schedules = ScheduleService.all();
    $scope.remove = function(scheduleId) {
		ScheduleService.remove(scheduleId);
	};
  
	$scope.moveItem = function(item, fromIndex, toIndex) {
		ScheduleService.moveItem(item, fromIndex, toIndex);
  };
  
	$scope.toggleShowReorder = function() {
		ScheduleService.toggleShowReorder();
	}
	
	$scope.getReorder = function() {
		return ScheduleService.getReorder();
	}
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
});
