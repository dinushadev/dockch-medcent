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
        sref: '.profile'
      },
      {
        name: 'APOINTMENT',
        icon: 'view_module',
        sref: '.apointment'
      },
      {
        name: 'PROFILE',
        icon: 'view_module',
        sref: '.profile'
      },
      {
        name: 'NOTIFICATION',
        icon: 'view_module',
        sref: '.notification'
      },
      {
        name: 'REPORTS',
        icon: 'view_module',
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
