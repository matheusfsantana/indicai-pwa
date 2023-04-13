
const submitButton = document.querySelector('#submitButton');
const cardList = document.querySelector('#card-list');

const filtersApply = document.querySelector("#filters-apply");
const filterOptions = document.querySelector("#filter-options");
const filterContent = document.querySelector("#filter-content");

let filterOptionsIsActive = false;
let currentsInputsChecked = [];


// Dados do DB
const res = await fetch('../../banco_fake.json');
const data = await res.json();

// Rendereiza na Home quando abre o app
const renderData = (listOfObjects) => {
  cardList.innerHTML = ''
  listOfObjects.map((item) => {

    cardList.innerHTML += `
      <div class="minhaDiv mb-4 mt-2 card-custom" id="card-${item.id}">
        <div class="img-div">
          <img src="${item.url}" alt="${item.descricao}">
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
            <i class="fa-solid fa-location-dot fa-2xl" style="color: #b66e6f;"></i>
          </div>
        </div>
      </div>
    `
  })  
}

renderData(data);

//GAMBIARRA MODAL KKASKDSKDAKDSK
document.addEventListener('click', function(event) {
  var minhaDiv = event.target.closest('.minhaDiv.mb-4.mt-2.card-custom');
  if (minhaDiv) {

    var value = parseInt(minhaDiv.id.split('-')[1]);
    var url = data[value-1].url;
    var modal = document.querySelector('#myModal');
    modal.querySelector('.modal-title').innerHTML = data[value-1].local;
    modal.querySelector('.modal-body').innerHTML = 
    `<div class="img-div-modal"><img src="${data[value-1].url}" alt="${data[value-1].descricao}"></div> 
    <div class="text-on-line mt-4">DESCRIÇÃO</div>
    <div><p>${data[value-1].descricao}</p></div>
    <div class="text-on-line mt-4">CATEGORIA</div>
    <div><p>${data[value-1].categoria}</p></div>
    <div class="text-on-line mt-4">LOCALIZAÇÃO</div>
    <div><p>${data[value-1].local}</p></div>`;
    
    $(modal).modal('show');
  }
});

//CONTEUDO DO FILTRO
const openFilterContent = () => {
  filterContent.innerHTML = '';
  filterContent.innerHTML = `
    <form id="form-filter-options" >
      <div class="text-on-line mt-4">LOCAIS</div>
      <div class="filter_list mt-2 ml-3">
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2" name="locais" value="recife"> Recife</label><br>
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2" name="locais" value="olinda"> Olinda</label><br>
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2" name="locais" value="igarassu"> Igarassu</label><br>
      </div>

      <div class="text-on-line mt-4">ESTILOS</div>
      <div class="filter_list mt-2 ml-3">
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2 mr-2" name="estilos" value="natureza"> Natureza</label><br>
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2" name="estilos" value="alimentacao"> Alimentacao</label><br>
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2" name="estilos" value="fotos de rua"> Fotos de Rua</label><br>
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2" name="estilos" value="espaços culturais e lazer"> Espacos Culturais e Lazer</label><br>
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2" name="estilos" value="pores do sol"> Pores do Sol</label><br>
        <label class="d-flex align-items-center "><input type="checkbox" class="form-control mr-2" name="estilos" value="praias"> Praias</label><br>
      </div>

      <div class="row justify-content-center mt-4">
        <button type="button" id="botao-aplicar">APLICAR</button>
      </div>
    </form>
    `;
}

const closeFilterContent = () => {
  filterContent.innerHTML = '';
}

const getFilterInputChecked = () => {
  const formFilterOptions = document.querySelector("#form-filter-options");
  let filterInputs = formFilterOptions.getElementsByTagName('input');
  
  let filterInputsChecked = [];
  for (let i = 0; i < filterInputs.length; i++) {
    let item = filterInputs[i];
    if (item.type == "checkbox" && item.checked) {
      filterInputsChecked.push(item.value);
    }
  }

  return filterInputsChecked
}

const filterData = (listOfItens, data) => {
  const dataFiltered = data.filter((object) => {
    const [id, url, categoria, local, descricao] = Object.entries(object);

    for(let i = 0; i < listOfItens.length; i++) {
      let regex = new RegExp(`\\b${listOfItens[i]}\\w*\\b`, 'gi');
      if (regex.test(categoria[1]) || regex.test(local[1]) || regex.test(descricao[1])) {
        return object
      }
    }
  })

  return dataFiltered
}

const insertFiltersTag = (listOfItens) => {
  filtersApply.innerHTML = '';
  listOfItens.map((item) => {
    filtersApply.innerHTML += `
      <div class="btn-filter btn btn-outline-success d-flex align-items-center justify-content-around px-3">
        <span>${item}</span>
      </div>
    `
  })
}

const deleteAllFiltersTag = () => {
  filtersApply.innerHTML = '';
}

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
  deleteAllFiltersTag();
  if (dataFiltered.length === 0) {
    cardList.innerHTML = `
      <h4>Opss... Não encontramos nenhum resultado para essa busca</h4>
      <h2>Tente novamente</h2>
    `;
  } else {
    renderData(dataFiltered);
  }
  
});

filterOptions.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (!filterOptionsIsActive) {
    openFilterContent();
    if (filterContent.innerHTML !== '') {
      const botaoAplicar = document.querySelector("#botao-aplicar");
      botaoAplicar.addEventListener('click', (e) => {
        e.preventDefault();
        filterOptionsIsActive = false;
        currentsInputsChecked = getFilterInputChecked();
        const dataFiltered = filterData(currentsInputsChecked, data);
        insertFiltersTag(currentsInputsChecked);
      
        if (dataFiltered.length === 0) {
          cardList.innerHTML = `
            <h4>Opss... Não encontramos nenhum resultado para essa busca</h4>
            <h2>Tente novamente</h2>
          `;
        } else {
          renderData(dataFiltered);
        }
        closeFilterContent();
      });

      filterOptionsIsActive = true;
    }
  } else {
    closeFilterContent();
    filterOptionsIsActive = false;
  }
})



//Geolocalização
//permissão de localização
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    //pegando coordenadas
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log("Latitude: " + lat + ", Longitude: " + lon);
    
    const apiKey = "a8a8ef7989b9405b9c8e59cad82e987a"

    //request api, convertendo coodernadas em endereço.
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


