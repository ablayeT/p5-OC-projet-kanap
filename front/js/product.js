var url = new URL(window.location.href);
var id = url.searchParams.get("id");
if (id != null) {
  let itemPrix = 0;
  let imgeUrl, alttext, nomArtcle;
}
let newPrice;

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => useData(res));

function useData(data) {
  const { altTxt, colors, description, imageUrl, name, price } = data;
  itemPrix = price;
  imgUrl = imageUrl;
  alttext = altTxt;
  nomArtcle = name;
  newPrice = itemPrix;
  makeImage(imageUrl, altTxt);
  makeName(name);
  fairePrix(price);
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

function fairePrix(price) {
  const span = document.querySelector("#price");
  if (span != null) {
    span.textContent = itemPrix;
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
// sur le click on va recuperer la funtion "auClick"
button.addEventListener("click", auClick);
function auClick(price) {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  // si tout es ok : direction page panier
  if (commandeValide(color, quantity)) return;
  saveCommand(color, quantity);
  allerVertCart();
}
function allerVertCart() {
  window.location.href = "cart.html";
}

function saveCommand(color, quantity) {
  // la variable "clé" pour mettre deux elements de meme couleur dans le panier
  const clé = `${id}-${color}`;
  const donnees = {
    id: id,
    color: color,
    quantity: Number(quantity),
    imageUrl: imgUrl,
    altTxt: alttext,
    name: nomArtcle,
  };
  localStorage.setItem(clé, JSON.stringify(donnees));
}
//function qui verifier si la couleur et la quantité sont bien valide
function commandeValide(color, quantity) {
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
