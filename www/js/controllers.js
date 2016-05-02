angular.module('controllers', [])

// Adding in $ionicPopup service to show when user
// clicks on note.

.controller('ScheduleCtrl', function($scope, $ionicPopup, ScheduleService, RealGradeService) {
    $scope.schedules = RealGradeService.getAssignmentArray();

  $scope.colors =
    [
      "#668B8B",
      "#C1CDCD",
      "#F0FFFF",
      "#A4D3EE"
    ];
  $scope.getColor = function(index)
  {
    return colors[index % colors.length];
  };

    $scope.remove = function(scheduleId) {
      RealGradeService.remove(scheduleId);
	};

	$scope.moveItem = function(item, fromIndex, toIndex) {
    RealGradeService.moveItem(item, fromIndex, toIndex);
  };

	$scope.getReorder = function() {
		return RealGradeService.getReorder();
	};

	$scope.showPrompt = function (index) {
		var promptPopup = $ionicPopup.prompt({
			title: RealGradeService.asn(index).label,
			template: "Edit Note",
			inputType: 'text',
			defaultText: RealGradeService.asn(index).note
		});

		promptPopup.then(function(res) {
			if (res) {
        RealGradeService.setNote(index, res);
			}
		});
	};
})

  .controller('LoginCtrl', function($scope, $window, RealGradeService, LoginService)
  {
    $scope.username = "";
    $scope.password = "";

    $scope.isLoggedIn = function()
    {
      return LoginService.loggedIn;
    };
    $scope.loggedInUser = function()
    {
      return LoginService.username;
    };

    $scope.logout = function()
    {
      //$$placeholder -- clear data?
      this.username="";
      this.password="";
      LoginService.loggedIn = false;
      LoginService.username = "";
    };

    $scope.login = function()
    {
      //$$placeholder -- login, retrieve data
      LoginService.loggedIn=true;
      LoginService.username = this.username;
      console.log("attempted sign in as: " + this.username);
    };

  })
  .controller('GraphCtrl', function($scope, $window, RealGradeService)
  {
    $scope.courseName = RealGradeService.getActiveCourse().name;
    $scope.labels = RealGradeService.getLabelArray();
    $scope.series = RealGradeService.seriesArray();
    $scope.grades = RealGradeService.compiledGradeArray();
    $scope.yours = RealGradeService.getMyGradeArray();
  })

.controller('GradeCtrl', function($scope, $window, RealGradeService) {

  $scope.courses =RealGradeService.getClasses();

  $scope.SetActiveCourse = function(course)
  {
    RealGradeService.activeCourseID = course.id;
  };

})

.controller('ListCtrl', function($scope,$state, ScheduleService, RealGradeService, LoginService) {



  $scope.isLoggedIn = function()
  {
    return LoginService.loggedIn;
  };
  // populate grades with random data (list it loaded first, so all menus load)

  this.randomInt = function(min,max)
  {
    return Math.floor((Math.random() * (max-min)) + min);
  };
  var weights = [
    {type: "quiz",      weight: 20},
    {type: "homework",  weight: 20},
    {type: "midterm",   weight: 20},
    {type: "final",     weight: 40}
  ];
  for (var j = 0; j < 3; ++j)
  {
    var classGrade = this.randomInt(0, 100);//;
    var classAve =   this.randomInt(0, 100);
    var c = RealGradeService.addClass("CS" + (450+j), weights, classGrade, classAve);
    for (var i = 0; i < 5; ++i)
    {
      var due = new Date(2016, this.randomInt(0,5),this.randomInt(1,30));
      var points = this.randomInt(0, 300);
      var total = this.randomInt(0, 300) + points;
      var grade = this.randomInt(0, 100);
      var ave = this.randomInt(0, 100);
      var weight = weights[this.randomInt(0,4)].type;
      var a = c.addAssignment("Assignment"+i, due, grade, ave, points, total, weight);
      a.classId = '#'+Math.floor(Math.random()*16777215).toString(16);
    }
  }
  RealGradeService.populateAssignmentArray();


	// Need to use $scope.$on() to listen for events fired by state transitions
	// http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state
	$scope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams) {
		if (toState.name === 'lists.schedule') {
      RealGradeService.showToggle(true);
		} else {
      RealGradeService.showToggle(false);
      RealGradeService.showReorder(false); // Optional: Reset drag on exit
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
    RealGradeService.toggleShowReorder();
	};

	// This is for HTML button to know if it should be shown or not
	$scope.isToggleShown = function() {
		return RealGradeService.isToggleShown();
	};
})

  .controller('DashboardCtrl', function($scope, RealGradeService, ScheduleService) {


    $scope.test = RealGradeService.getAssignmentArray();


    $scope.groups = RealGradeService.getClasses();

    //gettors
    $scope.classLetterGrade = 		    function(_class) 	          { return RealGradeService.classLetterGrade(_class); 	              };
    $scope.classPercent = 			      function(_class) 	          { return RealGradeService.classGrade(_class); 							      	};
    $scope.getCategoryTotalPoints =   function(_class, category) 	{ return RealGradeService.getCategoryTotalPoints(_class, category); };
    $scope.getCategoryPoints = 		    function(_class, category) 	{ return RealGradeService.getCategoryPoints(_class, category); 			};
    $scope.getEarliestDue = 		      function(_class) 	          { return RealGradeService.earliestAssignmentDue(_class);	          };
    $scope.getCategoryGrade =         function(_class, category)  { return RealGradeService.getCategoryGrade(_class, category)        };
    $scope.getCompletedAssignments =  function(_class) 	          { return RealGradeService.getCompletedAssignments(_class); 	        };
    $scope.getTotalAssignments = 	    function(_class)	          { return RealGradeService.getTotalAssignments(_class);				      };

    // group collapsing
    $scope.toggleGroup =  function(group) 				{ group.show = !group.show; 													};
    $scope.isGroupShown = function(group) 				{ return group.show; 																	};

  });
