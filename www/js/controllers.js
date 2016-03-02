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

.controller('ListCtrl', function($scope,$state) {

  $scope.account = function(){ $state.go('lists.account');};
  $scope.grade = function(){$state.go('lists.grade');};
  $scope.schedule = function(){$state.go('lists.schedule');};

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
