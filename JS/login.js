const input = document.querySelector('.login-input');
const button = document.querySelector('.btn');
const form = document.querySelector('.login-form');

const  validateInput = ({target}) => {
    if(target.value.length > 3) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}

input.addEventListener('input', validateInput);

const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem('player', input.value);
    window.location = 'Pages/game.html';
}

form.addEventListener('submit', handleSubmit);