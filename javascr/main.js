const switchButton = document.getElementById('switch');
const productContainer = document.getElementById('productContainer');
const cartContainer = document.getElementById('cartContainer');
const cartItemCount = document.getElementById('cartItemCount');
const cartTotalPrice = document.getElementById('cartTotalPrice');

let cartItems = [];

const products = [
{
id: "producto1",
nombre: "Laptop LG",
precio: 1500,
categoria: "PC",
numero: 1,
imagen: "./assets/lglaptop.jpg"
},
{
id: "producto2",
nombre: "Laptop Lenovo",
precio: 1200,
categoria: "PC",
numero: 2,
imagen: "./assets/laptop_lenovo.webp"
},
{
id: "producto3",
nombre: "Mouse Logitech",
precio: 500,
categoria: "Perífericos",
numero: 3,
imagen: "./assets/mouse_logitech.png"
}
];

products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('img');
    image.src = product.imagen;
    card.appendChild(image);

    const title = document.createElement('h4');
    title.textContent = product.nombre;
    card.appendChild(title);

    const category = document.createElement('h5');
    category.textContent = product.categoria;
    card.appendChild(category);

    const price = document.createElement('p');
    price.textContent = '$' + product.precio;
    card.appendChild(price);

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    button.addEventListener('click', () => {
    addToCart(product);
    });
    card.appendChild(button);

    productContainer.appendChild(card);
    });

function addToCart(product) {
    const existingCartItem = cartItems.find(item => item.id === product.id);
    if (existingCartItem) {
    existingCartItem.cantidad += 1;
    } else {
    cartItems.push({
    id: product.id,
    nombre: product.nombre,
    precio: product.precio,
    cantidad: 1
    });
    }

updateCart();
saveCart();
}

function updateCart() {

cartContainer.innerHTML = '';

cartItems.forEach(item => {
const cartItem = document.createElement('div');
cartItem.className = 'cart-item';

const name = document.createElement('h4');
name.textContent = item.nombre;
cartItem.appendChild(name);

const price = document.createElement('p');
price.textContent = '$' + item.precio;
cartItem.appendChild(price);

const quantity = document.createElement('p');
quantity.textContent = 'Cantidad: ' + item.cantidad;
cartItem.appendChild(quantity);

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearCart);

cartContainer.appendChild(cartItem);
});

updateCartItemCount();

updateCartTotalPrice();
}

function updateCartItemCount() {

const itemCount = cartItems.reduce((total, item) => total + item.cantidad, 0);

cartItemCount.textContent = itemCount;
}

function updateCartTotalPrice() {
    const totalPrice = cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    cartTotalPrice.textContent = '$' + totalPrice;
    }

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    }
function loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
    cartItems = JSON.parse(cart);
    updateCart();
    }
}

function clearCart() {
    cartItems = [];
    updateCart();
    saveCart();
  }
  
function removeFromCart(item) {
    cartItems = cartItems.filter(cartItem => cartItem !== item);
    updateCart();
    saveCart();
  }
  
function updateCart() {
    cartContainer.innerHTML = '';
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
  
      const name = document.createElement('h4');
      name.textContent = item.nombre;
      cartItem.appendChild(name);
  
      const price = document.createElement('p');
      price.textContent = '$' + item.precio;
      cartItem.appendChild(price);
  
      const quantity = document.createElement('p');
      quantity.textContent = 'Cantidad: ' + item.cantidad;
      cartItem.appendChild(quantity);
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Eliminar';
      removeButton.addEventListener('click', () => {
        removeFromCart(item);
      });
      cartItem.appendChild(removeButton);
  
      cartContainer.appendChild(cartItem);
    });
    cartItemCount.textContent = cartItems.length;
    
    const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);
    cartTotalPrice.textContent = '$' + totalPrice;
}

function updateCart() {
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
  
      const name = document.createElement('h4');
      name.textContent = item.nombre;
      cartItem.appendChild(name);
  
      const price = document.createElement('p');
      price.textContent = '$' + item.precio;
      cartItem.appendChild(price);
  
      const quantity = document.createElement('p');
      quantity.textContent = 'Cantidad: ' + item.cantidad;
      cartItem.appendChild(quantity);
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Eliminar';
      removeButton.addEventListener('click', () => {
        removeFromCart(item);
      });
      cartItem.appendChild(removeButton);
  
      cartContainer.appendChild(cartItem);
    });

    cartItemCount.textContent = cartItems.reduce((total, item) => total + item.cantidad, 0);

    const totalPrice = cartItems.reduce((total, item) => total + (item.cantidad * item.precio), 0);
    cartTotalPrice.textContent = '$' + totalPrice.toFixed(2);
  }

function removeFromCart(product) {
    const existingCartItem = cartItems.find(item => item.id === product.id);
  
    if (existingCartItem.cantidad > 1) {
      existingCartItem.cantidad--;
    } else {
      cartItems = cartItems.filter(item => item.id !== product.id);
    }
    updateCart();
    saveCart();
  }

loadCart();