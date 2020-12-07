/* Author: 

*/

$("document").ready(function () {
  let apiKey = "311af908efa1e13e02d651f9e53cac50";

  search("mumbai");

  $(".search-form").submit(async function (e) {
    e.preventDefault();
    let searchField = $(this).find("#search");
    let searchTerm = searchField[0].value;
    search(searchTerm);
    //   console.log(searchData);
  });

  async function search(searchTerm) {
    let res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&&units=metric&appid=${apiKey}`
    );
    let data = await res.json();
    if (res.status == 200) {
      setData(data);
    } else {
      setError();
    }
  }

  let fields = {};
  fields.city = $(".city")[0];
  fields.temp = $(".temp")[0];
  fields.rain = $("#rain-data")[0];
  fields.wind = $("#wind-data")[0];
  fields.direction = $("#direction-data")[0];
  fields.day = $(".day")[0];
  fields.date = $(".date")[0];
  fields.icon = $("#weather-icon");

  function setData(data) {
    console.log(data);
    let city = data.name;
    let temp = data.main.temp;
    let direction = getDirection(data.wind.deg);
    let windSpeed = (data.wind.speed * 60 * 60) / 1000;
    // console.log(typeof windSpeed);
    windSpeed = windSpeed.toFixed(2);
    let clouds = data.clouds.all;

    fields.city.innerText = city;
    fields.temp.innerHTML = temp + "&#xb0;C";
    fields.rain.innerText = clouds;
    fields.wind.innerText = windSpeed;
    fields.direction.innerText = direction;
    //   console.log(fields);
    //   console.log("city", city);
    //   console.log("temp", temp);
    //   console.log("wind direction", direction);
    //   console.log("wind speed", windSpeed);
    //   console.log("clouds", clouds);
    let date = getDate();
    //   console.log(date);
    fields.day.innerText = date.day;
    fields.date.innerText = date.date;

    let icon = setIcon(data.weather[0].icon);
    fields.icon.attr("src", "assets/images/icons/" + icon + ".svg");
  }

  function setError() {
    fields.city.innerText = "City Not Found";
    fields.temp.innerText = "--";
    fields.rain.innerText = "--";
    fields.wind.innerText = "--";
    fields.direction.innerText = "--";
    fields.icon.attr("src", "assets/images/icons/" + "icon-1" + ".svg");
  }

  function getDirection(angle) {
    var directions = [
      "North",
      "North-West",
      "West",
      "South-West",
      "South",
      "South-East",
      "East",
      "North-East",
    ];
    return directions[
      Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8
    ];
  }

  function getDate() {
    var today = new Date();

    //get day
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let day = weekday[today.getDay()];

    // get month
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[today.getMonth().toString().substring(0, 3)];
    month = month.substring(0, 3);

    // get day
    let date = today.getDate();

    let dateObj = {
      day: day,
      date: date + " " + month,
    };
    return dateObj;
  }

  function setIcon(code) {
    let slicedCode = code.slice(0, 2);
    console.log(slicedCode);
    let x;
    switch (slicedCode) {
      case "01":
        x = "icon-2";
        break;
      case "02":
        x = "icon-3";
        break;
      case "03":
        x = "icon-5";
        break;
      case "04":
        x = "icon-6";
        break;
      case "09":
        x = "icon-2";
        break;
      case "10":
        x = "icon-4";
        break;
      case "11":
        x = "icon-12";
        break;
      case "13":
        x = "icon-8";
        break;
      case "50":
        x = "icon-8";
        break;
      default:
        x = "icon-1";
    }
    console.log("icon code", x);
    return x;
  }
});
