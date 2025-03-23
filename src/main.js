const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.form-input');
const outputEl = document.querySelector('.output');

formEl.addEventListener('submit', renderText);

function renderText(event) {
  event.preventDefault();
  const inputValue = inputEl.value;

  inputValue.split('').forEach((char, index) => {
    const span = createCharacterSpan(char, index);
    outputEl.appendChild(span);
    formEl.reset();
  });
}

function createCharacterSpan(char, index) {
  const span = document.createElement('span');
  span.textContent = char;
  span.classList.add('char');
  span.draggable = true;
  span.dataset.index = index;

  span.addEventListener('click', handleCharacterClick);
  span.addEventListener('dragstart', handleDragStart);
  span.addEventListener('dragover', handleDragOver);
  span.addEventListener('drop', handleDrop);

  return span;
}

function handleCharacterClick(event) {
  event.target.classList.toggle('selected');
}

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.index);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  const draggedIndex = event.dataTransfer.getData('text/plain');
  const targetIndex = event.target.dataset.index;

  if (
    draggedIndex === undefined ||
    targetIndex === undefined ||
    draggedIndex === targetIndex
  ) {
    return;
  }

  swapCharacters(draggedIndex, targetIndex);
}

function swapCharacters(draggedIndex, targetIndex) {
  const chars = Array.from(outputEl.children);

  [chars[draggedIndex].textContent, chars[targetIndex].textContent] = [
    chars[targetIndex].textContent,
    chars[draggedIndex].textContent,
  ];

  renderUpdatedText(chars);
}

function renderUpdatedText(chars) {
  outputEl.innerHTML = '';
  chars.forEach(char => outputEl.appendChild(char));
}
