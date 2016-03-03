console.log("a");
var app = angular.module('myApp', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/list', {
      templateUrl: 'list.html' ,
      controller:  'MainController'
    }) // templateUrlでテンプレートとなるファイルとテンプレ名を指定
    .when('/word', {
      templateUrl: 'template/list.html' 
    }) // 同様にテンプレ指定（ここでは遷移後）
    .otherwise({
      redirectTo: '/list'
    }); // 初めに表示するテンプレ名
}]);

app.controller('MainController', ['$scope', '$location', function($scope, $location){
  $scope.click = function(value) {
    $scope.value = value;
    $location.path('/bar/'); // クリック後遷移するテンプレ指定
  };
}]);

