// script.js
let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    timeDisplay.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap-time');
        lapTime.textContent = formatTime(elapsedTime);
        lapsContainer.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
