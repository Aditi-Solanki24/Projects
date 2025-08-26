let startTime, updatedTime, difference = 0;
let timerInterval;
let running = false;
let lapCount = 1;

const timeDisplay = document.getElementById("time");
const lapsList = document.getElementById("laps");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", addLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    lapCount = 1;
    timeDisplay.textContent = "00:00:00";
    lapsList.innerHTML = "";
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((updatedTime / 1000) % 60);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function addLap() {
    if (running) {
        const lapTime = document.createElement("li");
        lapTime.textContent = `Lap ${lapCount++}: ${timeDisplay.textContent}`;
        lapsList.appendChild(lapTime);
    }
}
