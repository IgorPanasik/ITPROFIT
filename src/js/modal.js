export const openModal = message => {
	const modal = document.getElementById('modal');
	const modalMessage = document.getElementById('modal-message');
	modalMessage.textContent = message;
	modal.classList.add('show');
	document.body.style.overflow = 'hidden';
};

export const closeModal = () => {
	const modal = document.getElementById('modal');
	modal.classList.add('fadeOut');

	setTimeout(() => {
		modal.classList.remove('show');
		modal.classList.remove('fadeOut');
		document.body.style.overflow = '';
	}, 400);
};

document.querySelector('.modal__close')?.addEventListener('click', closeModal);
