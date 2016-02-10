(function(){
  'use strict';

  angular.module('app')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'DOC LIST',
        icon: 'dashboard',
        sref: '.doclist'
      },
      {
        name: 'DOC CALENDER',
        icon: 'person',
        sref: '.setdoccalendar'
      },
      {
        name: 'ADD APPOINTMENT',
        icon: 'note add',
        sref: '.addappointment'
      },
      {
        name: 'PROFILE',
        icon: 'person',
        sref: '.profile'
      },
      {
        name: 'NOTIFICATION',
        icon: 'notification_module',
        sref: '.notification'
      }, 
      {
        name: 'APPOINTMENT',
        icon: 'assessment',
        sref: '.appointment'
      },
      {
        name: 'REPORTS',
        icon: 'assessment',
        sref: '.reports'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
