(function(){

  angular
       .module('app')
       .controller('docListController', [
          '$mdEditDialog', '$q', '$scope', '$timeout','$mdDialog','$mdMedia',
          docListController
       ]);

  function docListController($mdEditDialog, $q, $scope, $timeout,$mdDialog,$mdMedia) {
  

   $scope.selected = [];
  
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
  
  $scope.columns = [{
    name: 'DDD',
    orderBy: 'name',
    unit: '100g serving'
  }, {
    descendFirst: true,
    name: 'Type',
    orderBy: 'type'
  }, {
    name: 'Calories',
    numeric: true,
    orderBy: 'calories.value'
  }, {
    name: 'Fat',
    numeric: true,
    orderBy: 'fat.value',
    unit: 'g'
  }, /* {
    name: 'Carbs',
    numeric: true,
    orderBy: 'carbs.value',
    unit: 'g'
  }, */ {
    name: 'PPPPP',
    numeric: true,
    orderBy: 'protein.value',
    trim: true,
    unit: 'g'
  }, /* {
    name: 'Sodium',
    numeric: true,
    orderBy: 'sodium.value',
    unit: 'mg'
  }, {
    name: 'Calcium',
    numeric: true,
    orderBy: 'calcium.value',
    unit: '%'
  }, */ {
    name: 'Iron',
    numeric: true,
    orderBy: 'iron.value',
    unit: '%'
  }, {
    name: 'Comments',
    orderBy: 'comment'
  }];
  
   $scope.desserts ={
};
  
  $scope.editComment = function (event, dessert) {
    event.stopPropagation();
    
    var promise = $mdEditDialog.large({
      // messages: {
      //   test: 'I don\'t like tests!'
      // },
      modelValue: dessert.comment,
      placeholder: 'Add a comment',
      save: function (input) {
        dessert.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    });
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };
  
  $scope.getTypes = function () {
    return ['Candy', 'Ice cream', 'Other', 'Pastry'];
  };
  
  $scope.onPaginate = function(page, limit) {
    // $scope.$broadcast('md.table.deselect');
    
    console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
    console.log('Page: ' + page + ' Limit: ' + limit);
    
    $scope.promise = $timeout(function () {
      
    }, 2000);
  };
  
  $scope.deselect = function (item) {
    console.log(item.name, 'was deselected');
  };
  
  $scope.log = function (item) {
    console.log(item.name, 'was selected');
  };
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      
    }, 2000);
  };
  
  $scope.onReorder = function(order) {
    
    console.log('Scope Order: ' + $scope.query.order);
    console.log('Order: ' + order);
    
    $scope.promise = $timeout(function () {
      
    }, 2000);
  };


// Doc serch and add popup window

   $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };




  $scope.searchAandAddDoc = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/views/partials/searchAndAddDoc.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };



}

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}


})();
