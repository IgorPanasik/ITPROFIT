import { getErrorMessage } from './helpers/getErrorMessage.js';

export const validateForm = formData => {
	const errors = {};
	formData.forEach((value, key) => {
		if (!value || (key === 'phone' && value === '+375 (__) ___-__-__')) {
			errors[key] = getErrorMessage(key);
		} else if (
			key === 'email' &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toString())
		) {
			errors[key] = 'Неверный формат email. Пример: ivan@gmail.com';
		}
	});
	return errors;
};
