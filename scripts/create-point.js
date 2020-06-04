const ufSelect = document.querySelector("select[name=uf]");
const citySelect = document.querySelector("select[name=city]");
const collectedItems = document.querySelector("input[name=items]");
const itemToCollect = document.querySelectorAll('.items-grid li');

ufSelect.addEventListener('change', getCities)

function getCities(event){
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text

  citySelect.innerHTML = '<option> Selecione a cidade <option>';
  citySelect.disabled = true


  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(res => res.json())
    .then(cities => {
      for(city of cities){
        const optionElement = document.createElement('option');
        const optionText = document.createTextNode(city.nome);

        optionElement.appendChild(optionText);
        optionElement.setAttribute('value',city.nome)
        citySelect.appendChild(optionElement);
      }
    })
    citySelect.disabled = false
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



for(item of itemToCollect){
  item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];

function handleSelectedItem(event){
  const itemLi = event.target
  const itemsid = itemLi.dataset.id;

  if(selectedItems.find(item => item === itemsid)){
    itemLi.classList.remove("selected");
    selectedItems = selectedItems.filter(item => item != itemsid);
  }else{
    itemLi.classList.toggle("selected");
    selectedItems.push(itemsid);
  }
  collectedItems.value = selectedItems;

}