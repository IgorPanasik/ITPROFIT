export const getErrorMessage = key => {
	switch (key) {
		case 'name':
			return 'Поле Имя обязательное. Пример: Иван';
		case 'email':
			return 'Поле E-mail обязательное. Пример: ivan@gmail.com';
		case 'phone':
			return 'Поле Телефон обязательное';
		case 'message':
			return 'Поле Сообщение обязательное';
		default:
			return 'Это поле обязательно';
	}
};
