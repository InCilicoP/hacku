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


//responseによって発火する関数群
function resDisp(items){
    //リストに表示するアイテム達
    //if(!items){
        var items = [{title:"タイトルがないよ",keyword:"keywordがないよ"},
                    {title:"タイトルがないよ",keyword:"keywordがないよ"}];
    //}
    //console.log(items);
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

function resGomi(value){
    console.log("come resGomi");
    console.log(value);
    make(value);
}

//発信イベント
function subText(userid, url){

}

function reqGomi(userid){
    console.log("emit");
    var massage = {key:'reqGomi',value:userid};
    socket.send(JSON.stringify(massage));
}

function reqGomis(users){
    var massage = {key:'reqGomis',value:users};
    socket.send(JSON.stringify(massage));
}

socket.onopen = function() {
    console.log('openしたよ');
    var testJson3 = {
      key:'reqNewGomi',
      value:['AZ37','discord_teck'],
    };
    socket.send(JSON.stringify(testJson3));
    /*
    var testJson = {key:'reqDisp',value:"kinme"};
    socket.send(JSON.stringify(testJson));
    var testJson2 = {key:'reqGomi',value:'discord_teck'};
    socket.send(JSON.stringify(testJson2));
    */
    //接続直後の処理
    //var massage = {   key:"reqDisp",
    //value:"{userid:kinme}"
    console.log("before emit");
    var user1 = "discord_teck";
    var user2 = "AZ37";
    reqGomis(["AZ37",user1]);
    //resGomi(user1);
};
  //socket.send(JSON.stringify(massage));
//};

socket.onmessage = function(message) {
    try {
        var wsRes = $.parseJSON(message.data);
        console.log("res : "+wsRes.key);
        if(wsRes.key == "resDisp"){
            //console.log('yo');
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

            case 'subResult':
            subResult();
            break;

            case 'resGomi':
            resGomi(wsRes.value);
            break;

            case 'resGomis':
            console.log(wsRes);
            resGomi(wsRes.value);
            break;
        }
    } catch (e) {
        alert(e);
        return;
    }
}

function emitIDs(){
    console.log($("#IDs").val());
    var resArray = $("#IDs").val().split(",");
    console.log(resArray)
    reqGomis(resArray);
}
