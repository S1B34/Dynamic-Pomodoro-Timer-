let timerInterval;
let isRunning = false;
let sessionType = 'Work';  // 'Work' or 'Break'
let workSessionDuration = 1500; // 25 minutes in seconds
let breakSessionDuration = 300; // 5 minutes in seconds
let currentTimeLeftInSession = workSessionDuration;

const timerDisplay = document.getElementById('timer-display');
const workInput = document.getElementById('work-duration');
const breakInput = document.getElementById('break-duration');

document.querySelector('.start-button').addEventListener('click', toggleTimer);
document.querySelector('.stop-button').addEventListener('click', toggleTimer);
document.querySelector('.reset-button').addEventListener('click', resetTimer);
document.querySelector('.settings-toggle').addEventListener('click', function() {
    document.querySelector('.settings-panel').classList.toggle('open');
});

workInput.addEventListener('change', function() {
    workSessionDuration = this.value * 60;
});

breakInput.addEventListener('change', function() {
    breakSessionDuration = this.value * 60;
});

function toggleTimer() {
    if (!isRunning) {
        startTimer();
    } else {
        stopTimer();
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            currentTimeLeftInSession--;
            displayTimeLeft();
            if (currentTimeLeftInSession <= 0) {
                isRunning = false;
                if (sessionType === 'Work') {  // Check if the ending session is a work session
                    alarmSound.play();  // Play the alarm sound
                }
                toggleSession();
            }
        }, 1000);
    }
}


function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    currentTimeLeftInSession = sessionType === 'Work' ? workSessionDuration : breakSessionDuration;
    displayTimeLeft();
}

function toggleSession() {
    sessionType = sessionType === 'Work' ? 'Break' : 'Work';
    currentTimeLeftInSession = sessionType === 'Work' ? workSessionDuration : breakSessionDuration;
    displayTimeLeft();
}

function displayTimeLeft() {
    const minutes = Math.floor(currentTimeLeftInSession / 60);
    const seconds = currentTimeLeftInSession % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

window.onload = () => {
    displayTimeLeft();
}
const alarmSound = document.getElementById('alarm-sound');
if (currentTimeLeftInSession <= 0) {
    isRunning = false;
    if (sessionType === 'Work') {  // Check if the ending session is a work session
        alarmSound.play();  // Play the alarm sound
    }
    toggleSession();
}
