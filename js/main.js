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
    let dateDisplay = document.getElementById('dateDisplay');
    
    if (!timeDisplay) {
        let container = document.createElement('div');
        container.id = 'timeContainer';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.backgroundColor = 'black';
        container.style.flexDirection = 'column';
        document.body.appendChild(container);

        
        dateDisplay = document.createElement('h3');
        dateDisplay.id = 'dateDisplay';
        dateDisplay.style.color = 'white';
        dateDisplay.style.fontFamily = 'Arial, sans-serif';
        dateDisplay.style.fontSize = '4vw';
        dateDisplay.style.margin = '0';
        dateDisplay.style.marginBottom = '2vh';
        container.appendChild(dateDisplay);

        
        timeDisplay = document.createElement('h2');
        timeDisplay.id = 'timeDisplay';
        timeDisplay.style.color = '#FC6A03';
        timeDisplay.style.fontFamily = 'Arial, sans-serif';
        timeDisplay.style.fontSize = '10vw';
        timeDisplay.style.margin = '0';
        timeDisplay.style.lineHeight = '1';
        container.appendChild(timeDisplay);
    }

    const now = new Date();
    
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = String(hours).padStart(2, '0');

    timeDisplay.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    dateDisplay.textContent = dateStr;
}

setInterval(createAndUpdateTime, 1000);
