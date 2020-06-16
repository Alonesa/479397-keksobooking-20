'use strict';

var QUANTiTY = 8;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var Y_MIN = 130;
var Y_MAX = 630;
var MAP_PIN_WIDTH = 50;
var INITIAL_DATA = 0;
var url = 'img/avatars/user0';
var typeOfObject = ['palace', 'flat', 'house', 'bungalo'];
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

var array = [];

var getObj = function (index) {
  return {
    author: {
      avatar: url + index + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: '600, 350',
      price: 0,
      type: typeOfObject,
      rooms: getRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: 0,
      checkin: checkHours,
      checkout: checkHours,
      features: featuresList,
      description: 'Описание',
      photos: photosList
    },
    location: {
      x: getRandomValue(INITIAL_DATA, mapPinRightmostX),
      y: getRandomValue(Y_MIN, Y_MAX)
    }
  };
};

var getObjs = function () {
  for (var i = INITIAL_DATA; i <= QUANTiTY; i++) {
    array.push(getObj(i));
  }
};

getObjs();

var createPin = function () {
  var pinFragment = document.createDocumentFragment();
  var pin = document.querySelector('#pin').content;
  var newPin = pin.cloneNode(true);
  pinFragment.appendChild(newPin);
  return pinFragment;
};

var createPins = function () {
  var fragment = document.createDocumentFragment();
  var mapPin = document.querySelector('.map__pin');
  for (var j = 1; j < array.length; j++) {
    var pin = createPin();
    pin.querySelector('.map__pin').style.left = array[j].location.x + (mapPin.offsetWidth / 2) + 'px';
    pin.querySelector('.map__pin').style.top = array[j].location.y - mapPin.offsetHeight + 'px';
    pin.querySelector('img').src = array[j].author.avatar;
    pin.querySelector('img').alt = array[j].offer.title;
    fragment.appendChild(pin);
  }
  return fragment;
};


var renderPins = function () {
  var newMapPins = createPins(array);
  mapPins.appendChild(newMapPins);
};

renderPins(array);
