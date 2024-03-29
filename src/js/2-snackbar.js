import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")
const delayInput = document.querySelector("input")

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();
    const delay = delayInput.value;
    const state = event.currentTarget.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === "fulfilled") {
                resolve(delay)
            }else{
                reject(delay)
            }
        }, delay)
    })
    promise.then(value => {
        iziToast.success({
            color: 'green',
            position: 'topRight',
            message: `✅ Fulfilled promise in ${delay} ms`
        })
    })
    promise.catch(error => {
        iziToast.error({
            color: 'red',
            position: 'topRight',
            message: `❌ Rejected promise in ${delay} ms`

        })
    })
}