import ApplicationState from './lib/application_state';
import { buildInfoString } from './lib/ui_helpers';

import './stylesheets/index.scss';

var state = new ApplicationState();

document.addEventListener('DOMContentLoaded', function() {
  const list = document.querySelectorAll('input[uce-bind], select[uce-bind]');
  for (const item of list) {
    state.registerBinded(item);
  }

  // restore saved in localSorage values
  let savedLocals = window.localStorage.getItem('saved_state');
  if (savedLocals) {
    savedLocals = JSON.parse(savedLocals);
    for (const name in savedLocals) {
      state[name] = savedLocals[name];
    }
  }

  const btn100Years = document.getElementById('set100years');
  btn100Years.addEventListener('click', function() {
    state.age = 100;
  });


  buildInfoString(state);

  state.onStateChange = function (nameOfChanged) {
    // save value to localStorage
    let svdLocals = window.localStorage.getItem('saved_state');
    svdLocals = svdLocals ? JSON.parse(svdLocals) : {};
    svdLocals[nameOfChanged] = state[nameOfChanged];
    window.localStorage.setItem('saved_state', JSON.stringify(svdLocals));

    buildInfoString(state);
  }
});
