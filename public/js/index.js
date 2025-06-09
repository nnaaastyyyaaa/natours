import '@babel/polyfill'
import { displayMap } from './mapbox.js';
import {login, logout} from './login.js'

const mapBox = document.getElementById('map')
const logF = document.querySelector('.form--login')
const logoB = document.querySelector('.nav__el--logout');

if(logoB) logoB.addEventListener('click', logout )

if(mapBox){
const locations =JSON.parse(mapBox.dataset.locations);
displayMap(locations)
}
if(logF){
logF.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)

})
}

