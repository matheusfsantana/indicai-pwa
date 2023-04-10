const submitButton = document.querySelector('#submitButton');
const cardList = document.querySelector('#card-list');


const res = await fetch('../../banco_fake.json');
const data = await res.json();

const renderData = () => {
  data.map((item) => {

    cardList.innerHTML += `
      <div class="col-12 mb-4 mt-2 card-custom" id="card-${item.id}">
        <div class="col-12 d-flex justify-content-center img-div">
          <img src="${item.url}" alt="${item.descricao} width:{140px}">
        </div>

        <div class="row mt-2 info-div">
          <div class="col-10 list-info">
            <div class="p-1 card-info" id="categoria-${item.id}">
              <p>Categorias: ${item.categoria}</p>
            </div>

            <div class="d-flex p-2 card-info" id="local-${item.id}">
              <p>${item.local}</p>
            </div>
          </div>

          <div class="col-2 d-flex justify-content-center mt-4">
            <i class="fa-solid fa-location-dot fa-2xl" style="color: #0a0a0a;"></i>
          </div>
        </div>
      </div>
    `
  })
}

//renderData()



submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const formField = document.querySelector('#textField').value;

  const dataFilterd = data.filter((object, index) => {
    const [id, url, categoria, local, descricao] = Object.entries(object);

    if (formField === categoria[1] || formField === local[1]) {
      return object
    }
  })

  console.log(dataFilterd)
})

//Geolocalização
//permissão de localização
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log("Latitude: " + lat + ", Longitude: " + lon);
    
    const apiKey = "a8a8ef7989b9405b9c8e59cad82e987a"

    var url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        var address = data.features[0].properties.city;  
        document.getElementById("address").innerHTML = address;
      })
      .catch(error => console.error(error));
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}


