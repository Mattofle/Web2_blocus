const form = document.querySelector('form');
const message = document.querySelector('#message');
const wish = document.querySelector('#wish');

form.addEventListener('submit', formDelete);

function formDelete(e) {
    e.preventDefault();
    form.style.display = 'none'
    message.innerHTML = `Your wish is : ${wish.value}`
}
