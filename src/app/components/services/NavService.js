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
        name: 'APPOINTMENT',
        icon: 'note add',
        sref: '.appointment'
      },
      {
        name: 'PROFILE',
        icon: 'view_module',
        sref: '.test'
      },
      {
        name: 'NOTIFICATION',
        icon: 'notification_module',
        sref: '.notification'
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
