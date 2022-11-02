console.log('test client side js');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then(({ puzzle }) => {
//     console.log(puzzle);
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch('/weather?address=' + location).then((response) => {
    response.json().then(({ error, location, forecast, address }) => {
      if (error) {
        messageOne.textContent = error;
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
        console.log(location);
        console.log(forecast);
        console.log('response', response);
        console.log('address', address);
      }
    });
  });

  return;
});
