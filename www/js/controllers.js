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
	// Need to use $scope.$on() to listen for events fired by state transitions
	// http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state
	$scope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams) {
		if (toState.name === 'lists.schedule') {
			ScheduleService.showToggle(true);
		} else {
			ScheduleService.showToggle(false);
			ScheduleService.showReorder(false); // Optional: Reset drag on exit
		}
	});
	
	// In these views, Reorder should be hidden
	/*$scope.account = function() {
		ScheduleService.showToggle(false);
		$state.go('lists.account');
	};
	$scope.grade = function() {
		ScheduleService.showToggle(false);
		$state.go('lists.grade');
	};
	
	// Going to Schedule view, so show Reorder button
	$scope.schedule = function(){
	  ScheduleService.showToggle(true); 
	  
	  $state.go('lists.schedule');
	};*/
  
	// This is when user clicks Reorder toggle/button
  $scope.toggleShowReorder = function() {
		ScheduleService.toggleShowReorder();
	}
	
	// This is for HTML button to know if it should be shown or not
	$scope.isToggleShown = function() {
		return ScheduleService.isToggleShown();
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
