const cardList = document.querySelector('#card-list')

const res = await fetch('../../banco_fake.json');
const data = await res.json()
console.log(data);

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

renderData()




