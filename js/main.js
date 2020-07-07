'use strict';

var QUANTITY = 8;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var Y_MIN = 130;
var Y_MAX = 630;
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
mapWithOffers.classList.remove('map--faded');
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
  return {
    author: {
      avatar: LINK + index + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: '600, 350',
      price: getRandomValue(5000, 50000),
      type: getRandomElement(TYPES_OF_RENT),
      rooms: getRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomValue(1, 3),
      checkin: getRandomElement(CHECK_HOURS),
      checkout: getRandomElement(CHECK_HOURS),
      features: FEATURES_LIST,
      description: 'Описание',
      photos: PHOTOS_LIST
    },
    location: {
      x: getRandomValue(0, mapPinRightmostX),
      y: getRandomValue(Y_MIN, Y_MAX)
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
  for (var j = 1; j < propertyTypesList.length; j++) {
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

renderPins();

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
  for (var j = 0; j < propertyTypesList[0].offer.features.length; j++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + FEATURES_LIST[j]);
    fragment.appendChild(listItem);
  }
  return fragment;
};

var addPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < propertyTypesList[0].offer.photos.length; j++) {
    var imgItem = document.createElement('img');
    imgItem.classList.add('popup__photo');
    imgItem.src = propertyTypesList[0].offer.photos[j];
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

var createOffers = function () {
  var productCard = cardTemplate.cloneNode(true);

  productCard.querySelector('.popup__title')
  .textContent = propertyTypesList[0].offer.title;
  productCard.querySelector('.popup__text--address')
  .textContent = propertyTypesList[0].offer.address;
  productCard.querySelector('.popup__text--price')
  .textContent = propertyTypesList[0].offer.price + ' ₽/ночь';
  var propertyType = productCard.querySelector('.popup__type');
  propertyType.textContent = propertyTypes[propertyTypesList[0].offer.type];
  productCard.querySelector('.popup__text--capacity')
  .textContent = propertyTypesList[0].offer.rooms + ' комнаты для '
  + propertyTypesList[0].offer.guests + ' гостей';
  productCard.querySelector('.popup__text--time')
  .textContent = 'Заезд после ' + propertyTypesList[0].offer.checkin + ', '
  + 'выезд до ' + propertyTypesList[0].offer.checkout;

  var featuresList = productCard.querySelector('.popup__features');
  oldElementRemove(featuresList);
  childRender(createFeatures, featuresList);

  productCard.querySelector('.popup__description')
  .textContent = propertyTypesList[0].offer.description;

  var propertyPhotos = productCard.querySelector('.popup__photos');
  oldElementRemove(propertyPhotos);
  childRender(addPhotos, propertyPhotos);

  var propertyAuthorAvatar = productCard.querySelector('.popup__avatar');
  propertyAuthorAvatar.src = propertyTypesList[1].author.avatar;

  return productCard;
};

var newCard = createOffers();

mapWithOffers.querySelector('.map__filters-container')
.insertBefore(newCard, null);
