var slider = document.getElementById("tempoRange");
var output = document.getElementById("tempo");
let tempovalue = (60 / slider.value);
let slidervalue = slider.value;
let buttonpressed = false;
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  tempovalue = (60 / slider.value);
  if (buttonpressed = false) {
    stopplayback;
    scheduler();
    } 
} 
      
    const audioContext = new AudioContext();
    const playButton = document.querySelector('#play');
    const stopButton = document.querySelector('#stop');
    let tick;
    let nextNotetime = audioContext.currentTime;
    let timerID;

    fetch("/tick.wav")
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
        let circle0 = document.querySelector(".littlecircle0");
        circle0.style.borderColor = "grey";
        buttonpressed = false;
        clearTimeout(timerID);
    }

    function startplayback() {
        let circle0 = document.querySelector(".littlecircle0");
        circle0.style.borderColor = "black";
        buttonpressed = true;
        scheduler();
    }

    function beatflash() {
        let circle1 = document.querySelector(".littlecircle1");
        let circle2 = document.querySelector(".littlecircle2");
        let circle3 = document.querySelector(".littlecircle3");
        let circle4 = document.querySelector(".littlecircle4");
        let timemeasure = (60000 / slidervalue);
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
          }, (timemeasure * 0.9));
    }

    playButton.onclick = () => startplayback();
    stopButton.onclick = () => stopplayback();