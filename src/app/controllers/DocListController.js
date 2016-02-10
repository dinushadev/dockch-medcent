(function() {

    angular
        .module('app')
        .controller('docListController', [
            '$mdEditDialog', '$q', '$scope', '$timeout', '$mdDialog', '$mdMedia', '$http',
            docListController
        ]);

    function docListController($mdEditDialog, $q, $scope, $timeout, $mdDialog, $mdMedia, $http) {
        var vm = this;
        vm.title = "DOCTORS";
        vm.docLists = [];
        vm.selected = [];
        vm.query = {
            order: 'name',
            limit: 5,
            page: 1
        };



        $http.get('app/doclist.json').then(function(result) {
           // $scope.doclists = result.data;
            vm.docLists = result.data;

        });


        vm.getTypes = function() {
            return ['Candy', 'Ice cream', 'Other', 'Pastry'];
        };

        vm.onPaginate = function(page, limit) {
            // $scope.$broadcast('md.table.deselect');

            console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
            console.log('Page: ' + page + ' Limit: ' + limit);

            vm.promise = $timeout(function() {

            }, 2000);
        };

        vm.deselect = function(item) {
            console.log(item.name, 'was deselected');
        };

        vm.log = function(item) {
            console.log(item.name, 'was selected');
        };

        vm.loadStuff = function() {
            vm.promise = $timeout(function() {

            }, 2000);
        };

        vm.onReorder = function(order) {

            console.log('Scope Order: ' + $scope.query.order);
            console.log('Order: ' + order);

        };


        // Doc serch and add popup window

        vm.status = '  ';
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        vm.showAlert = function(ev) {
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



        vm.searchAandAddDoc = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/partials/searchAndAddDoc.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    vm.status = 'You said the information was "' + answer + '".';
                }, function() {
                    vm.status = 'You cancelled the dialog.';
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
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