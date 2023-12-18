import axios from 'axios';
import Imask from 'imask';

const form = document.querySelector('#form');
const phone = document.querySelector('#phone');
const btn = document.querySelector('.btn');
const container = document.querySelector('.container');
const dateNode = document.querySelector('#date');

const mask = new Imask(phone, {
  mask: '+7 (900) 000-00-00',
});

phone.addEventListener('input', () => {
  if (mask.masked.isComplete) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'true');
  }
});

dateNode.addEventListener('focus', (e) => {
  e.target.setAttribute('type', 'date');
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let arrayE = Array.from(e.target.children);
  let data = {};
  let date = Date.now();
  const date2 = new Date(date);
  data.dateOfRegister = date2.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  arrayE.forEach((e) => {
    if (e.localName == 'div') {
      let array2 = Array.from(e.children);
      array2.forEach((i) => {
        if (i.checked) {
          data[i.attributes.name.value] = i.value;
        }
      });
    } else if (e.localName == 'input') {
      if (e.attributes.name.value !== 'check') {
        if (e.attributes.name.value === 'date') {
          let date3 = new Date(e.value);
          data[e.attributes.name.value] = date3.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } else {
          data[e.attributes.name.value] = e.value;
        }
      }
    }
  });
  axios({
    method: 'post',
    url: 'http://77.223.126.234:3000/register',
    data: data,
  })
    .then((res) => {
      if (res.status === 200) {
        container.innerHTML = `<div class="alert alert-succes">До встречи.</div>`;
      } else {
        container.innerHTML = `<div class="alert">На сервере что-то пошло не так, мы уже фиксим!</div>`;
      }
    })
    .catch((err) => {
      container.innerHTML = `<div class="alert">На сервере что-то пошло не так, мы скоро исправим!</div>`;
    });
});
