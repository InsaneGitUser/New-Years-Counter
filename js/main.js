function toggleFullScreen() {
    if (document.documentElement.requestFullscreen) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting fullscreen: ${err.message}`);
            });
        }
    } else {
        alert("Fullscreen API is not supported on this browser.");
    }
}

document.addEventListener('click', toggleFullScreen);
document.addEventListener('touchstart', toggleFullScreen);

function createAndUpdateTime() {
    let timeDisplay = document.getElementById('timeDisplay');
    if (!timeDisplay) {
        timeDisplay = document.createElement('h2');
        timeDisplay.id = 'timeDisplay';
        timeDisplay.style.color = '#FC6A03';
        timeDisplay.style.fontFamily = 'Arial, sans-serif';
        timeDisplay.style.font-size = 100px;
        timeDisplay.style.textAlign = 'center';
        document.body.appendChild(timeDisplay);
    }
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(createAndUpdateTime, 1000);
