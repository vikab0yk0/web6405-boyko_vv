class SubscriptionRequest {
  constructor(login, password, cardNumber, plan, consent) {
    this.login = login;
    this.password = password;
    this.cardNumber = cardNumber;
    this.plan = plan;
    this.consent = consent;
    this.createdAt = new Date().toLocaleString('ru-RU');
  }

  printFormatted() {
    console.log(
      `\nЛогин          : ${this.login}\n` +
      `Пароль         : ${this.password}\n` +
      `Номер карты    : ${this.cardNumber}\n` +
      `Тариф          : ${this.plan}\n` +
      `Согласие       : ${this.consent ? 'Да' : 'Нет'}\n` +
      `Время отправки : ${this.createdAt}\n\n`
    );
  }
}

const authForm = document.getElementById('authForm');
const formStatus = document.getElementById('formStatus');

function showStatus(message, isError) {
  formStatus.textContent = message;
  formStatus.classList.remove('form__status--error', 'form__status--success');
  formStatus.classList.add('form__status--visible');
  formStatus.classList.add(isError ? 'form__status--error' : 'form__status--success');
}

authForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const login = document.getElementById('login').value.trim();
  const password = document.getElementById('password').value;
  const cardRaw = document.getElementById('card').value;
  const cleanCard = cardRaw.replace(/\s+/g, '');
  const plan = document.getElementById('plan').value;
  const consent = document.getElementById('consent').checked;

  if (login.length < 3) {
    showStatus('Ошибка: позывной должен быть не короче 3 символов.', true);
    return;
  }

  if (password.length < 6) {
    showStatus('Ошибка: секретный код должен содержать минимум 6 символов.', true);
    return;
  }

  if (!/^\d{16}$/.test(cleanCard)) {
    showStatus('Ошибка: номер карты должен состоять ровно из 16 цифр.', true);
    return;
  }

  if (!consent) {
    showStatus('Ошибка: нужно согласие на обработку данных и передачу кармы.', true);
    return;
  }

  const request = new SubscriptionRequest(login, password, cleanCard, plan, consent);
  request.printFormatted();

  showStatus(`Готово, ${request.login}. Тариф «${request.plan}» активирован.`, false);
});