export const showModal = (player, options) => {
  // Show the modal
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  // Set up the modal buttons
  const modalOptions = options.modalOptions;
  const buttons = modal.getElementsByClassName('modal-button');
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.textContent = modalOptions[i].text;
    button.onclick = () => {
      modal.style.display = 'none';
      modalOptions[i].onClick(player);
    };
  }
};

export const hideModal = () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
};
