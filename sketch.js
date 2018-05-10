function preload() {
  song = loadSound('song.mp3', loaded);
}


function loaded() {
  song.setVolume(1);
  song.play();
}

function PausePlay() {
  if(!song.isPlaying()) {
    song.setVolume(1);
    song.play();
    pause.html("pause");
  } else {
    song.pause();
    pause.html("play");
  }
}

var songSlider;
var pause;
var songLength = song.duration();



function setup() {

  createCanvas(1600, 800);
  //createCanvas(width, height);
  //background('black');
  fft = new p5.FFT(0.9, 256);


  songSlider = createSlider(0, songLength, 0);
  songSlider.position(width/4, 700);
  songSlider.style('width', '800px');

  pause = createButton('pause');
  pause.position(0, height);
  pause.mousePressed(PausePlay);

  colorMode(HSB);
}




function draw() {

  background('black');

  //var time = songSlider.value;
  
  text("time", songSlider.X * 2 + songSlider.width, 700)
  fill(0);

  songSlider.value(Math.floor(song.currentTime()));


  var spectrum = fft.analyze();
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    fill(i, 255, 255)
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x * 1.5, height, width / spectrum.length, h * 0.9);
  }
}