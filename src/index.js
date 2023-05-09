import './css/styles.css';
import Notiflix from 'notiflix'
import {fetchCountries} from "./fetchCountries.js"
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;


const input = document.querySelector("#search-box");
const itemsList = document.querySelector(".country-list");
const info = document.querySelector(".country-info");



function countrysSeartch(e){
e.preventDefault()
const data=fetchCountries(e.target.value)
data.then(country=>{
    if(country.length === 1){
        info.innerHTML="" 
        itemsList.innerHTML=""
    const markupCountry = `<li class=country>
    <img src="${country[0].flags.svg}" width="50" height="30">
    <h2>${country[0].name.official}</h2>
    </li>`
const markupInfo = `<p>Capital: ${country[0].capital}</p>
<p>Population: ${country[0].population}</p>
<p>Languages: ${Object.values(country[0].languages)}</p>`
itemsList.insertAdjacentHTML('afterbegin', markupCountry)
info.insertAdjacentHTML('afterbegin', markupInfo)
}
else if(country.length>1 && country.length <=10){
    info.innerHTML="" 
    itemsList.innerHTML=""  
   country.forEach(el=>{
    itemsList.insertAdjacentHTML('afterbegin',
    `<li><div class="stile">
    <img src="${el.flags.svg}" width="50" height="30">
    <h2>${el.name.official}</h2>
    </div></li>`
    )
   })
}
else if(country.status===404){
    info.innerHTML="" 
    itemsList.innerHTML=""
    Notiflix.Notify.failure("Oops, there is no country with that name")

}
else if(country.length>10){
    info.innerHTML="" 
    itemsList.innerHTML=""
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
}
})

}


input.addEventListener("input", debounce(countrysSeartch, DEBOUNCE_DELAY));

