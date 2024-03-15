
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let timerInterval = null;
const button = document.querySelector("button")
const calendar= document.querySelector("#datetime-picker")
const spanText = document.querySelectorAll(".value")

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
    userSelectedDate = selectedDates[0];
    
    if (selectedDate >= options.defaultDate) {
        userSelectedDate = selectedDate;
        button.disabled = false;
    }else{
        button.disabled = true;
        iziToast.error({
            title: 'Error',
            position: 'center',
            message: `Please choose a date in the future`
        });
        
    }
    },
};

flatpickr(calendar, options);

const formatTime = milliseconds => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
    const days = Math.floor(milliseconds/1000/60/60/24)
  
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
      days.toString().padStart(2, '0')
    ].join(':');
};

button.addEventListener('click', (event) => {
    event.preventDefault();

    if(timerInterval) clearInterval(timerInterval)

    calendar.flatpickr().set('disable', [function(date){
        return true;
    }])
    button.disabled = true;


    timerInterval = setInterval(() => {
        const now = new Date()
        const diff = userSelectedDate - now;

    if(diff <=0) {
        clearInterval(timerInterval)
        spanText[0].textContent = '00'
        spanText[1].textContent = '00'
        spanText[2].textContent = '00'
        spanText[3].textContent = '00'
}else {
    const time = formatTime(diff)
    let [hours, minutes, seconds, days] = time.split(':').map(t => t.padStart(2, '0'));
            spanText[0].textContent = days;
            spanText[1].textContent = hours;
            spanText[2].textContent = minutes;
            spanText[3].textContent = seconds;
        }
    }, 1000);
})

