var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    $scope.format = 'M/d/yy h:mm:ss a';

    $scope.isNumber = angular.isNumber;

    var refresh = function() {
        $http.get('/expenselist').success(function(response) {
            console.log("I got the data I requested");
            $scope.expenselist = response;
            $scope.expense = "";
        });
    };

    refresh();

    $scope.addExpense = function() {
        console.log($scope.expense.number);
        $scope.expense.time= new Date();
        $http.post('/expenselist', $scope.expense).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/expenselist/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/expenselist/' + id).success(function(response) {
            $scope.expense = response;
        });
    };

    $scope.update = function() {
        console.log($scope.expense._id);
        $http.put('/expenselist/' + $scope.expense._id, $scope.expense).success(function(response) {
            refresh();
        });
    };

    $scope.deselect = function() {
        $scope.expense = "";
    };

    $scope.showReport = function() {
        $http.get('/expenselist').success(function(response) {
            console.log("I got the data for report");
            $scope.expenselist = response;

        });
    }
}]);

