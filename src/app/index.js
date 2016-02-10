'use strict';

angular.module('DockchMC', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app'])

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.doclist', {
        url: '/doclist',
        templateUrl: 'app/views/doclist.html',
         controllerAs: 'vm',
        data: {
          title: 'DocList'
        }
      })
      .state('home.profile', {
        url: '/profile',
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        }
      })
      .state('home.addappointment', {
        url: '/addappointment',
        controller: 'AddAppointmentController',
        controllerAs: 'vm',
        templateUrl: 'app/views/addappointment.html',
        data: {
          title: 'Table'
        }
      })
      .state('home.appointment', {
        url: '/appointment',
        controller: 'AppointmentController',
        controllerAs: 'vm',
        templateUrl: 'app/views/appointment.html',
        data: {
          title: 'Table'
        }
      })
      .state('home.setdoccalendar', {
        url: '/setdoccalendar',
        controller: 'SetDocCalendarController',
        controllerAs: 'self',
        templateUrl: 'app/views/setdoccalendar.html',
        data: {
          title: 'Table'
        }
      })
     ;

    $urlRouterProvider.otherwise('/doclist');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');

/*    $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753'
    });*/

    $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
  });
