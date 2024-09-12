let stopwatchInterval;
let elapsedTime = 0; 
let running = false;
let laps = [];

var start = document.getElementById("start");
var stop = document.getElementById("stop");
var reset = document.getElementById("reset");
const lap = document.getElementById("lap");

start.addEventListener("click", () => {
    start.style.display = "none"
    stop.style.display = "block";
    reset.style.display = "block";
    lap.style.display = "block";
})

stop.addEventListener("click", () => {
    start.style.display = "block";
    stop.style.display = "none";
})

reset.addEventListener("click", () => {
    start.style.display = "block"
    stop.style.display = "none";
    reset.style.display = "none";
    lap.style.display = "none";
    laps = [];
    updateLapTable();
})

function updateTime() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60)); 
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)); 
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = elapsedTime % 1000; 

    document.getElementById('time').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

function startStopwatch() {
    if (!running) {
        running = true;
        const startTime = Date.now() - elapsedTime; 
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateTime();
        }, 1); 
    }
}

function stopStopwatch() {
    if (running) {
        running = false;
        clearInterval(stopwatchInterval);
    }
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    updateTime();
}

function recordLap() {
    if (running) {
        laps.push(elapsedTime);
        updateLapTable();
    }
}

function updateLapTable() {
    const lapTableBody = document.getElementById('lapTableBody');
    lapTableBody.innerHTML = ''; 

    laps.forEach((lapTime, index) => {
        const row = document.createElement('tr');
        const lapNumberCell = document.createElement('td');
        const lapTimeCell = document.createElement('td');
        
        lapNumberCell.textContent = index + 1;
        lapTimeCell.textContent = formatTime(lapTime);
        
        row.appendChild(lapNumberCell);
        row.appendChild(lapTimeCell);
        lapTableBody.appendChild(row);
    });
}

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60)); 
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); 
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = time % 1000;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}