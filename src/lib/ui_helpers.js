// Helper interface functions

export function buildInfoString(state) {
  let info = '';
  switch (state.sex) {
    case 'M': info += 'He'; break;
    case 'F': info += 'She'; break;
    default: info += 'It';
  }
  info += ' is ' + (state.age || '?') + ' years old';
  document.querySelector('#result').innerText = info;
}
