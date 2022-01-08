var slider = document.getElementById("tempoRange");
var output = document.getElementById("tempo");
let tempovalue = (60 / slider.value);
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  tempovalue = (60 / slider.value);
  stopplayback();
  scheduler();
} 
      
    const audioContext = new AudioContext();
    const playButton = document.querySelector('#play');
    const stopButton = document.querySelector('#stop');
    let tick; //tis this makes an undefined variable
    var nextNotetime = audioContext.currentTime;
    var timerID;

    fetch("/tick.wav")
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
        tick = decodedAudio; //tis assigning tick as the decoded audio of the WAV
    }); //tis this whole nonsense is making the WAV file readable by "decoding" it, something about bits idk

    function playback(time) {
        const playSound = audioContext.createBufferSource();
        playSound.buffer = tick; //tis assigning the play buffer as our defined file "audio"
        playSound.connect(audioContext.destination);
      //tis sends the sound to the speakers
      playSound.start(time);
      console.log(time);
     //tis this starts the "buffer" (which means "a sound" here) at "currentTime" i.e. now
    }

    function scheduler() {
        while(nextNotetime < audioContext.currentTime + tempovalue) { 
            nextNotetime += tempovalue;
            playback(nextNotetime);
        }
       timerID = window.setTimeout(scheduler, 50.0);
    }

    function stopplayback() {
        clearTimeout(timerID);
    }

    playButton.onclick = () => scheduler();
    stopButton.onclick = () => stopplayback();