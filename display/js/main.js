;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	}

	var isiPhone = function(){
    return (
      (navigator.platform.indexOf("iPhone") != -1) || 
      (navigator.platform.indexOf("iPod") != -1)
    );
	}

	// Mobile Menu Clone ( Mobiles/Tablets )
	var mobileMenu = function() {
		if ( $(window).width() < 769 ) {
			$('html,body').addClass('fh5co-overflow');

			if ( $('#fh5co-mobile-menu').length < 1 ) {
				
				var clone = $('#fh5co-primary-menu').clone().attr({
					id: 'fh5co-mobile-menu-ul',
					class: ''
				});
				var cloneLogo = $('#fh5co-logo').clone().attr({
					id : 'fh5co-logo-mobile',
					class : ''
				});

				$('<div id="fh5co-logo-mobile-wrap">').append(cloneLogo).insertBefore('#fh5co-header-section');
				$('#fh5co-logo-mobile-wrap').append('<a href="#" id="fh5co-mobile-menu-btn"><i class="ti-menu"></i></a>')
				$('<div id="fh5co-mobile-menu">').append(clone).insertBefore('#fh5co-header-section');

				$('#fh5co-header-section').hide();
				$('#fh5co-logo-mobile-wrap').show();
			} else {
				$('#fh5co-header-section').hide();
				$('#fh5co-logo-mobile-wrap').show();
			}

		} else {

			$('#fh5co-logo-mobile-wrap').hide();
			$('#fh5co-header-section').show();
			$('html,body').removeClass('fh5co-overflow');
			if ( $('body').hasClass('fh5co-mobile-menu-visible')) {
				$('body').removeClass('fh5co-mobile-menu-visible');
			}
		}
	};


	// Parallax
  // var scrollBanner = function () {
  //   var scrollPos = $(this).scrollTop();
  //   console.log(scrollPos);
  //   $('.fh5co-hero-intro').css({
  //     'opacity' : 1-(scrollPos/300)
  //   });
  // }


	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#fh5co-mobile-menu, #fh5co-mobile-menu-btn");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      $('body').removeClass('fh5co-mobile-menu-visible');
	    }
		});
	};


	// Mobile Button Click
	var mobileBtnClick = function() {
		// $('#fh5co-mobile-menu-btn').on('click', function(e){
		$(document).on('click', '#fh5co-mobile-menu-btn', function(e){
			e.preventDefault();
			if ( $('body').hasClass('fh5co-mobile-menu-visible') ) {
				$('body').removeClass('fh5co-mobile-menu-visible');	
			} else {
				$('body').addClass('fh5co-mobile-menu-visible');
			}
			
		});
	};


	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Superfish Sub Menu Click ( Mobiles/Tablets )
	var mobileClickSubMenus = function() {

		$('body').on('click', '.fh5co-sub-ddown', function(event) {
			event.preventDefault();
			var $this = $(this),
				li = $this.closest('li');
			li.find('> .fh5co-sub-menu').slideToggle(200);
		});

	};

	// Window Resize
	var windowResize = function() {
		$(window).resize(function(){
			mobileMenu();
		});

	};

	// Window Scroll
	var windowScroll = function() {
		$(window).scroll(function() {

			var scrollPos = $(this).scrollTop();
			if ( $('body').hasClass('fh5co-mobile-menu-visible') ) {
				$('body').removeClass('fh5co-mobile-menu-visible');
			}

			if ( $(window).scrollTop() > 70 ) {
				$('#fh5co-header-section').addClass('fh5co-scrolled');
			} else {
				$('#fh5co-header-section').removeClass('fh5co-scrolled');
			}


			// Parallax
			$('.fh5co-hero-intro').css({
	      'opacity' : 1-(scrollPos/300)
	    });

		});
	};

	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	// Easy Repsonsive Tabs
	var responsiveTabs = function(){
		
		$('#fh5co-tab-feature').easyResponsiveTabs({
      type: 'default',
      width: 'auto', 
      fit: true, 
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
            
    });
    $('#fh5co-tab-feature-center').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true, 
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion', 
      tabidentify: 'hor_1' 
      
    });
    $('#fh5co-tab-feature-vertical').easyResponsiveTabs({
      type: 'vertical',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
    });
	};

	// Owl Carousel
	var owlCrouselFeatureSlide = function() {
		
		var owl2 = $('.owl-carousel-2');
		owl2.owlCarousel({
				items: 1,
		    loop: true,
		    margin: 0,
		    lazyLoad: true,
		    responsiveClass: true,
		    nav: true,
		    dots: true,
		    smartSpeed: 500,
		    navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
		    responsive: {
		        0: {
		          items: 1,
		          nav: true
		        },
		        600: {
		          items: 1,
		          nav: true,
		        },
		        1000: {
		          items: 1,
		          nav: true,
		        }
	    	}
		});
	};

	// MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	};

	$(function(){

		mobileFastClick();
		responsiveTabs();
		mobileMenu();
		mainMenu();
		magnifPopup();
		mobileBtnClick();
		mobileClickSubMenus();
		mobileMenuOutsideClick();
		owlCrouselFeatureSlide();
		windowResize();
		windowScroll();


	});


}());



//Extend Script

//仮置き変数
//reqDisp(userid)>>>>>>>>>>
var userid = {};
//resDisp(items)<<<<<<<<<<
var items = [{title:"仮タイトル１",
					 		keyword:"keywordA, keywordB"},
					 		{title:"仮タイトル2",
					 		keyword:"keyword"}];

//responseによって発火する関数群
function resDisp(items){  
	//リストに表示するアイテム達
	console.log(items);
	if(!items){
		var items = [{title:"タイトルがないよ",
					 				keyword:"keywordがないよ"}];
	}

	app.controller('mainCtrl', ['$scope', function($scope){
  	$scope.items = items;
	}]);
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

//Websocket
var socket = new WebSocket("ws://localhost:8080/ws");

socket.onopen = function() {
	//接続直後の処理
  var massage = {	key:"reqDisp",
  								value:"{userid:kinme}"
  							};
  socket.send(JSON.stringify(massage));
};

socket.onmessage = function(message) {
	try {
		var wsRes = $.parseJSON(message.data);
		
		switch (wsRes[key]){
			case resDisp:
				alert("resDispが来たぞ");
				resDisp(weRes[value]);
				break;

			case resData:
				alert("resDataが来たぞ");
				resData(wsRes[value]);
				break;

			case sf:
				alert("sfが来たぞ");
				sf();
				break;

			case subResult:
				alert("subResultが来たぞ");
				subResult();
				break;

		}
	} catch (e) {
		alert(e);
		return;
	}
}

//AngularJS
var app = angular.module('App', ['ui.bootstrap']);

app.controller('headerCtrl', ['$scope', function($scope){
  // headerで必要な機能のコード
}])

app.controller('mainCtrl', ['$scope', function($scope){
  // main で必要な機能のコード
  $scope.items = items;
  							 //[{id:"id",
  							 //title:"jounal,title",
	  						 //keyword:"jounal,keyword"}];
 
}])
app.controller('footerCtrl', ['$scope', function($scope){
  // footer で必要な機能のコード
}]);

resDisp(items);
