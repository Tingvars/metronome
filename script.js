const slider = document.getElementById("tempoRange");
const output = document.getElementById("tempo");
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
const playbutton = document.querySelector('#play');
const stopbutton = document.querySelector('#stop');
let tick;
let nextnotetime = audioContext.currentTime;
let timerID;

playbutton.addEventListener("click", startplayback);
stopbutton.addEventListener("click", stopplayback);

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
    let tempovalue = (secondsinmin / slider.value);
    if (nextnotetime <(audioContext.currentTime + schedulersmalltime)) {
        nextnotetime += tempovalue;
        playback(nextnotetime);
    }
    timerID = window.requestAnimationFrame(scheduler);
}

function stopplayback() {
    if (metronomerunning) {
        outercircle.className = "circle outercircleon";
        tempotext.className = "tempotextoff";
        metronomerunning = false;
        window.cancelAnimationFrame(timerID);
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
        if ((audioContext.currentTime > (time3 - fpstime)) && (audioContext.currentTime < (time3 + fpstime)) ) {
            circle3.className = "circle circle3";
            circle2.className = "circle circle2";
            circle1.className = "circle circle1";
            return;
        } else if ((audioContext.currentTime > (time2 - fpstime)) && (audioContext.currentTime < (time2 + fpstime)) ) {
            circle2.className = "circle circle1lit";
        } else if ((audioContext.currentTime > (time1 - fpstime)) && (audioContext.currentTime < (time1 + fpstime)) ) {
            circle1.className = "circle circle2lit";
        }
        lastcalledframetime = audioContext.currentTime;
        window.requestAnimationFrame(animate);
    }
}
