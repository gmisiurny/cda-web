var btnStart;
var btnStop;
var btnPauseResume;
var chronoP;
var timer;
var timeSpent = 0
var timeOnClick = 0;
var isOnPause = false;

window.onload = init;

function init() {
    btnStart = document.querySelector("button:nth-child(1)");
    btnStop = document.querySelector("button:nth-child(2)");
    btnPauseResume = document.querySelector("button:nth-child(3)");
    chronoP = document.getElementById("chronoP");
    btnStart.addEventListener('click', start);
    btnStop.addEventListener('click', stopChrono);
    btnPauseResume.addEventListener('click', onPauseResume);
}

function start() {
    let startTime = new Date();
    timer = setInterval(() => {
        if (!isOnPause) {
            let seconds = Math.round((new Date().getTime() - startTime.getTime()) / 1000) + timeOnClick;
            let hours = parseInt(seconds / 3600);
            seconds = seconds % 3600;
            let minutes = parseInt(seconds / 60);
            seconds = seconds % 60;
            chronoP.innerHTML = ajouteUnZero(hours) +
                ":" + ajouteUnZero(minutes) +
                ":" + ajouteUnZero(seconds);
            timeSpent++;
        }
    }, 1000);
    if (btnStart.classList.contains("d-block")) {
        btnStop.classList.toggle("d-none");
        btnPauseResume.classList.toggle("d-none");
        btnStart.classList.replace("d-block", "d-none");
    }
}

function ajouteUnZero(n) {
    let str = "0";
    return n.toString().length == 1 ? str + n : n;
}

function onPauseResume() {
    if (btnPauseResume.innerHTML == "Resume") {
        timeOnClick = timeSpent;
        btnPauseResume.classList.replace("btn-success", "btn-warning")
        btnPauseResume.innerHTML = "Pause";
        start();
    } else {
        btnPauseResume.classList.replace("btn-warning", "btn-success");
        btnPauseResume.innerHTML = "Resume";
        clearInterval(timer);
    }
}

function stopChrono() {
    btnPauseResume.classList.toggle("d-none", true);
    btnStop.classList.toggle("d-none", true);
    btnStart.classList.toggle("d-block", true);
    btnPauseResume.innerHTML = "Pause";
    btnPauseResume.classList.replace("btn-success", "btn-warning");
    clearInterval(timer);
    timeOnClick = 0;
    timeSpent = 0;
    chronoP.innerHTML = "00:00:00";
}