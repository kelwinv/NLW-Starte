const ufSelect = document.querySelector("select[name=uf]");
const citySelect = document.querySelector("select[name=city]");

ufSelect.addEventListener('change', getCities)

function getCities(event){
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(res => res.json())
    .then(cities => {
      for(city of cities){
        const optionElement = document.createElement('option');
        const optionText = document.createTextNode(city.nome);

        optionElement.appendChild(optionText);
        optionElement.setAttribute('value',city.id)
        citySelect.appendChild(optionElement);
      }
    })
  citySelect.removeAttribute('disabled')
}

function populateUfs(){
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(states =>{
      for(state of states){
        const optionElement = document.createElement('option');
        const optionText = document.createTextNode(state.nome);

        optionElement.appendChild(optionText);
        optionElement.setAttribute('value',state.id)
        ufSelect.appendChild(optionElement);
      }
    })
}

populateUfs();
