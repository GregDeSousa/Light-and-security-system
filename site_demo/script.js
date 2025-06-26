const LightToggle = document.getElementById('LightSwitch');
const EntryToggle = document.getElementById('EntryToggle');
const DoorStatus = document.getElementById('door-status');
document.getElementById("feed").width = 600;


window.onload = async function () {
    try {
        const response = await fetch('http://10.0.0.101:5000/toggle-light', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        LightToggle.checked = data.LightsON ? true : false;
    } catch (error) {
        console.error('Error:', error);
        alert('Unable to fetch light status');
    }

    try {
        const response = await fetch('http://10.0.0.101:5000/auto-light', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        EntryToggle.checked = data.EntryLighting ? true : false;
    } catch (error) {
        console.error('Error:', error);
        alert('Unable to fetch auto light status');
    }


    try {
        const response = await fetch('http://10.0.0.101:5000/door-status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if(data.DoorOpened == true){
            DoorStatus.innerText = "Open";
            DoorStatus.style.backgroundColor = "#0BED13";
        }else{
            DoorStatus.innerText = "Closed";
            DoorStatus.style.backgroundColor = "#E22013";
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Unable to fetch door status');
        console.log(error);
    }

};

// window.onload = async function () {

// };


function lights() {
    var checkboxValue = LightToggle.checked ? 1 : 0;


    fetch('http://10.0.0.101:5000/toggle-light', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checkbox_1: checkboxValue }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.status);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('It broke!');
    });
}

function autolights() {
    var checkboxValue = EntryToggle.checked ? 1 : 0;


    fetch('http://10.0.0.101:5000/auto-light', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checkbox_2: checkboxValue }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.status);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('It broke!');
    });
}


function uploadAudio() {
    const fileInput = document.getElementById("audio-upload");
    const formData = new FormData();
    formData.append("audio", fileInput.files[0]);

    fetch("http://10.0.0.101:5000/upload-audio", {
        method: "POST",
        body: formData
    }).then(res => res.text()).then(msg => console.log(msg));
}


// navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
//     const recorder = new MediaRecorder(stream);
//     let chunks = [];

//     recorder.ondataavailable = e => chunks.push(e.data);
//     recorder.onstop = () => {
//         const blob = new Blob(chunks, { type: 'audio/webm' });
//         const formData = new FormData();
//         formData.append("audio", blob, "recording.webm");

//         fetch("http://<pi-ip>:5000/upload-audio", {
//             method: "POST",
//             body: formData
//         });

//         chunks = [];
//     };

//     recorder.start();

//     setTimeout(() => recorder.stop(), 5000); // record 5 seconds
// });


const socket = io("http://10.0.0.101:5000");
socket.on("connect", () => {
    console.log("Connected to Flask-SocketIO server");
});

socket.on("door_status", (data) => {
      if(data.status === true) {
        document.getElementById("door-status").innerText = "Open";
        document.getElementById("door-status").style.backgroundColor = "#0BED13";
      }else{
        document.getElementById("door-status").innerText = "Closed";
        document.getElementById("door-status").style.backgroundColor = "#E22013";
      }
});