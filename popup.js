const toggleButton = document.getElementById('toggleButton');
const popupBody = document.getElementById('popupBody');
let isEnabled;

function updateBackgroundColor() {
  popupBody.style.backgroundColor = isEnabled ? 'green' : 'black';
}

function updateToggleState() {
  chrome.runtime.sendMessage({ message: 'getToggleState' }, (response) => {
    isEnabled = response.isEnabled;
    updateBackgroundColor();
  });
}

toggleButton.addEventListener('click', () => {
  isEnabled = !isEnabled;
  updateBackgroundColor();
  chrome.runtime.sendMessage({ message: 'toggleEnabled', isEnabled: isEnabled });
});

updateToggleState();
