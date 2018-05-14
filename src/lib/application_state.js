// State stores all the application data and do 2 way data binding
export default function ApplicationState() {
  var self = this;
  var data = {};
  var bindeds = {};

  this.onStateChange = null;

  // Registed DOM element as binded
  // Arguments:
  //   item {Element} - input or select with uce-bind attribute
  this.registerBinded = function(item) {
    const valName = item.getAttribute('uce-bind');

    registerGetterAndSetterFor(valName);

    if (item.value) this[valName] = item.value;

    // listen element changes
    item.addEventListener('input', (event) => {
      this[event.target.getAttribute('uce-bind')] = event.target.value;
    });

    // add element to list of binded elements to update on state update
    bindeds[valName] = item;
  }

  function registerGetterAndSetterFor(valName) {
    if (!self.hasOwnProperty(valName)) {
      Object.defineProperty(self, valName, {
        set: function(x) { data[valName] = x; onDataChange(valName); },
        get: function() { return data[valName]; }
      });
    }
  }

  function onDataChange(nameOfChanged) {
    if (bindeds[nameOfChanged])
      bindeds[nameOfChanged].value = data[nameOfChanged];

    if (self.onStateChange && (typeof self.onStateChange === 'function'))
      self.onStateChange(nameOfChanged);
  }
}
