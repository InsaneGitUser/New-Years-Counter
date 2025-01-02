function createAndUpdateTime() {
    let container = document.getElementById('timeContainer');
    let timeDisplay = document.getElementById('timeDisplay');
    let dateDisplay = document.getElementById('dateDisplay');
    if (!container) {
        container = document.createElement('div');
        container.id = 'timeContainer';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.transform = 'translateY(-65%)';
        document.body.appendChild(container);
        
        dateDisplay = document.createElement('h2');
        dateDisplay.id = 'dateDisplay';
        dateDisplay.style.color = 'white';
        dateDisplay.style.fontFamily = 'Arial, sans-serif';
        dateDisplay.style.fontSize = '4vw';
        dateDisplay.style.margin = '0';
        dateDisplay.style.marginBottom = '5vh';
        dateDisplay.style.lineHeight = '1';
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
    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    const month = now.getMonth();
    const day = now.getDate();
    if (month === 0 && day === 1) {
        dateDisplay.textContent = `Happy New Year!`;
        if (!window.confettiScript) {
            const script = document.createElement('script');
            script.src = './confetti.js';
            document.body.appendChild(script);
            window.confettiScript = true;
        }
    } else if (month === 11 && day === 31) {
        dateDisplay.textContent = `New Year's Eve!`;
    } else {
        dateDisplay.textContent = `Why are you here?`;
    }
}
setInterval(createAndUpdateTime, 1000);
