// SRC JS for a-quiet-workspace.com
// by Jacob Stordahl / jacobstordahl.net

window.addEventListener('load', ()=> {

// Clock
  function clock(){
      const clock = new Date();

      let hours = clock.getHours();
      let minutes = clock.getMinutes();

      hours = ("0" + hours).slice(-2);
      minutes = ("0" + minutes).slice(-2);

      document.querySelector('#time').innerHTML =
        hours + ":" + minutes ;

      // var t = setTimeout(clock, 500);
  }
  setInterval(clock, 1000);

// Weather
  let long;
  let lat;
  let weatherDesc = document.querySelector("#weather-desc");
  let weatherInt = document.querySelector("#weather-int");
  let weatherDegree = document.querySelector("#weather-degree");

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
          console.log(data)
          const {temperature, summary} = data.currently;

          //inject weather data
          weatherInt.textContent = Math.round(temperature);
          weatherDesc.textContent = summary;

            //formula for celsius
            let celsius = Math.round((temperature - 32) * (5 / 9));
          //change f/c
          weatherDegree.addEventListener('click', ()=>{
            if (weatherDegree.textContent === "f"){
              weatherDegree.textContent = "c";
              weatherInt.textContent = celsius;
            } else{
              weatherDegree.textContent = "f";
              weatherInt.textContent = Math.round(temperature);
            }
          })
        }
      )
    });
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
