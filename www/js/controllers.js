angular.module('controllers', [])

.controller('ScheduleCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, ScheduleService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.schedules = ScheduleService.all();
  $scope.remove = function(schedule) {
    ScheduleService.remove(schedule);
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
