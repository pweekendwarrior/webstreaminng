var backimg;
var backgrounds;
var currentbg, currentmenu;
var menuclasses, infos;
var active;
var activeSection;
var canScroll = true;
var isMobile = false;
var pause = false;
var audioElement;
var songs = new Array(); //name yields src
var idd;
var delta = 0;
(function($) {
	'use strict';


$( window ).on( "load", function(){

	// device detection
	if (/Mobi/.test(navigator.userAgent)) {
    // mobile!
		isMobile = true;
	}

//Quicks

//!Quicks


var num = -1;
var pages = new Array();
 $( '.fullpage' ).each(function( index, element ){
 	var el1 = element;
	pages.push($( '.fullpage' )[index].id);
	 num++;
  $(el1).css('top', 100*num*1 + '%');
	$(el1).css('left', '0');
	$(el1).css('width', $(window).innerWidth());
	$(el1).css('height', 100*1 + '%');
});


	//scrolling

	var pg = 0;

	var lastScrollTop = 0, delta = $(window).innerHeight()*.01;
	var scroll = 0;
			$(window).scroll(function(event){

				if(isMobile) return;
				st = $(this).scrollTop();

				if(Math.abs(lastScrollTop - st) <= delta)
					 return;

				if(!canScroll){
					var $elemen = pages[pg];
					//alert('#' + $elemen);
					var px = ($('#' + $elemen).offset().top);
					//anim
					$('html').animate({
					scrollTop: '' + px + 'px'
					},
					{
					easing: 'linear',
					duration: 0,
					complete: function(){
					lastScrollTop = $(this).scrollTop();
					}
					});
				}

				if (!$('html').is(':animated')){
				event.preventDefault();
				 var st = $(this).scrollTop();
				 if (st > lastScrollTop){
						// downscroll code
						//console.log('scroll down');
						pg = Math.min(pg + 1, pages.length-1)
						var $elemen = pages[pg];
						var px = ($('#' + $elemen).offset().top);
						$('html').animate({
     				scrollTop: '' + px + 'px'
   					},
   					{
     				easing: 'linear',
     				duration: 300,
     				complete: function(){
        		lastScrollTop = $(this).scrollTop();
    				}
						});
				 } else {
						// upscroll code
						//console.log('scroll up');
						pg = Math.max(pg - 1, 0);
						var $elemen = pages[pg];
						var px = ($('#' + $elemen).offset().top);
						$('html').animate({
     				scrollTop: '' + px + 'px'
   					},
   					{
     				easing: 'swing',
     				duration: 300,
     				complete: function(){
        		lastScrollTop = $(this).scrollTop();
    				}
						});
				 }
		 }
		 else{

			 event.preventDefault();

		 }
	 });
//Sound
  audioElement = document.createElement('audio');


  audioElement.setAttribute('src', "C:\\Users\\kessl\\Desktop\\New Music Site\\songs\\" + "Bluu - Droop" + ".mp3");
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);

    audioElement.addEventListener("canplay",function(){
        //$("#length").text("Duration:");
        //$("#source").text("Source:");
        //$("#status").text("Status: Ready to play").css("color","green");
				//$("#songimage").attr('src', "songs\\" + "droop" + "art" + ".png");
				//$("#songimage").text('Bluu - Droop');
    });

    audioElement.addEventListener("timeupdate",function(){
        //$("#currentTime").text("Current second:" + Math.floor(audioElement.currentTime * 10) / 10);
    });

    /*$('#restart').click(function() {
        audioElement.currentTime = 0;
    });
    $('#fwd').click(function() {
        audioElement.currentTime += 5*1;
    });
    $('#bck').click(function() {
        audioElement.currentTime -= 5*1;
    });*/

		//clicks

		$("#playpause").click(function(){
 		 if(pause){
			 $("#playpause").attr('src', 'pause.png').attr('width', '20%');
 			 audioElement.play();
 			 pause = false;
			// console.log('play');
 		 }
 		 else{
			  $("#playpause").attr('src', 'play.png').attr('width', '20%');
 			 audioElement.pause();
 			 pause = true;
			 //console.log('pause');
 		 }
 	 });

	$('#volume').on('input', function(event, ui) {
		var calc = Math.floor(parseInt($('#volume').val()))/100 || 0;

		audioElement.volume = calc;
		console.log(calc);
	});

	$("#downarr").click(function(){
	 $('html').animate({
	 scrollTop: '' + $("#content1").offset().top + 'px'
	 },
	 {
	 easing: 'swing',
	 duration: 270,
	 });
	});

	$("#droparr1").click(function(){
	 $("#songselection").toggleClass('hidesongselection');
	 $("#songselection").toggleClass('showsongselection');
	});

	$("#droparr2").click(function(){
	 $("#songselection").toggleClass('hidesongselection');
	 $("#songselection").toggleClass('showsongselection');
	});
//!Sound

//both

//mobile site
if(isMobile){
	delta = 400;
	$('#desktop').hide();
	mobilewritebutton("Chlo - Disney");
	mobilewritebutton("Bluu - Droop");
	mobilewritebutton("Bluu - Rolitest");







}





//pc site
if(!isMobile){
	delta = 50;
	$('#mobile').hide();
	writebutton("Chlo - Disney");
	writebutton("Bluu - Droop");
	writebutton("Bluu - Rolitest");
}
//
});
  })(jQuery);
// funcs
	function writebutton(name){
			//var sound = $("<source type='audio' src = 'file://songs\\" + bname + "' value='" + btext + "' id = '" + bname + "' class = 'song' onclick = 'bclic(" + bname + ")'/>");
			var $input = $("<input type='button' value='" + name + "' id = '" + name + "' class = 'songbutton' onclick = 'playsong(" + name + ")'/>");
			$input.appendTo($("#songselection"));
			songs.push(name);
	}
	function mobilewritebutton(name){ //mobile
			//var sound = $("<source type='audio' src = 'file://songs\\" + bname + "' value='" + btext + "' id = '" + bname + "' class = 'song' onclick = 'bclic(" + bname + ")'/>");
			var $input = $("<input type='button' value='" + name + "' id = '" + name + "' class = 'mobile mobile_songbutton' onclick = 'mobileplay(" + name + ")'/>");
			$input.appendTo($("#mobile_songs"));
			songs.push(name);
	}
	function playsong(name){
	  last = songs.length-1;
		//random button
		if (name == 'random'){
	    idd = $('#' + songs[r(0, songs.length-1)]);
			console.log(idd);
			name = idd.id.toString() + '';
	  }
		else {
			idd = $('#' + name);
		}
		//console.log(name);

		audioElement.setAttribute('src', '' + 'songs\\' + name + '.mp3');
		//song art
		if (exists('songs\\' + name + '_art.png')){
		$('#songimage').attr('src', 'songs\\' + name + '_art' + '.png');
		}

		else{
			$('#songimage').attr('src', '' + 'placeholder_song_title' + '.png');
		}

		//play
		audioElement.play();

		$('#songtitle').text(idd.id);

		audioElement.addEventListener('ended', function() {
	    playsong('random');
				//this.play();
		}, false);

		audioElement.addEventListener("canplay",function(){
			//$("#songimage").attr('src', "songs\\" + "name" + "_art" + ".png");
			//$("#songimage").text('Bluu - Droop');
		});

		audioElement.addEventListener("timeupdate",function(){
				//$("#currentTime").text("" + Math.floor(audioElement.currentTime * 1) / 1);
		});

		$('#play').click(function() {
				audioElement.play();
				//audioElement.volume = .5;
				//$("#status").text("Status: Playing");
		});

		$('#pause').click(function() {
				audioElement.pause();
				//$("#status").text("Status: Paused");
		});

		$('#restart').click(function() {
				audioElement.currentTime = 0;
		});

	}
	function mobileplay(name){ //mobile
	  last = songs.length-1;
		//random button
		if (name == "random"){
	    idd = $('#' + songs[r(0, songs.length-1)]);
			console.log(idd);
			name = idd.id.toString() + '';
	  }
		else {idd = $('#' + name);}

		audioElement.setAttribute('src', '' + 'songs\\' + name + '.mp3');
		//song art
		/*if (exists('songs\\' + name + '_art.png')){
			$('#songimage').attr('src', 'songs\\' + name + '_art' + '.png');
		}

		else{
			$('#songimage').attr('src', '' + 'placeholder_song_title' + '.png');
		}*/

		//play
		audioElement.play();

		//$('#songtitle').text(idd.id);

		audioElement.addEventListener('ended', function() {
	    playsong('random');
				//this.play();
		}, false);

		audioElement.addEventListener("canplay",function(){
			//$("#songimage").attr('src', "songs\\" + "name" + "_art" + ".png");
			//$("#songimage").text('Bluu - Droop');
		});

		audioElement.addEventListener("timeupdate",function(){
				//$("#currentTime").text("" + Math.floor(audioElement.currentTime * 1) / 1);
		});

		$('#play').click(function() {
				audioElement.play();
				audioElement.volume = 1;
				//$("#status").text("Status: Playing");
		});

		$('#pause').click(function() {
				audioElement.pause();
				//$("#status").text("Status: Paused");
		});

		$('#restart').click(function() {
				audioElement.currentTime = 0;
		});

	}
function exists(path){
	$.ajax({
    url: '' + path + '',
    type:'HEAD',
    error: function()
    {
        return false;
    },
    success: function()
    {
        return true;
    }
});
}
function r(min, max) {
        var minNumber = min; // le minimum
        var maxNumber = max; // le maximum
        return Math.floor(Math.random() * (maxNumber + 1) + minNumber); // la fonction magique
    }
