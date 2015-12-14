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

    $scope.showIngredients = function(index) {
        console.log('Product selected:', $scope.results[index]);
        var product = $scope.results[index];
        $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                product: function () {
                  return product;
                }
            }
        });
    }

    $scope.clear = function() {
        $scope.results = null;
    }
}

chowcheckerUI.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, product) {
    try {
        product.Ingredients = JSON.parse(product.Ingredients);
    } catch(e) {}
    $scope.selected = product;

    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };
});