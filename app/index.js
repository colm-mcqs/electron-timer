"use strict";
const moment = require('moment');
const {ipcRenderer, remote } = require('electron');

const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? (`0${momentTime.seconds()}`) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? (`0${momentTime.minutes()}`) : momentTime.minutes();

    return `${min}:${sec}`;
};

ipcRenderer.on('timer-change', (event, t) => {
    let currentTime = t;
    timerDiv.innerHTML = secondsToTime(currentTime);

    let timer = setInterval(() => {
        currentTime = currentTime-1;

        timerDiv.innerHTML = secondsToTime(currentTime);

        if(currentTime <= 0){
            document.getElementById('timerDiv').className += ' timer-end';
            clearInterval(timer);
        }
    }, 1000);
});

document.getElementById("min-btn").addEventListener("click", function () {
    var window = remote.getCurrentWindow();
    window.minimize();
});

document.getElementById("max-btn").addEventListener("click", function () {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
        window.maximize();
    } else {
        window.unmaximize();
    }
});

document.getElementById("close-btn").addEventListener("click", function () {
    var window = remote.getCurrentWindow();
    window.close();
});