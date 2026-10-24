'use strict';

const STAGES = {
  1: { key: 'temptation', prompt: 'The tunnel knows what you want.', label: 'THE TUNNEL TEMPTS' },
  2: { key: 'permission', prompt: 'The tunnel remembers what you wanted.', label: 'THE TUNNEL OFFERS PERMISSION' },
  3: { key: 'recognition', prompt: 'The tunnel knows you now.', label: 'THE TUNNEL RECOGNIZES YOU' }
};

let characters = {};
let aliasIndex = {};

const params = new URLSearchParams(window.location.search);
const requestedStage = Number.parseInt(params.get('stage'), 10);
const stageNumber = [1, 2, 3].includes(requestedStage) ? requestedStage : 1;
const stage = STAGES[stageNumber];

const entryView = document.getElementById('entryView');
const experienceView = document.getElementById('experienceView');
const stagePrompt = document.getElementById('stagePrompt');
const form = document.getElementById('nameForm');
const input = document.getElementById('characterName');
const errorMessage = document.getElementById('errorMessage');
const tryAgain = document.getElementById('tryAgain');
const experienceLabel = document.getElementById('experienceLabel');
const experienceText = document.getElementById('experienceText');
const returnButton = document.getElementById('returnButton');

stagePrompt.textContent = stage.prompt;
experienceLabel.textContent = stage.label;

document.body.dataset.stage = String(stageNumber);

function normalizeName(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function buildAliasIndex(data) {
  const index = {};
  for (const [key, character] of Object.entries(data)) {
    index[normalizeName(key)] = key;
    index[normalizeName(character.displayName)] = key;
    for (const alias of character.aliases || []) {
      index[normalizeName(alias)] = key;
    }
  }
  return index;
}

function showError() {
  errorMessage.hidden = false;
  input.setAttribute('aria-invalid', 'true');
  input.focus();
  input.select();
}

function clearError() {
  errorMessage.hidden = true;
  input.removeAttribute('aria-invalid');
}

function showExperience(character) {
  const message = character[stage.key];
  if (!message) {
    showError();
    return;
  }

  experienceText.textContent = message;
  entryView.hidden = true;
  experienceView.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetExperience() {
  experienceView.hidden = true;
  entryView.hidden = false;
  input.value = '';
  clearError();
  setTimeout(() => input.focus(), 50);
}

async function loadCharacters() {
  try {
    const response = await fetch('characters.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    characters = await response.json();
    aliasIndex = buildAliasIndex(characters);
  } catch (error) {
    console.error('Unable to load character data:', error);
    form.innerHTML = '<p class="fatal-error">The tunnel is silent. Its names could not be summoned.</p>';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearError();

  const normalized = normalizeName(input.value);
  const characterKey = aliasIndex[normalized];

  if (!normalized || !characterKey || !characters[characterKey]) {
    showError();
    return;
  }

  showExperience(characters[characterKey]);
});

input.addEventListener('input', clearError);
tryAgain.addEventListener('click', () => {
  clearError();
  input.value = '';
  input.focus();
});
returnButton.addEventListener('click', resetExperience);

loadCharacters();
