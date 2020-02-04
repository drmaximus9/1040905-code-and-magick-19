'use strict';

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var isUserNameInputInFocus;
var userNameInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    if (!isUserNameInputInFocus) {
      closePopup();
    }
  }
};

userNameInput.addEventListener('focus', function () {
  isUserNameInputInFocus = true;
});

userNameInput.addEventListener('blur', function () {
  isUserNameInputInFocus = false;
});


var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
  } else if (target.value.length === MAX_NAME_LENGTH) {
    target.setCustomValidity('Имя не должно превышать 25-ти символов ' + MAX_NAME_LENGTH + '-х символов');
  } else {
    target.setCustomValidity('');
  }
});


var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Лолита', 'Вашингтон'];
var WIZARD_FAMILIES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb (56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');

var wizardCoatColor = setup.querySelector('.wizard-coat');
var wizardEyesColor = setup.querySelector('.wizard-eyes');
var wizardFireballColor = setup.querySelector('.setup-fireball-wrap');

wizardCoatColor.addEventListener('click', function () {
  wizardCoatColor.style.fill = getRandElement(WIZARD_COATS);
});

wizardEyesColor.addEventListener('click', function () {
  wizardEyesColor.style.fill = getRandElement(WIZARD_EYES);
});

wizardFireballColor.addEventListener('click', function () {
  wizardFireballColor.style.backgroundColor = getRandElement(WIZARD_FIREBALLS);
});

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getFullName = function () {
  var fullName = getRandElement(WIZARD_NAMES) + ' ' + getRandElement(WIZARD_FAMILIES);
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


