var divEl = document.querySelector('div');

var buttonEl = document.querySelector('button');

divEl.onclick = function(event) {
    console.log('div');
}

buttonEl.onclick = function(event) {
    event.stopPropagation();
    console.log('Click me');
}