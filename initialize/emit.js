var app = angular.module('App', ['ui.bootstrap']);

app.controller('ModalCtrl', ['$scope', '$modal', function($scope, $modal) {

    $scope.ShowModal = function(type) {
        var template = "template/"+type+".html";
        var ctrl = type+"Ctrl"
        $modal.open({
            templateUrl: template,
            controller: ctrl,
            size: 'sm'
        });
    };

}]);

app.controller('SigninCtrl', ['$scope', function($scope) {
    $scope.debug = function() {
        console.log("ログイン処理を行う");
    }
}]);

app.controller('SignupCtrl', ['$scope', function($scope) {
    $scope.debug = function() {
        console.log("登録処理を行う");
    }
}]);

console.log("loaded");