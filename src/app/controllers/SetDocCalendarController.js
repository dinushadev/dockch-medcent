(function() {

    angular
        .module('app')
        .controller('SetDocCalendarController', [
            '$timeout', '$q', '$scope', '$http', '$mdMedia', '$mdDialog',
            SetDocCalendarController
        ]);

    function SetDocCalendarController($timeout, $q, $scope, $http, $mdMedia,$mdDialog) {
        var vm = this;


        vm.selectedCountry = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.disableCaching = true;
      $scope.events = [
  {
    "title": "Today Event",
    "startDate": "2016-01-25T09:58:58.092Z",
    "endDate": null,
    "time": "21:00"
  },
  {
    "title": "Tomorrow",
    "startDate": "2016-01-26T09:58:58.092Z",
    "endDate": null,
    "time": "17:15"
  },
  {
    "title": "All-day event",
    "startDate": "2016-01-28T09:58:58.092Z",
    "endDate": null
  },
  {
    "title": "Two in one day!",
    "startDate": "2016-01-28T09:58:58.092Z",
    "endDate": null,
    "time": "09:00"
  },
  {
    "title": "Three in one day!",
    "startDate": "2016-01-28T09:58:58.092Z",
    "endDate": null,
    "time": "15:00"
  },
  {
    "title": "Multi-day event",
    "startDate": "2016-02-01T09:58:58.092Z",
    "endDate": "2016-02-02T09:58:58.092Z"
  }
];
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
