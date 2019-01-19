var mic, fft, song;

var img = [];

var last = [0];
var totalDiff = 0;

var timesHit = 0;

function preload() {
  song = loadSound('./Song.mp3');  
}

function setup() {

	img[0] = loadImage("01.png");
	img[1] = loadImage("02.png");
	img[2] = loadImage("03.png");
	img[3] = loadImage("04.png");

	createCanvas(343, 299);
	noFill();

  //Song Input  
  song.play();
  fft = new p5.FFT();
  fft.setInput(song);
/*
  //Mic Input
	mic = new p5.AudioIn();
	mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
*/
}

function draw() {
    
    //background(0);

    var spectrum = fft.analyze();

    totalDiff = 0;

    beginShape();
    for (i = 0; i < spectrum.length/4; i++) {
     	//vertex(i, map(spectrum[i], 0, 255, height, 0) );
     	//if ( i < spectrum.length/2)    	
   		if (last[i] < spectrum[i])
   			totalDiff++;
   		else
   			totalDiff--;
   		//console.log(totalDiff);
   		if (totalDiff > 0) {
   			timesHit++;

   			if(timesHit % 2 == 0)
   				image(img[2], 0, 0);
   			else if (timesHit % 8 == 0)
   				image(img[3], 0, 0);
   			else
   				image(img[1], 0, 0);
   		}
   		else
   			image(img[0], 0, 0);
     	last[i] = parseInt(spectrum[i]);
    }
    endShape();
}
/*
function mousePressed() {
  if (song.isPlaying()) { // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();
  }
}
*/