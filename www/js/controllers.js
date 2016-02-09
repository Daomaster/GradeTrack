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

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
