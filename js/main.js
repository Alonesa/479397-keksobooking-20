'use strict';

var QUANTITY = 8;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var Y_MIN = 130;
var Y_MAX = 630;
var MIN_PRICE = 0;
var MAX_PRICE = 1000000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 3;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var LINK = 'img/avatars/user0';
var TYPES_OF_RENT = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_HOURS = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var mapWithOffers = document.querySelector('.map');
var mapPinRightmostX = mapWithOffers.offsetWidth - MAP_PIN_WIDTH - 1;
var mapPins = document.querySelector('.map__pins');


var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var propertyTypesList = [];

var getOfferInitialData = function (index) {
  var positionX = getRandomValue(0, mapPinRightmostX);
  var positionY = getRandomValue(Y_MIN, Y_MAX);
  return {
    author: {
      avatar: LINK + (index + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: positionX + ', ' + positionY,
      price: getRandomValue(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES_OF_RENT),
      rooms: getRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomValue(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECK_HOURS),
      checkout: getRandomElement(CHECK_HOURS),
      features: FEATURES_LIST,
      description: 'Описание',
      photos: PHOTOS_LIST
    },
    location: {
      x: positionX,
      y: positionY
    }
  };
};

var getOffers = function () {
  for (var i = 0; i < QUANTITY; i++) {
    propertyTypesList.push(getOfferInitialData(i));
  }
};

getOffers();

var createPin = function () {
  var pinTemplate = document.querySelector('#pin').content;
  var newPin = pinTemplate.cloneNode(true);
  return newPin;
};

var createPins = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < propertyTypesList.length; j++) {
    var pin = createPin();
    pin.querySelector('.map__pin').style.left = propertyTypesList[j].location.x + (MAP_PIN_WIDTH / 2) + 'px';
    pin.querySelector('.map__pin').style.top = propertyTypesList[j].location.y - MAP_PIN_HEIGHT + 'px';
    pin.querySelector('img').src = propertyTypesList[j].author.avatar;
    pin.querySelector('img').alt = propertyTypesList[j].offer.title;
    fragment.appendChild(pin);
  }
  return fragment;
};


var renderPins = function () {
  var newMapPins = createPins();
  mapPins.appendChild(newMapPins);
};

var oldElementRemove = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

var childRender = function (callRender, elementAppend) {
  var createNewElement = callRender();
  elementAppend.appendChild(createNewElement);
};

var createFeatures = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < propertyTypesList[j].offer.features.length; j++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + FEATURES_LIST[j]);
    fragment.appendChild(listItem);
  }
  return fragment;
};

var addPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < propertyTypesList[j].offer.photos.length; j++) {
    var imgItem = document.createElement('img');
    imgItem.classList.add('popup__photo');
    imgItem.src = propertyTypesList[j].offer.photos[j];
    imgItem.width = 45;
    imgItem.height = 40;
    imgItem.alt = 'Фотография жилья';
    fragment.appendChild(imgItem);
  }
  return fragment;
};

var propertyTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var cardTemplate = document
.querySelector('#card')
.content.querySelector('.map__card');

var createProduct = function (currentElement) {
  var productCard = cardTemplate.cloneNode(true);

  productCard.querySelector('.popup__title')
  .textContent = currentElement.offer.title;
  productCard.querySelector('.popup__text--address')
  .textContent = currentElement.offer.address;
  productCard.querySelector('.popup__text--price')
  .textContent = currentElement.offer.price + ' ₽/ночь';
  var propertyType = productCard.querySelector('.popup__type');
  propertyType.textContent = propertyTypes[currentElement.offer.type];
  productCard.querySelector('.popup__text--capacity')
  .textContent = currentElement.offer.rooms + ' комнаты для '
  + currentElement.offer.guests + ' гостей';
  productCard.querySelector('.popup__text--time')
  .textContent = 'Заезд после ' + currentElement.offer.checkin + ', '
  + 'выезд до ' + currentElement.offer.checkout;

  var featuresList = productCard.querySelector('.popup__features');
  oldElementRemove(featuresList);
  childRender(createFeatures, featuresList);

  productCard.querySelector('.popup__description')
  .textContent = currentElement.offer.description;

  var propertyPhotos = productCard.querySelector('.popup__photos');
  oldElementRemove(propertyPhotos);
  childRender(addPhotos, propertyPhotos);

  var propertyAuthorAvatar = productCard.querySelector('.popup__avatar');
  propertyAuthorAvatar.src = currentElement.author.avatar;

  return productCard;
};

var newCard = createProduct(propertyTypesList[0]);

var adForm = document.querySelector('.ad-form');
var mapFiltersForm = document.querySelector('.map__filters');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var filtersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
var mainPin = mapWithOffers.querySelector('.map__pin--main');
mainPin.draggable = true;

var formDiactivation = function (disableElements) {
  for (var i = 0; i < disableElements.length; i++) {
    disableElements[i].disabled = true;
  }
};

var disableFormElements = function () {
  formDiactivation(adFormElements);
  formDiactivation(filtersFormElements);
};

disableFormElements();

var makeformElementsEnabled = function (disableElements) {
  for (var i = 0; i < disableElements.length; i++) {
    disableElements[i].disabled = false;
  }
};

var enableFoemElements = function () {
  makeformElementsEnabled(adFormElements);
  makeformElementsEnabled(filtersFormElements);
};

var formActivation = function () {
  mapWithOffers.classList.remove('map--fadded');
  adForm.classList.remove('ad-form--disabled');
  renderPins();

  mapWithOffers.querySelector('.map__filters-container')
  .insertBefore(newCard, null);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    enableFoemElements();
    formActivation();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    enableFoemElements();
    formActivation();
  }
});
