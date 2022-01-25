const slider = document.getElementById("tempoRange");
const output = document.getElementById("tempo");
const schedulertimeout = 50.0;
const secondsinmin = 60;
const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");
const circle3 = document.getElementById("circle3");
const outercircle = document.getElementById("outercircle");
const tempotext = document.getElementById("tempo");
const schedulersmalltime = 0.1;
let tempovalue = (60 / slider.value);
let slidervalue = slider.value;
let metronomerunning = false;
let tickloaded = false;
output.innerHTML = slider.value;
const audioContext = new AudioContext();
const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
let tick;
let nextNotetime = audioContext.currentTime;
let timerID;

playButton.addEventListener("click", startplayback);
stopButton.addEventListener("click", stopplayback);

slider.oninput = function() {
    output.innerHTML = this.value;
    slidervalue = this.value;
    tempovalue = (secondsinmin / slider.value);
    if (buttonpressed = false) {
        stopplayback();
        startplayback();
    }
}

fetch("tick.wav")
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
        tick = decodedAudio;
        if (tick = decodedAudio) {
            tickloaded = true;
        }
    });

function playback(time) {
    if (tickloaded) {
        const playSound = audioContext.createBufferSource();
        playSound.buffer = tick;
        playSound.connect(audioContext.destination);
        playSound.start(time);
        beatflash();
    } else {
        beatflash();
    }
}

function scheduler() {
    tempovalue = (secondsinmin / slider.value);
    while (nextNotetime < audioContext.currentTime + schedulersmalltime) {
        nextNotetime += tempovalue;
        playback(nextNotetime);
    }
    timerID = window.setTimeout(scheduler, schedulertimeout);
}

function stopplayback() {
    if (metronomerunning) {
        outercircle.className = "circle outercircleon";
        tempotext.className = "tempotextoff";
        metronomerunning = false;
        clearTimeout(timerID);
    }
}

function startplayback() {
    if (!metronomerunning) {
        outercircle.className = "circle outercircleoff";
        tempotext.className = "tempotexton";
        metronomerunning = true;
        scheduler();
    }
}

function beatflash() {
    let starttime = audioContext.currentTime;
    let beat1done = false;
    let beat2done = false;
    let beat3done = false;
    let time1 = starttime + ((60 / slidervalue) * 0.25);
    let time2 = starttime + ((60 / slidervalue) * 0.5);
    let time3 = starttime + ((60 / slidervalue) * 0.75);
    let lastcalledframetime;
    let fpstime = 0.016;

    circle3.className = "circle circle3lit";
    window.requestAnimationFrame(animate);

    function animate() {
        if (lastcalledframetime > 0) {
            fpstime = audioContext.currentTime - lastcalledframetime;
        }
        if ((audioContext.currentTime > (time1 - fpstime)) && (audioContext.currentTime < (time1 + fpstime)) && !beat1done) {
            circle2.className = "circle circle2lit";
            beat1done = true;
        } else if ((audioContext.currentTime > (time2 - fpstime)) && (audioContext.currentTime < (time2 + fpstime)) && !beat2done) {
            circle1.className = "circle circle1lit";
            beat2done = true;
        } else if ((audioContext.currentTime > (time3 - fpstime)) && (audioContext.currentTime < (time3 + fpstime)) && !beat3done) {
            circle3.className = "circle circle3";
            circle2.className = "circle circle2";
            circle1.className = "circle circle1";
            beat3done = true;
            return;
        }
        lastcalledframetime = audioContext.currentTime;
        window.requestAnimationFrame(animate);
    }
}