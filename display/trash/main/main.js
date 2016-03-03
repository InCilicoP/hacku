var app = angular.module('App', ['ui.bootstrap']);

app.controller('myCtrl', ['$scope', function($scope){
  // 画面全体に渡るコード
}])

app.controller('headerCtrl', ['$scope', function($scope){
  // headerで必要な機能のコード
   $scope.world = 'userID';
}])
app.controller('mainCtrl', ['$scope', function($scope){
  // main で必要な機能のコード
}])
app.controller('footerCtrl', ['$scope', function($scope){
  // footer で必要な機能のコード
}]);

console.log("hi");