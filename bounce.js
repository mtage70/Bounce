
(function( win, $, undefined ) {
'use strict';

	var module = {};
	var _events = {};
	var GRAVITY = 0.5;
	var b1 = new ball();
	var score = 0;
	var alive;
	

	console.log("Ball");
	function ball() {
		
		this.xpos = 200;
		this.ypos = 0;
		this.xvel = 0;
		this.yvel = 0;
		
	};
	function drawScore() {
		console.log("DRAW SCORE");
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var scoreString = "Score: " + score;
		ctx.font = "15px Arial";
		ctx.fillText(scoreString, document.getElementById("myCanvas").width - 100, 20);
		ctx.stroke();
	}
	function drawBall (ball) {
		//console.log("Draw");
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.beginPath();
		ctx.arc( ball.xpos, ball.ypos, 2.5, 0, 2*Math.PI);
		ctx.stroke();
	};

	function bar() {
		this.xpos = 0;
		this.ypos = Math.floor(Math.random() * document.getElementById("myCanvas").height) + 1;
		this.xvel = Math.floor(Math.random() * 7) + 1;
		this.yvel = 0;
		
	};
	function drawBars (bars) {
		console.log("Draw");
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		for (var i = 0; i < bars.length; i++) {
			ctx.beginPath();	
			ctx.fillRect(bars[i].xpos, bars[i].ypos, 10, 5);
			ctx.stroke();
		}
		
	}
	function updateBars (bars) {
		for (var i = 0; i < bars.length; i++) {
			if (bars[i].xpos < document.getElementById("myCanvas").width + 20) {
				bars[i].xpos = bars[i].xpos + bars[i].xvel;
			}
			else if(bars[i].xvel != 0 && alive) {
				score++;
				bars[i].xvel = 0;
			}
			if ((Math.abs(b1.xpos - bars[i].xpos) < 10) && b1.xpos > bars[i].xpos) {
				if((Math.abs(b1.ypos - bars[i].ypos) < 5) && b1.ypos < bars[i].ypos) {
					alert("Loser.\n Score: " + score);
					alive = false;
				}
			} 

		}
	}


	_events.init = function() {
		console.log("Init Events");
		$(document).on('keydown', function(event) {
		    
		    if( event.keyCode === 38 ) {
		      event.preventDefault();
		      b1.yvel += 5;
		    }
		    if ( event.keyCode === 39 ) {
		    	event.preventDefault();
		      b1.xvel += 1;
		    }
		    if ( event.keyCode === 37 ) {
		    	event.preventDefault();
		      b1.xvel -= 1;
		    }
		});
	};

	var makeStruct = function(names) {
	  var names = names.split(' ');
	  var count = names.length;
	  function constructor() {
	    for (var i = 0; i < count; i++) {
	      this[names[i]] = arguments[i];
	    }
	  }
	  return constructor;
	};
	

	var myVar = setInterval(function() { tick() }, 50);
	var deadBallCounter = 0;
	var bars = [];


	var tick = function () {
		if (alive) {
			b1.yvel -= GRAVITY;
			b1.ypos -= b1.yvel;
			b1.xpos += b1.xvel;


			drawBall(b1);
			updateBars(bars);
			drawBars(bars);
			drawScore();
		
			if (b1.ypos >= document.getElementById("myCanvas").height || b1.ypos <= 0) {
				//console.log($("#myCanvas").height());
				b1.yvel = -b1.yvel;
			}
			if (b1.xpos <= 0 || b1.xpos >= document.getElementById("myCanvas").width) {
				b1.xvel = -b1.xvel;
			}

			if (Math.abs(b1.yvel) <= 2) {
				deadBallCounter++;
			}
			else {
				deadBallCounter = 0;
			}
			if (deadBallCounter == 1000) {
				b1.yvel = 0;
				GRAVITY = 0;
				b1.xvel = 0;
				alert("wOmP WoMp!!~!~!~!~!");

			}

			if (Math.floor(Math.random() * 10) + 1 == 1) {
				console.log("NEW BAR");
				bars.push(new bar());
			}
			
			
		}

	
		//console.log("(x, y): (", b1.xpos, ", ", b1.ypos, ")");
	};


	module.init = function() {
		console.log("Module init");
		alive = true;
		_events.init();
		alert("START!");
		tick();
		

	}


	// Kickoff
	$(document).ready(function() {
	  module.init();
	});

})(window, jQuery);



