export const hideAlert = (): void => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement?.removeChild(el);
};

export const showAlert = (type: 'success' | 'error', msg: string): void => {
  hideAlert();
  const alertTypeClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const markup = `
    <div class="alert fixed top-0 left-1/2 transform -translate-x-1/2 z-50 text-white text-xl font-normal text-center rounded-b-md py-6 px-60 shadow-lg ${alertTypeClass}">
      ${msg}
    </div>`;
  document.body.insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
