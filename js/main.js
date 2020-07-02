'use strict';

var QUANTITY = 8;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var Y_MIN = 130;
var Y_MAX = 630;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var url = 'img/avatars/user0';
var typesOfRent = ['palace', 'flat', 'house', 'bungalo'];
var checkHours = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var mapWithOffers = document.querySelector('.map');
mapWithOffers.classList.remove('map--faded');
var mapPinRightmostX = mapWithOffers.offsetWidth - MAP_PIN_WIDTH - 1;
var mapPins = document.querySelector('.map__pins');


var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var typesOfRentList = [];

var getOffersInitialData = function (index) {
  return {
    author: {
      avatar: url + index + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: '600, 350',
      price: 0,
      type: typesOfRent,
      rooms: getRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: 0,
      checkin: checkHours,
      checkout: checkHours,
      features: featuresList,
      description: 'Описание',
      photos: photosList
    },
    location: {
      x: getRandomValue(0, mapPinRightmostX),
      y: getRandomValue(Y_MIN, Y_MAX)
    }
  };
};

var getOffers = function () {
  for (var i = 0; i < QUANTITY; i++) {
    typesOfRentList.push(getOffersInitialData(i));
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
  for (var j = 1; j < typesOfRentList.length; j++) {
    var pin = createPin();
    pin.querySelector('.map__pin').style.left = typesOfRentList[j].location.x + (MAP_PIN_WIDTH / 2) + 'px';
    pin.querySelector('.map__pin').style.top = typesOfRentList[j].location.y - MAP_PIN_HEIGHT + 'px';
    pin.querySelector('img').src = typesOfRentList[j].author.avatar;
    pin.querySelector('img').alt = typesOfRentList[j].offer.title;
    fragment.appendChild(pin);
  }
  return fragment;
};


var renderPins = function () {
  var newMapPins = createPins();
  mapPins.appendChild(newMapPins);
};

renderPins();


var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createOffers = function () {
  var productCard = cardTemplate.cloneNode(true);

  var title = productCard.querySelector('.popup__title');
  title.textContent = getOffersInitialData.offer.title;

  for (var i = 0; i < typesOfRentList.lenght; i++) {
    createOffers(getOffersInitialData.offer[i]);
  }

  return title;
};

createOffers();
