const inputMail = document.querySelector('#inp-mail');
const inputPass = document.querySelector('#inp-pass');
const btnLogin = document.querySelector('#btn-login');
const counter = document.querySelector('#counter');
const textArea = document.querySelector('#textarea');
const btnSubmit = document.querySelector('#submit-btn');
const agreement = document.querySelector('#agreement');
const form = document.querySelector('#evaluation-form');

let state = false;

function checkUser(event) {
  event.preventDefault();
  if (inputMail.value === 'tryber@teste.com' && inputPass.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

function updateTextArea() {
  counter.innerText = 500 - textArea.value.length;
}

function checkSubmit() {
  if (state === false) {
    btnSubmit.disabled = false;
    state = true;
  } else {
    btnSubmit.disabled = true;
    state = false;
  }
}

// https://www.joshuacolvin.net/selected-checkbox-values/
function getChecked() {
  const selectedList = [];
  const checkInput = document.querySelectorAll(
    'input[class="subject"]:checked',
  );
  for (let i = 0; i < checkInput.length; i += 1) {
    selectedList.push(checkInput[i].value);
  }
  const checked = selectedList.join(', ');
  return checked;
}

function showAfterSubmit() {
  const selected = getChecked();
  const name = document.querySelector('#input-name').value;
  const lastName = document.querySelector('#input-lastname').value;
  const house = document.querySelector('#house').value;
  const mail = document.querySelector('#input-email').value;
  const family = document.querySelector('input[name ="family"]:checked').value;
  const rank = document.querySelector('input[name ="rate"]:checked').value;
  const text = textArea.value;
  form.innerHTML = `
        <p>Nome: ${name} ${lastName}</p>
        <p>Email: ${mail}</p>
        <p>Casa: ${house}</p>
        <p>Família: ${family}</p>
        <p>Matérias: ${selected}</p>
        <p>Avaliação: ${rank}</p>
        <p>Observações: ${text}</p>
      `;
}

btnSubmit.addEventListener('click', showAfterSubmit);
agreement.addEventListener('click', checkSubmit);
textArea.addEventListener('input', updateTextArea);
btnLogin.addEventListener('click', checkUser);
