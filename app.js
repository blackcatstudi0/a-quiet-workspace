// SRC JS for a-quiet-workspace.com
// by Jacob Stordahl / jacobstordahl.net
let time = document.getElementById('time')
let weatherDegree = document.getElementById('weather-degree');
let weatherDesc = document.getElementById('weather-desc');
let weatherInt = document.getElementById('weather-int');

window.addEventListener('load', ()=> {

// Clock
  const clock = () =>{
      const clock = new Date();

      let hours = clock.getHours();
      let minutes = clock.getMinutes();

      hours = ("0" + hours).slice(-2);
      minutes = ("0" + minutes).slice(-2);

      time.textContent =
        hours + ":" + minutes ;
  }
  setInterval(clock, 1000);

// Weather
  let long;
  let lat;

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/f28f306b5341a009ca6aaa83c3060134/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
          .then(data =>{
            // console.log(data) removed this console.log for deployment purposes. Shouldn't ever see this as a user 😄
            const {temperature, summary} = data.currently;
            //inject weather data
            weatherInt.textContent = Math.round(temperature);
            weatherDesc.textContent = summary;
            //formula for celsius
            let celsius = Math.round((temperature - 32) * (5 / 9));
            //change f/c
            weatherDegree.addEventListener('click', ()=>{
              if (weatherDegree.textContent === "°f"){
                weatherDegree.textContent = "°c";
                weatherInt.textContent = ` ${celsius}`;
              } else{
                weatherDegree.textContent = "°f";
                weatherInt.textContent = ` ${Math.round(temperature)}`;
              }
            })
          })
          .catch(err => {
              console.log("Error while formatting weather info: ", err)
          })
        .catch(err => {
          console.log("Error while fetching API data: ", err)
        });
    })
  }

//Modal
  let modal = document.querySelector(".modal");
  let modalBg = document.querySelector(".overlay");
  let modalClose = document.querySelector(".close-button");

  modalClose.addEventListener('click', ()=>{
    modalBg.classList.add("overlay-close");
    modal.classList.add("modal-close");
  })
});
