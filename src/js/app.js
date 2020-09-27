import debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import { alert } from '@pnotify/core/dist/PNotify.js';
import { defaults } from '@pnotify/core';

import fetchCountries from './fetchCountries';
import countriesTpl from '../templates/countries.hbs';
import countryTpl from '../templates/country.hbs'


defaults.styling = 'material';
defaults.icons = 'material';


const searchInputRef = document.querySelector('input[name=searchInput]');
const countriesInsertRef = document.querySelector('.countries-insert-js');

searchInputRef.addEventListener('input', debounce(searchInputHandler, 500));

function searchInputHandler() {

  if (searchInputRef.value.length === 0) {
    return;
  }

  fetchCountries(searchInputRef.value)
  .then(data => {
    countriesInsertRef.innerHTML = '';
    let markup = null;
    
    if (data.length === 1) {
      markup = countryTpl(data);
      countriesInsertRef.innerHTML = markup;
    } else if (data.length > 1 && data.length <= 10) {
      markup = countriesTpl(data);
      countriesInsertRef.innerHTML = markup;
    } else if (data.length > 10) {
      alert({
        text: "Too many matches found. Please enter a more specific query!",
        type: 'error'
      });
    }
  })
  .catch(console.log);
}
