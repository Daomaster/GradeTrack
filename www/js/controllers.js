angular.module('controllers', [])

// Adding in $ionicPopup service to show when user
// clicks on note.

.controller('ScheduleCtrl', function($scope, $ionicPopup, ScheduleService, RealGradeService) {
    $scope.schedules = RealGradeService.getAssignmentArray();

  $scope.dataSet = false;

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

  .controller('LoginCtrl', function($scope, $window, $http, RealGradeService, LoginService)
  {
    $scope.username = "";
    $scope.userpassword = "";

    $scope.isLoggedIn = function()
    {
      return LoginService.loggedIn;
    };
    $scope.loggedInUser = function()
    {
      return LoginService.studentInfo.username;
    };

    $scope.logout = function()
    {
      //$$placeholder -- clear data?
      $scope.username="";
      $scope.userpassword="";
      LoginService.loggedIn = false;
      LoginService.username = "";
    };

    $scope.login = function()
    {
      var usr = this.username;
      var pwd = this.userpassword;

      if (usr == "" || pwd == "") return; // no input

      var loginInfo = {
        username: usr,
        password: pwd
      };


      $http.post("http://localhost:3000/api/auth/signin", loginInfo).then(
        function successCallback() {

          $scope.postLogin(usr);

        },

        function errorCallback() {
          //on Error
          console.log("Invalid");

        }
      );

    };

    $scope.postLogin = function(usr) // set data after login
    {
      var user = {
        username: usr
      };
      $http.post("http://localhost:3000/api/info/user", user).then(
        function successCallback(res) {

          if (!$scope.dataSet) // debounce
          {
            // student info
            LoginService.studentInfo.firstName = res.data.firstName;
            LoginService.studentInfo.lastName = res.data.lastName;
            LoginService.studentInfo.id = res.data.id;
            LoginService.studentInfo.email = res.data.email;
            LoginService.studentInfo.username = usr;


            RealGradeService.classes = [];
            for (var i = 0; i < res.data.courses.length; ++i)
            {
              var course = res.data.courses[i];
              var earned = res.data.courses[i].earned;
              var total = res.data.courses[i].total;
              var grade = 0;
              if (total != 0)
                grade = earned/total * 100;
              var c = RealGradeService.addClass(course.title, [], grade, grade, course.description);


              for (var key in course.assignments)
              {

                var assign = course.assignments[key];
                var _name = assign.title;
                var _grade = 0;
                if (assign.total != 0)
                  _grade = Math.round(assign.earned / assign.total * 100);
                var due = new Date(assign.due.year + "-" + assign.due.month + "-" + assign.due.day);
                var points = assign.earned;
                var _total = assign.total;
                var weight = "quiz";
                var descript = assign.description;



                var ave = 50; // need an average

                var a = c.addAssignment(_name, due, _grade, ave, points, _total, weight, descript);



              }


            }
            RealGradeService.populateAssignmentArray();

            $scope.dataSet = true;
          }


        },

        function errorCallback() {
          //on Error
          console.log("Invalid");

        }
      );

      //$$placeholder -- login, retrieve data
      LoginService.loggedIn=true;
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
