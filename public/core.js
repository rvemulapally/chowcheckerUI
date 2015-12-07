var chowcheckerUI = angular.module('chowcheckerUI', []);
chowcheckerUI.controller('mainController', mainController);
chowcheckerUI.run(function($http) {
  $http.defaults.headers.common.apiKey = 'Y2hvd2NoZWNrZXIyMDE1';
});
chowcheckerUI .config(function ( $httpProvider) {        
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

var baseApiUrl = "https://aqueous-coast-7114.herokuapp.com";

function mainController($scope, $http) {
    $scope.ages = ["Puppy", "Adult", "Senior"];

    $http.get(baseApiUrl + '/breeds')
        .success(function(data) {
            $scope.breeds = data.list;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}