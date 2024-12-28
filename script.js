const toggle = document.getElementById('switch1');
document.getElementById("feed").width = 600;

window.onload = async function () {
    try {
        const response = await fetch('http://10.0.0.100:5000/toggle-light', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        toggle.checked = data.LightsON ? true : false;
    } catch (error) {
        console.error('Error:', error);
        alert('It broke!');
    }
    console.log("HEY")
};


function lights() {
    var checkboxValue = toggle.checked ? 1 : 0;


    fetch('http://10.0.0.100:5000/toggle-light', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checkbox_name: checkboxValue }),
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