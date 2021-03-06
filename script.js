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

const sumFunction = () => {
  let sum = 0;
  document.querySelectorAll('li').forEach((element) => {
    sum += parseFloat(element.innerText.split('$').pop());
  });
  return parseFloat(sum.toFixed(2));
};

const printSum = () => {
  document.querySelector('.total-price').innerText = sumFunction();
};

const save = () => localStorage.setItem('cart', document.querySelector('ol').innerHTML);

function cartItemClickListener(event) {
  event.target.remove();
  save();
  printSum();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const toCart = async (id) => {
  const list = document.querySelector('.cart__items');
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const resolve = await response.json();
    const { id: sku, title: name, price: salePrice } = await resolve;
    const cartItem = await createCartItemElement({ sku, name, salePrice });
    list.appendChild(cartItem);
    save();
    printSum();
  } catch (error) {
    console.log(error);
  }
};

const endLoading = () => {
  document.querySelector('.load').remove();
};

const listItems = async (item) => {
  const items = document.querySelector('.items');
  try {
    await item.results.forEach((element) => {
      const { id, title, thumbnail } = element;
      const createItem = createProductItemElement({ sku: id, name: title, image: thumbnail });
      items.appendChild(createItem);
      createItem.lastChild.addEventListener('click', (event) => {
        const idTarget = getSkuFromProductItem(event.target.parentNode);
        toCart(idTarget);
      });
    });
    endLoading();
  } catch (error) {
    console.log(error);
  }
};

const request = async () => {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const resolve = await response.json();
    listItems(resolve);
  } catch (error) {
    console.log(error);
  }
};

const startingPage = () => {
  document.querySelector('ol').innerHTML = localStorage.getItem('cart');
  document.querySelectorAll('li')
  .forEach((element) => element.addEventListener('click', cartItemClickListener));
};

const clearCart = () => {
  const clear = document.querySelector('.empty-cart');
  clear.addEventListener('click', () => {
    document.querySelector('ol').innerHTML = '';
    localStorage.setItem('cart', '');
    printSum();
  });
};

window.onload = () => {
  request();
  startingPage();
  sumFunction();
  printSum();
  clearCart();
};
