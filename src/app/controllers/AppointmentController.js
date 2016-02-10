(function() {

    angular
        .module('app')
        .controller('AppointmentController', [
            '$timeout', '$q', '$scope', '$http', '$mdMedia', '$mdDialog',
            AppointmentController
        ]);

    function AppointmentController($timeout, $q, $scope, $http, $mdMedia, $mdDialog) {
        var vm = this;


        vm.selectedCountry = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.disableCaching = true;

        $scope.appointmetList = [{
            "patient": "Kasun Abc",
            "date": "2016-01-25",
            "doctor": "Hemal Perera",
            "appNo": "21"
        }, {
           "patient": "Nipuna Perera",
            "date": "2016-01-25",
            "doctor": "Kasun Iddamalgoda",
            "appNo": "21"
        }, {
            "patient": "Prabath wani",
            "date": "2016-01-25",
            "doctor": "Vinoth De Cilva",
            "appNo": "21"
        }];

        function querySearch(query) {
            var results = query ? vm.countries.filter(createFilterFor(query)) : [],
                deferred;
            deferred = $q.defer();
            $timeout(function() {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }


        $http.get('app/doclist.json').then(function(doclist) {
            $scope.doclist = doclist.data;
            // $timeout(function () {
            //   $scope.desserts = desserts.data;
            // }, 1000);
        });

        $scope.showAvaliability = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                    controller: AppointmentController,
                    templateUrl: 'app/views/partials/docAvailability.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
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
})();
