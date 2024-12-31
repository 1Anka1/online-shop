const ul = document.querySelector('#list');
const counter = document.querySelector('#counter');
const deleteBtn = document.querySelector('#delete');
let cart = [];

document.addEventListener('DOMContentLoaded', () => fetchProducts());

async function fetchProducts() {
  await fetch('./products.json')
    .then((res) => res.json())
    .then(({ products }) => createProductList(products));
}

function createProductList(products) {
  for (const [key, { name, price, description, img }] of Object.entries(
    products
  )) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    const picture = document.createElement('img');
    const h2 = document.createElement('h2');
    const button = document.createElement('button');
    const span = document.createElement('span');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    picture.src = `${img}`;
    button.dataset.id = key;
    span.className = 'material-symbols-outlined basket';
    span.textContent = 'shopping_bag';
    h2.textContent = name;
    h3.textContent = `Price: ${price.toFixed(2)} PLN`;
    p.textContent = `Description: ${description}`;

    button.appendChild(span);
    h2.appendChild(button);
    li.appendChild(picture);
    li.appendChild(h2);
    li.appendChild(h3);
    li.appendChild(p);
    ul.insertAdjacentElement('afterbegin', li);

    button.onclick = (e) => addToCard(e, key, products);
  }
}

function addToCard(e, id, products) {
  e.preventDefault();

  const product = products[id];
  cart.push(product);
  counter.innerText = cart.length;

  updateDeleteButtonState();
}

function deleteAllProducts() {
  if (cart.length > 0) {
    cart = [];
    counter.innerText = cart.length;
    updateDeleteButtonState();
  }
}

function updateDeleteButtonState() {
  deleteBtn.disabled = cart.length === 0;
}

deleteBtn.onclick = deleteAllProducts;

updateDeleteButtonState();
