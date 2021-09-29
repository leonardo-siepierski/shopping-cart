const clear = document.querySelector('.empty-cart');
const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
const list = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

// requisito 7

const loading = () => {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.innerHTML = 'loading...';
  document.querySelector('body').appendChild(loadingDiv);
};

const loadingFinished = () => {
  document.querySelector('body').removeChild(document.querySelector('.loading'));
};

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

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// requisito 4 função storage salva o carrinho no localStorage
// e função starting recupera o localStorage

const storage = () => {
  localStorage.setItem('checkout', list.innerHTML);
};

const starting = () => {
  list.innerHTML = localStorage.getItem('checkout');
  list.addEventListener('click', cartItemClickListener);
};

// requisito 6 botão de limpar carrinho

const clearCart = () => {
  clear.addEventListener('click', () => {
    list.forEach((element) => list.removeChild(element));
    storage();
  });
};

window.onload = () => {
  starting();
  clearCart();
};
