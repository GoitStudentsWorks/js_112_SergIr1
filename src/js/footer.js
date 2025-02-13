import { iziToast } from './module-libs.js';
import closeModalIcon from "/img/close-modal-btn.svg"

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.work-together-contact-form');
  const emailInput = document.getElementById('email');
  const commentInput = document.getElementById('user-comment');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('modal-close');

  if (!form || !emailInput || !commentInput || !modal || !closeModalBtn) {
    return;
  }

  // ====== pattern был строкой, теперь создаём RegExp ====== 
  const pattern = new RegExp(emailInput.getAttribute('pattern'));

  // ====== Отключаем встроенную валидацию браузера ======
  form.setAttribute("novalidate", "true");

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const comment = commentInput.value.trim();

    // ====== Проверяем пустой email ДО проверки по RegExp ====== 
    if (!email) {
      iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                timeout: 3500,
                position: "topRight",
                maxWidth: 432,
                titleColor: "#ffffff",
                messageColor: "#ffffff",
                backgroundColor: "#ef4040",
                close: false,
                closeIcon: true,
                closeIconColor: '#ffffff',
                closeOnEscape: true,
                closeOnClick: true,
                icon: 'font-icon',
                iconUrl: closeModalIcon,
      });
      return;
    }

    // ====== Проверяем email через pattern (теперь это RegExp!) ====== 
    if (!pattern.test(email)) {
      iziToast.error({
                message: 'Please enter a valid email address.',
                timeout: 3500,
                position: "topRight",
                maxWidth: 432,
                titleColor: "#ffffff",
                messageColor: "#ffffff",
                backgroundColor: "#ef4040",
                close: false,
                closeIcon: true,
                closeIconColor: '#ffffff',
                closeOnEscape: true,
                closeOnClick: true,
                icon: 'font-icon',
                iconUrl: closeModalIcon,
      });
      return;
    }

    if (!comment) {
      iziToast.warning({
            message: 'Please fill in all fields.',
            timeout: 2500,
            position: "topRight",
            backgroundColor: "#f0ad4e",
            messageColor: "#ffffff",
      });
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, comment }),
      });

      if (response.ok) {
        emailInput.value = '';
        commentInput.value = '';
        modal.classList.add('modal-active');

        iziToast.success({
            message: 'Application sent!',
            timeout: 2500,
            position: "topRight"
        });
      } else {
        iziToast.error({
                message: 'Please enter a valid email address.',
                timeout: 3500,
                position: "topRight",
                maxWidth: 432,
                titleColor: "#ffffff",
                messageColor: "#ffffff",
                backgroundColor: "#ef4040",
                close: false,
                closeIcon: true,
                closeIconColor: '#ffffff',
                closeOnEscape: true,
                closeOnClick: true,
                icon: 'font-icon',
                iconUrl: closeModalIcon,
        });
      }
    } catch (error) {
      iziToast.error({
                message: 'Please enter a valid email address.',
                timeout: 3500,
                position: "topRight",
                maxWidth: 432,
                titleColor: "#ffffff",
                messageColor: "#ffffff",
                backgroundColor: "#ef4040",
                close: false,
                closeIcon: true,
                closeIconColor: '#ffffff',
                closeOnEscape: true,
                closeOnClick: true,
                icon: 'font-icon',
                iconUrl: closeModalIcon,
      });

    }
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('modal-active');
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('modal-active');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.classList.remove('modal-active');
    }
  });

  const maxCommentLength = 50;

  commentInput.addEventListener('input', () => {
    if (commentInput.value.length > maxCommentLength) {
      commentInput.value = commentInput.value.substring(0, maxCommentLength) + '...';
    }
  });
});
