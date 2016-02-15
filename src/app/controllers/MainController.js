  (function(){

    angular
         .module('app')
         .controller('MainController', [
            'navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast','$rootScope',
            MainController
         ]);

    function MainController(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast, $rootScope) {
 
      var vm = this;
      vm.menuItems = [ ];
      vm.selectItem = selectItem;
      vm.toggleItemsList = toggleItemsList;
      vm.title = $state.current.data.title;
     $rootScope.showSimpleToast = showSimpleToast;

      navService
        .loadAllItems()
        .then(function(menuItems) {
          vm.menuItems = [].concat(menuItems);
        });

     
      function toggleItemsList() {
        var pending = $mdBottomSheet.hide() || $q.when(true);

        pending.then(function(){
          $mdSidenav('left').toggle();
        });
      }

   
       function selectItem (item) {
        vm.title = item.name;
        vm.toggleItemsList();
      //  vm.showSimpleToast(vm.title);
      }

     
        function showSimpleToast() {
      $mdToast.show(
        $mdToast.simple()
          .content("save successful fdfeer sdfe vdase sdfdfvsdsd seee")
          .hideDelay(20000)
          .position('top right')
      );
    };


    }

  })();
