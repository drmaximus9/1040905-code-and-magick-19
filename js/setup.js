'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Лолита', 'Вашингтон'];
var WIZARD_FAMILIES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getFullName = function () {
  var fullName = getRandElement(WIZARD_NAMES) + getRandElement(WIZARD_FAMILIES);
  return fullName;
};

var wizards = [
  {
    name: getFullName(),
    coatColor: getRandElement(WIZARD_COATS),
    eyeColor: getRandElement(WIZARD_EYES)
  },
  {
    name: getFullName(),
    coatColor: getRandElement(WIZARD_COATS),
    eyeColor: getRandElement(WIZARD_EYES)
  },
  {
    name: getFullName(),
    coatColor: getRandElement(WIZARD_COATS),
    eyeColor: getRandElement(WIZARD_EYES)
  },
  {
    name: getFullName(),
    coatColor: getRandElement(WIZARD_COATS),
    eyeColor: getRandElement(WIZARD_EYES)
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

