export const sendForm = async formData => {
	try {
		const response = await fetch('http://localhost:9090/api/registration', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(Object.fromEntries(formData)),
		});

		if (!response.ok) throw new Error(response.statusText);
		return await response.json();
	} catch (error) {
		console.error('Ошибка отправки формы', error);
		return { status: 'error', message: 'Ошибка отправки формы' };
	}
};
