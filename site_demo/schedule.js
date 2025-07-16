let Scheduler = false

document.addEventListener('DOMContentLoaded', function () {
    const timer1 = document.querySelector('.Stimepicker');
    const timer2 = document.querySelector('.Etimepicker');

    M.Timepicker.init(timer1, {});

    M.Timepicker.init(timer2, {});

});

function times(){
    console.log(document.getElementById('time').value)
    console.log(document.getElementById('time2').value)
}

        // document.getElementById('submitButton').addEventListener('click', function() {
        // const startTime = document.getElementById('startTime').value;
        // const endTime = document.getElementById('endTime').value;

        // console.log('Start Time:', startTime);
        // console.log('End Time:', endTime);
        //  });