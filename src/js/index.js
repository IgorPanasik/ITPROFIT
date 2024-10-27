import IMask from 'imask';
import '../styles/style.scss';
import { openModal } from './modal.js';
import { sendForm } from './sendForm.js';
import { validateForm } from './validation.js';

const phoneInput = document.getElementById('phone');
const maskOptions = { mask: '+375 (00) 000-00-00', lazy: false };
IMask(phoneInput, maskOptions);

const loader = document.getElementById('loader');
const form = document.getElementById('contactForm');

// Переменная для хранения результата отправки
let modalMessage = '';

// Функция для управления отображением ошибок
const displayErrors = errors => {
	Object.entries(errors).forEach(([key, message]) => {
		const input = document.querySelector(`[name="${key}"]`);
		const errorSpan = document.getElementById(`${key}-error`);
		if (input && errorSpan) {
			errorSpan.textContent = message;
			input.classList.add('error-border');
		}
	});
};

// Функция для сброса состояний полей формы
const resetFormState = () => {
	form.reset();
	IMask(phoneInput, maskOptions);
	document
		.querySelectorAll('.form__error-message')
		.forEach(e => (e.textContent = ''));
	document
		.querySelectorAll('.error-border, .border-green')
		.forEach(el => el.classList.remove('error-border', 'border-green'));
};

// Функция для скрытия сообщений об ошибках
const clearErrorMessages = () => {
	document
		.querySelectorAll('.form__error-message')
		.forEach(e => (e.textContent = ''));
	document
		.querySelectorAll('.error-border')
		.forEach(el => el.classList.remove('error-border'));
};

// Обработчик отправки формы
form?.addEventListener('submit', async e => {
	e.preventDefault();

	// Показ загрузчика
	loader.style.display = 'block';

	// Очищаем сообщения об ошибках перед валидацией
	clearErrorMessages();

	const formData = new FormData(form);

	// Проверка на ошибки
	const errors = validateForm(formData);
	if (Object.keys(errors).length > 0) {
		loader.style.display = 'none';
		displayErrors(errors);
		modalMessage = 'Форма содержит ошибки';
		return;
	}

	// Отправка данных на сервер
	const response = await sendForm(formData);
	loader.style.display = 'none';

	// Устанавливаем сообщение в зависимости от результата
	if (response?.status === 'success') {
		modalMessage = 'Форма успешно отправлена';
		resetFormState();
	} else {
		resetFormState();
		modalMessage = response.message || 'Произошла ошибка. Попробуйте еще раз.';
		displayErrors(response?.fields || {});
	}

	// Открываем модальное окно с сообщением
	openModal(modalMessage);
});

// Открытие модального окна по клику на кнопку с текущим результатом
document
	.getElementById('open-modal')
	?.addEventListener('click', () =>
		openModal(modalMessage || 'Пример сообщения')
	);
