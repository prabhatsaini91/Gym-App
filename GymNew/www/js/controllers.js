angular.module('gym.controllers',[])

.controller('AppController', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ExerciseDetailController',['$scope','baseURL','exercise', function($scope, baseURL, exercise) {
    $scope.baseURL = baseURL;
    $scope.exercise = exercise;    
    
}])

.controller('ExerciseListController',['$scope','baseURL','exercises', function($scope, baseURL, exercises) {
    
    $scope.baseURL = baseURL;
    $scope.exercises = exercises;
}])

.controller('RoutineController', ['$scope','baseURL', 'routines', function($scope, baseURL, routines) {
    
    $scope.baseURL = baseURL;
    $scope.routines = routines;
}])

.controller('HomeController',['$scope','baseURL','exercises','routine','diet', function($scope, baseURL, exercises, routine, diet) {
    $scope.baseURL = baseURL;
    $scope.routine = routine;
    $scope.exercises = exercises;
    $scope.diet = diet;
    
    
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
}])

.controller('RoutineDetailController',['$scope','baseURL','routine', function($scope, baseURL, routine) {
    $scope.routine = routine;
    $scope.baseURL = baseURL;
    
    $scope.exercises = routine.exercises;
}])
;