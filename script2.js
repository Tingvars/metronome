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
    let timenow = audioContext.currentTime;
    const timemeasure = (60 / slidervalue);
    const endtime = starttime + timemeasure;
    console.log("starttime:" + starttime);
    console.log("endtime:" + endtime);
    console.log("currentTime:" + audioContext.currentTime);
    activatecircle3();
    while (timenow < endtime) {
        console.log("currentTime in loop: " + audioContext.currentTime);
        if (audioContext.currentTime === (starttime + (timemeasure / 4))) {
            console.log("doing first animationframe");
            window.requestAnimationFrame(activatecircle2);
            timenow = audioContext.currentTime;
        } else if (audioContext.currentTime === (starttime + (timemeasure / 2))) {
            console.log("doing second animationframe");
            window.requestAnimationFrame(activatecircle1);
            timenow = audioContext.currentTime;
        } else if (audioContext.currentTime === (starttime + (timemeasure * 0.75))) {
            console.log("doing last animationframe");
            window.requestAnimationFrame(deactivatecircles);
            timenow = audioContext.currentTime;
            if (!(timenow < endtime)) {
                break;
            }
        }
    }
}

function activatecircle3() {
    circle3.className = "circle circle3lit";
}

function activatecircle2() {
    circle2.className = "circle circle2lit";
}

function activatecircle1() {
    circle1.className = "circle circle1lit";
}

function deactivatecircles() {
    circle3.className = "circle circle3";
    circle2.className = "circle circle2";
    circle1.className = "circle circle1";
}