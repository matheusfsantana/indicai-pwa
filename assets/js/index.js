
const submitButton = document.querySelector('#submitButton');
const cardList = document.querySelector('#card-list');

// Dados do DB
const res = await fetch('../../banco_fake.json');
const data = await res.json();

// Rendereiza na Home quando abre o app
const renderData = (listOfObjects) => {
  cardList.innerHTML = ''
  listOfObjects.map((item) => {

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

renderData(data);


// Função de click do botao de filtro da home
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const formField = document.querySelector('#textField').value;
  
  const dataFiltered = data.filter((object, index) => {
    const [id, url, categoria, local, descricao] = Object.entries(object);

    const regex = new RegExp(`\\b${formField}\\w*\\b`, 'gi');
    if (regex.test(categoria[1]) || regex.test(local[1])) {
      return object;
    }
  })

  console.log(dataFiltered)
  renderData(dataFiltered);
  
})



