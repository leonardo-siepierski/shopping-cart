const list = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// requisito 4

function save() {
  localStorage.setItem('checkout', document.querySelector('ol').innerHTML);
}

function recover() {
  localStorage.getItem('checkout', document.querySelector('ol').innerHTML);
}

// requisito 5
// repositório que me ajudou a realizar esse requisito: https://github.com/tryber/sd-015-a-project-shopping-cart/pull/94/files

const sumFunction = () => {
  let sum = 0;
  document.querySelectorAll('li').forEach((e) => {
    sum += parseFloat(e.innerText.split('$').pop());
  });
  return sum.toFixed(2);
};

const returnSum = () => {
  document.querySelector('.total-price').innerText = sumFunction();
};

// requisito 6

const clearCart = () => {
  document.querySelector('.empty-cart').addEventListener('click', () => {
    list.innerHTML = '';
    save();
    returnSum();
  });
};

// requisito 3

function cartItemClickListener(event) {
  event.target.remove();
  save();
  returnSum();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// requisito 7

const loading = () => {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.innerHTML = 'loading...';
  document.querySelector('body').appendChild(loadingDiv);
};

const removeLoading = () => document.querySelector('.loading').remove();

window.onload = () => {
  sumFunction();
  returnSum();
  clearCart();
};
