document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('stopwatch-display');
    const startButton = document.getElementById('start-stopwatch');
    const resetButton = document.getElementById('reset-stopwatch');

    let timerInterval;
    let startTime;
    let elapsedTime = 0;
    let isRunning = false;

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const hundredths = Math.floor((milliseconds % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
    }

    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            startButton.textContent = 'Stop';
        } else {
            stopTimer();
        }
    }

    function stopTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        startButton.textContent = 'Start';
    }

    function resetTimer() {
        stopTimer();
        elapsedTime = 0;
        updateDisplay();
    }

    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);
});
