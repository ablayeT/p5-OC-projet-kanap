var url = new URL(window.location.href);
var id = url.searchParams.get("id");
if (id != null) {
  let itemPrice = 0;
  let imgeUrl, alttext, articleName;
}
let newPrice;

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => useData(res));

function useData(data) {
  const { altTxt, colors, description, imageUrl, name, price } = data;
  itemPrice = price;
  imgUrl = imageUrl;
  alttext = altTxt;
  articleName = name;
  newPrice = itemPrice;
  makeImage(imageUrl, altTxt);
  makeName(name);
  makePrice(price);
  makeDescription(description);
  makeColor(colors);
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.altTxt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}
function makeName(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}

function makePrice(price) {
  const span = document.querySelector("#price");
  if (span != null) {
    span.textContent = itemPrice;
  }
}

function makeDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}
function makeColor(colors) {
  const select = document.querySelector("#colors");

  if (colors != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}

const button = document.querySelector("#addToCart");
// sur le click on va recuperer la funtion "ifClick"
button.addEventListener("click", ifClick);
function ifClick(price) {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  // si tout es ok : direction page panier
  if (commandeValid(color, quantity)) return;
  saveCommand(color, quantity);
  goToCart();
}
function goToCart() {
  window.location.href = "cart.html";
}

function saveCommand(color, quantity) {
  // la variable "clé" pour mettre deux elements de meme couleur dans le panier
  const cle = `${id}-${color}`;
  // Si un produit ayant l'id cle existe dans le localstorage alors incrémente le produit
  const found = localStorage.getItem(cle);
  let donnees = {};
  if (found) {
    donnees = JSON.parse(found);
    donnees.quantity += Number(quantity);
  } else {
    donnees = {
      id: id,
      color: color,
      quantity: Number(quantity),
      imageUrl: imgUrl,
      altTxt: alttext,
      name: articleName,
    };
  }

  localStorage.setItem(cle, JSON.stringify(donnees));
}
//function qui verifier si la couleur et la quantité sont bien valide
function commandeValid(color, quantity) {
  if (
    color == null ||
    color === "" ||
    quantity == null ||
    (quantity == 0 && quantity < 100)
  ) {
    alert("choisissez une couleur et une quantité");
    return true;
  }
}

const quantity = document.getElementById("quantity");
quantity.addEventListener("change", () => {
  document.getElementById("price").innerHTML = newPrice * quantity.value;
});
