let MAP;
import GoogleMap from "/GoogleMapsWrapper.js";
const HIKING_SEARCH_URL = 'https://trailapi-trailapi.p.mashape.com/';

const KEY = 'mKgYrf5fZCmshIxJDXUaZFvZFcqSp1RkRXcjsnY7zbEgYN7OfT'

/*
const getDataFromApi = (searchTerm, callback) => {
  const query = {
    q: `${searchTerm} in:name`,
    part: 'snippet',
    key: 'IjdW5kMm10msh4f3PRVlPRUqSjIKp10V24ojsn1XAd56mmVeKF',
    per_page: 5
  }
  $.getJSON(HIKING_SEARCH_URL, query, callback);
};
*/


function getDataFromApi(data) {
    $.ajax({
        url: HIKING_SEARCH_URL,
        headers: {
            'X-Mashape-Key': KEY
        },
        method: 'GET',
        data: data
     }).done(function(response) {
         // response is your json data
         handleResponse(response);
     }).catch(function(err) {
         console.log('error', err);
     });
}

function handleResponse(response) {
  console.log(response);
  response.places.forEach(place => MAP.addMarker({lat: place.lat, lng: place.lon}));
  console.log(response.places);
  let html = [];
  response.places.forEach(function (obj) {
    Array.prototype.push.apply(html, [[obj.city], [obj.name], [obj.directions]]);

    
 });
  console.log(html);
  //$('.js-search-results').html( '<p>Places: ' + '<br/>' + html.join('; ') + '</p>');
  let firstFivePlaces = response.places.slice(0, 5);
  $('#js-results-list');
  firstFivePlaces.forEach(function(place) {
    console.log(place);
    $('#js-results-list').append(
      '<div class="js-result-location">' + place.city + '; ' + place.state + '; ' + place.name + '; ' + place.directions + '</div>');
  });
 }
 

const onReady = () => {
  MAP = new GoogleMap();
  $('form').submit((event) => {
    event.preventDefault();
    let input = $('#js-query').val();
    let data = {
      'q[state_cont]': input
    }
    console.log(input);
    getDataFromApi(data, handleResponse)
  })
}
$(onReady);