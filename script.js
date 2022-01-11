const slider = document.getElementById("tempoRange");
const output = document.getElementById("tempo");
let tempovalue = (60 / slider.value);
let slidervalue = slider.value;
let buttonpressed = false;
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  slidervalue = this.value;
  tempovalue = (60 / slider.value);
  if (buttonpressed = false) {
    stopplayback();
    startplayback();
    } 
} 
      
    const audioContext = new AudioContext();
    const playButton = document.querySelector('#play');
    const stopButton = document.querySelector('#stop');
    let tick;
    let nextNotetime = audioContext.currentTime;
    let timerID;

    fetch("tick.wav")
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
        tick = decodedAudio;
    });

    function playback(time) {
        const playSound = audioContext.createBufferSource();
        playSound.buffer = tick;
        playSound.connect(audioContext.destination);
      playSound.start(time);
      beatflash();    
    }

    function scheduler() {
        while(nextNotetime < audioContext.currentTime + 0.1) { 
            nextNotetime += tempovalue;
            playback(nextNotetime);
        }
       timerID = window.setTimeout(scheduler, 50.0);
    }

    function stopplayback() {
      const circle0 = document.querySelector(".outercircle");
      const tempotext = document.querySelector(".tempotext");
        tempotext.style.color = "rgb(28, 117, 16)";
        circle0.style.borderColor = "grey";
        buttonpressed = false;
        clearTimeout(timerID);
    }

    function startplayback() {
      const circle0 = document.querySelector(".outercircle");
      const tempotext = document.querySelector(".tempotext");
        circle0.style.borderColor = "black";
        tempotext.style.color = "rgb(62, 240, 38)";
        buttonpressed = true;
        scheduler();
    }

    function beatflash() {
      const circle1 = document.querySelector(".circle1");
      const circle2 = document.querySelector(".circle2");
      const circle3 = document.querySelector(".circle3");
      const circle4 = document.querySelector(".circle4");
        let timemeasure = (60000 / slidervalue);
        if (timemeasure > 400) {
            circle4.style.borderColor = "red";
        setTimeout(function() {           
            circle3.style.borderColor = "red";
          }, (timemeasure * 0.2));
        setTimeout(function() {
            circle2.style.borderColor = "red";
          }, (timemeasure * 0.4));
        setTimeout(function() {
            circle1.style.borderColor = "red";
          }, (timemeasure * 0.6));
        setTimeout(function() {
            circle4.style.borderColor = "black";
            circle3.style.borderColor = "black";
            circle2.style.borderColor = "black";
            circle1.style.borderColor = "black";
          }, (timemeasure * 0.8));
        } else {
          circle4.style.borderColor = "red";
          circle3.style.borderColor = "red";
            circle2.style.borderColor = "red";
            circle1.style.borderColor = "red";
        setTimeout(function() {
            circle4.style.borderColor = "black";
            circle3.style.borderColor = "black";
            circle2.style.borderColor = "black";
            circle1.style.borderColor = "black";
          }, (timemeasure * 0.8));
        }
    }

    playButton.onclick = () => startplayback();
    stopButton.onclick = () => stopplayback();