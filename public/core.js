var chowcheckerUI = angular.module('chowcheckerUI', ['ui.bootstrap.modal', 'ui.bootstrap.tpls']);
chowcheckerUI.controller('mainController', mainController);
chowcheckerUI.run(function($http) {
  $http.defaults.headers.common.apiKey = 'Y2hvd2NoZWNrZXIyMDE1';
});
chowcheckerUI .config(function ( $httpProvider) {        
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

var baseApiUrl = "https://aqueous-coast-7114.herokuapp.com";

function mainController($scope, $http, $uibModal) {
    $scope.ages = ["Puppy", "Adult", "Senior"];
    $scope.results;

    $http.get(baseApiUrl + '/breeds')
        .success(function(data) {
            $scope.breeds = data.list;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.doSubmit = function() {
        $http.post(baseApiUrl + '/collection/filter', {
            name: "dogs",
            query: "AgeCategory: \"" + $scope.selectedAge + "\""
        }).success(function(data) {
            $scope.results = data.results;
            console.log(data);
        }).error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.openModal = function() {
        $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function () {
                  return ['a', 'b', 'c', 'd', 'e'];
                }
            }
        });
    }
}

chowcheckerUI.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});