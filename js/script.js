/*
- make a background updater function
- add animations fade in and fade out
*/

function showWeather(data) {
  var city = data.current_observation.display_location.city,
      state = data.current_observation.display_location.state,
      url = data.current_observation.image.url,
      temp_f = data.current_observation.temp_f,
      temp_c = data.current_observation.temp_c,
      feelslike_f = data.current_observation.feelslike_f,
      feelslike_c = data.current_observation.feelslike_c,
      observation_time = data.current_observation.observation_time,
      weather = data.current_observation.weather,
      icon = data.current_observation.icon,
      icon_url = data.current_observation.icon_url;

  $('#weatherInfo').html(
    '<p id="location">' + city + ', ' + state + '</p>' +
    '<img id="icon" src=' + icon_url + '>' +
    '<p id="weather" class="Information">' + weather + '</p>' +
    '<p id="tempInF" class="Farenheit Information">' + temp_f + ' &degF</p>' +
    '<p id="feelsLikeF" class="Farenheit Information">Feels like ' + feelslike_f + '  &degF</p>' +
    '<p id="tempInC" class="Celsius Information">' + temp_c + ' &degC</p>' +
    '<p id="feelsLikeC" class="Celsius Information">Feels like ' + feelslike_c + ' &degC</p>' +
    '<p id="obsTime" class="Information">' + observation_time + '</p>'
  );
  $('.Celsius').hide();
}

function getPicture(data) {
  var weatherString = data.current_observation.weather;
  console.log(weatherString);
  var weatherArray = weatherString.split(" ");
  console.log(weatherArray);
  var HeavyOrLight = weatherArray[0];
  console.log(HeavyOrLight);
  var remainderArray = weatherArray.slice(1);
  console.log(remainderArray);
  var remainderString = remainderArray.join(' ');
  console.log(remainderString);
  if (HeavyOrLight === 'Light' || HeavyOrLight === 'Heavy') {
    for (i=0; i < remainderArray.length; i++) {
      switch(remainderArray[i]) {
        // --- RAIN CASES ---
        case 'Drizzle':
        case 'Rain':
        case 'Thunderstorm':
        case 'Thunderstorms':
          $('body').css('background-image', "url('img/raining.jpg')");
          break;

        // --- SNOW / ICE CASES ---
        case 'Snow':
        case 'Ice':
        case 'Hail':
          $('body').css('background-image', "url('img/snowing.jpg')");
          break;

        // --- MIST ---
        case 'Mist':
        case 'Fog':
          $('body').css('background-image', "url('img/mist.jpg')");
          break;

        // --- VOLCANIC ASH ---
        case 'Ash':
          $('body').css('background-image', "url('img/ash.jpg')");
          break;

        // --- DUST ---
        case 'Dust':
        case 'Sand':
        case 'Sandstorm':
          $('body').css('background-image', "url('img/sandstorm.jpg')");
          break;

      } //end switch statement
    } //end for loop

    } else {
      for (i=0; i < weatherArray.length; i++) {
        switch(weatherArray[i]) {
          // --- CLOUD / CLOUDY ---
          case 'Clouds':
          case 'Cloudy':
          case 'Cloud':
            $('body').css('background-image',"url('img/cloudy_mountains.jpg')");
            break;

          // --- CLEAR ---
          case 'Clear':
            $('body').css('background-image',"url('img/clear_sky.jpg')");
            break;

          // --- OVERCAST ---
          case 'Overcast':
            $('body').css('background-image',"url('img/overcast_river.jpg')");
            break;

          // --- SQUALLS ---
          case 'Squalls':
            $('body').css('background-image',"url('img/storm.jpg')");
            break;

          // --- UNKNOWN ---
          case 'Unknown':
            $('body').css('background-image',"url('img/rolling_clouds.jpg')");
            break;

        } //end switch statement
      } //end for loop
    } //end else statement
} //end function

function getWeatherAndPicture () {
  $.getJSON('https://api.wunderground.com/api/32057b04a951d90e/conditions/q/autoip.json', function(data) {
    console.log(data);
    showWeather(data);
    getPicture(data);
  });
}

$(document).ready(function() {
  getWeatherAndPicture();
  $('#refresh').on('click', getWeatherAndPicture());
  $('#toggleTemp').click(function() {
    $('.Farenheit').toggle("slow");
    $('.Celsius').toggle("slow");
  });
});
