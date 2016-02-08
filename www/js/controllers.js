angular.module('controllers', [])

.controller('ScheduleCtrl', function($scope, ScheduleService) {
    $scope.schedules = ScheduleService.all();
    console.log($scope.schedules);
    $scope.remove = function(schedule) {
    ScheduleService.remove(schedule);
  };
})

.controller('GradeCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
