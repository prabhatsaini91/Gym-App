// Ionic gym App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'gym' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'gym.controllers' is found in controllers.js
angular.module('gym', ['ionic', 'gym.controllers','gym.services','ui.bootstrap','ngAnimate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppController'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
          controller: 'HomeController',
          resolve : {
              exercises: ['exerciseFactory', function(exerciseFactory) {
                  var exercise = [];
                  for(var i=0;i<8;i++) {
                      var number = Math.floor((Math.random()*34) + 0);
                          exercise.push(exerciseFactory.get({id:number}));
                  }
                  return exercise;
                }],
              routine :['routineFactory', function(routineFactory) {
                  return routineFactory.get({id:36});
              }],
              
              diet: ['dietFactory', function(dietFactory) {
                  return dietFactory.query();
              }]
              
          }
      }
    }
  })
  
  
  .state('app.routine', {
      url: '/routine',
      views: {
          'menuContent': {
              templateUrl: 'templates/routine.html',
              controller: 'RoutineController',
              resolve : {
                routines: ['routineFactory', function(routineFactory){
                    return routineFactory.query();
                }]
              }
          }
      }
  })
  
  .state('app.exercise', {
      url: '/exercise',
      views: {
        'menuContent': {
          templateUrl: 'templates/exercise.html'
        }
    }
})

  
  .state('app.exerciselist', {
      url: '/exercise/:category',
      views: {
          'menuContent': {
              templateUrl: 'templates/exerciselist.html',
              controller: 'ExerciseListController',
              resolve : {
                exercises: ['$stateParams','exerciseFactory', function($stateParams, exerciseFactory){
                    return exerciseFactory.query({category:$stateParams.category});
                }]
              }
          }
      }
  })
  
  .state('app.exercisedetail', {
    url: '/:id',
    views: {
        'menuContent': {
            templateUrl: 'templates/exercisedetail.html',
            controller: 'ExerciseDetailController',
            resolve: {
            exercise: ['$stateParams','exerciseFactory', function($stateParams, exerciseFactory){
                return exerciseFactory.get({id:parseInt($stateParams.id, 10)});
                }]
            }   
        }
    }
})
  
  .state('app.routinedetail', {
      url:'/routine/:id',
      views: {
          'menuContent':{
              templateUrl: 'templates/routinedetail.html',
              controller: 'RoutineDetailController',
              resolve: {
                  routine: ['$stateParams','routineFactory', function($stateParams, routineFactory) {
                      return routineFactory.get({id:parseInt($stateParams.id, 10)})
                  }]
              }
              
          }
      }
  })

;
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
