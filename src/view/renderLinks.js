export default (id) => {
  const currentLink = document.querySelector(`[data-id="${id}"]`);
  currentLink.classList.toggle('fw-bold');
  currentLink.classList.toggle('fw-normal');
};
