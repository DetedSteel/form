import axios from 'axios';

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let arrayE = Array.from(e.target.children);
  let data = {};
  console.log(arrayE)
  arrayE.forEach((e) => {
    if (e.localName == 'input') {
      if (e.type == 'radio') {
        if (e.checked) {
          data[e.attributes.name.value] = e.value;
        }
      } else {
        data[e.attributes.name.value] = e.value;
      }
    }
  });
  axios({
    method: 'post',
    url: 'http://localhost:3000/register',
    data: data
  }).then(res => console.log(res))
});

let a = [1, 2];
a.includes;
