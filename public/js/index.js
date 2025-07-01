/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox.js';
import { login, logout } from './login.js';
import { updateData } from './updateSettings.js';
import { bookTour } from './stripe.js';

const mapBox = document.getElementById('map');
const logF = document.querySelector('.form--login');
const logoB = document.querySelector('.nav__el--logout');
const usDataForm = document.querySelector('.form-user-data');
const usPassForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');
if (logoB) logoB.addEventListener('click', logout);

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
if (logF) {
  logF.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (usDataForm) {
  usDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    //console.log(form);
    updateData(form, 'data');
  });
}
if (usPassForm) {
  usPassForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateData(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const tourId = e.target.dataset.tourId;
    bookTour(tourId);
  });
}
