document.addEventListener('DOMContentLoaded', () => {
    const currentTimeDisplay = document.getElementById('current-time');
    const alarmForm = document.getElementById('alarm-form');
    const alarmList = document.getElementById('alarm-list');
    const alarmSound = document.getElementById('alarm-sound');
    
    let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    let alarmTimeouts = [];

    function updateCurrentTime() {
        const now = new Date();
        currentTimeDisplay.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    }

    function renderAlarms() {
        alarmList.innerHTML = '';
        alarms.forEach((alarm, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${alarm.time} - ${alarm.active ? 'On' : 'Off'}</span>
                <button class="toggle" onclick="toggleAlarm(${index})">${alarm.active ? 'Turn Off' : 'Turn On'}</button>
                <button class="dismiss" onclick="deleteAlarm(${index})">Delete</button>
            `;
            alarmList.appendChild(li);
        });
    }

    function addAlarm(e) {
        e.preventDefault();
        const alarmTime = document.getElementById('alarm-time').value;
        const