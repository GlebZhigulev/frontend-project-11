export default (ids) => {
  const currentVisitedID = [...ids.values()][ids.size - 1];
  const currentLink = document.querySelector(`[data-id="${currentVisitedID}"]`);
  currentLink.classList.toggle('fw-bold');
  currentLink.classList.toggle('fw-normal');
};
