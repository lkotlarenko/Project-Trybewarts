const inputMail = document.querySelector('#inp-mail');
const inputPass = document.querySelector('#inp-pass');
const btnLogin = document.querySelector('#btn-login');

function checkUser(event) {
  event.preventDefault();
  if (inputMail.value === 'tryber@teste.com' || inputPass.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

btnLogin.addEventListener('click', checkUser);
