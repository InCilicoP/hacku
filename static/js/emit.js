//Websocket
var socket = new WebSocket("ws://localhost:8080/ws");


/*
//for first.html
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
*/

//for list.html


var listapp = angular.module('App', ['ui.bootstrap']);
var items = {};

listapp.controller('headerCtrl', function($scope, $location){
    // headerで必要な機能のコード
});

listapp.controller('mainCtrl', function($scope){
  // main で必要な機能のコード
  $scope.items = items;

});

listapp.controller('footerCtrl', function($scope){
  // footer で必要な機能のコード
});


//responseによって発火する関数群
function resDisp(items){
    //リストに表示するアイテム達
    console.log("YO!!");
    //if(!items){
        var items = [{title:"タイトルがないよ",keyword:"keywordがないよ"},
                    {title:"タイトルがないよ",keyword:"keywordがないよ"}];
    //}
    console.log(items);
    listapp.controller('mainCtrl', function($scope){
        $scope.items = items;
    });
}

function resData(items){
    //可視化するためのjsonが降ってくる
}

function subResult(bool){
    //登録成功　bool = 1
    if(bool){
        alert("登録成功しました");
    }else{
        alert("登録失敗．．．")
    }
}

function sf(bool){
    //ログイン成功　bool = 1
    if(bool){
        alert("ログイン成功しました");
    }else{
        alert("ログイン失敗．．．")
    }
}

//発信イベント
function subText(userid, url){

}

socket.onopen = function() {
    console.log('openしたよ');
    var testJson = {key:'reqDisp',value:"kinme"};
    socket.send(JSON.stringify(testJson));
    //接続直後の処理
    var massage = {   key:"reqDisp",
    value:"{userid:kinme}"
};
  socket.send(JSON.stringify(massage));
};

socket.onmessage = function(message) {
    //console.log(message);
    try {
        var wsRes = $.parseJSON(message.data);
        console.log("test"+wsRes);
        if(wsRes.key == "resDisp"){
            console.log('yo');
        }
        switch (wsRes.key){
            case 'resDisp':
            resDisp(wsRes.value);
            break;

            case 'resData':
            resData(wsRes.value);
            break;

            case 'sf':
            sf();
            break;

            case 'subResult:
            subResult();
            break;

        }
    } catch (e) {
        alert(e);
        return;
    }
}

resDisp("a");
