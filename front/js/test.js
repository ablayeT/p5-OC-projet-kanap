/*const panier = [];
recupererDansCache();
panier.forEach((produit) => afficherLesproduits(produit));

function recupererDansCache() {
  const nombreDeProduit = localStorage.length;
  for (let i = 0; i <= nombreDeProduit; i++) {
    const produit = localStorage.getItem(localStorage.key(i));
    const objetProduit = JSON.parse(produit);
    panier.push(objetProduit);
  }
}

function afficherLesproduits(produit) {
  const article = creerArticle(produit);
  const imagDiv = creerDivImage(produit);
  article.appendChild(imagDiv);

  const cartItemContent = createItemContent(produit);
  article.appendChild(cartItemContent);
  afficherArticle(article);
  afficherQuantiteTotal();
  afficherPrixTotal(produit);
}
function afficherQuantiteTotal() {
  const quantiteTotal = document.querySelector("#totalQuantity");
  const total = panier.reduce((total, produit) => total + produit.quantity, 0);
  quantiteTotal.textContent = total;
}
function afficherPrixTotal(produit) {
  const PrixTotal = documment.querySelector("#totalPrice");
  const total = panier.reduce(
    (total, produit) => total + produit.price * produit.quantity,
    0
  );
  PrixTotal.textContent = total;
}

function createItemContent(produit) {
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");

  const description = creerdescription(produit);
  const settings = faireSetting();

  cartItemContent.appendChild(description);
  cartItemContent.appendChild(settings);
  return cartItemContent;
}

function faireSetting() {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  ajouterQuantiteAsettings(settings, produit);
  ajouterDeleteAsettings(settings);

  return settings;
}

function ajouterDeleteAsettings(settings) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  const p = document.createElement("p");
  p.textContent = "supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}
function ajouterQuantiteAsettings(settings) {
  const quantite = document.createElement("div");
  quantite.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté : ";
  quantite.appendChild(p);

  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = produit.quantity;
  quantite.appendChild(input);
  settings.appendChild(quantite);
}

function creerdescription(produit) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const h2 = document.createElement("h2");
  h2.textContent = produit.name;
  const p = document.createElement("p");
  p.textContent = produit.color;
  const p2 = document.createElement("p");
  p2.textContent = produit.price + " €";
  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);

  return description;
}
//fonction affichage des articles
function afficherArticle(article) {
  console.log(article);
  document.querySelector("#cart__items").appendChild(article);
}
// creat
function creerArticle(produit) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = produit.id;
  article.dataset.color = produit.color;
  return article;
}
function creerDivImage(produit) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");

  const image = document.createElement("img");
  image.src = produit.imageUrl;
  image.alt = produit.altTxt;
  div.appendChild(image);
  return div;
}**/

/**
 * test/// partie à reserver
 */

/*const cart = [];
console.log(cart);
recupererDansCache();

function recupererDansCache() {
  const nombreProduit = localStorage.length;
  for (let i = 0; i < nombreProduit; i++) {
    const produit = localStorage.getItem(localStorage.key(1));
    const objetProduit = JSON.parse(produit);
    cart.push(objetProduit);
  }
}

function afficherLesproduits(produit) {
  const image = makeImage(produit);
}
function makeArticle() {
  const article = documetn.createElement("article");
  article.classlist.add("cart__item");
  article.dataSet.id = produit.id;
  article.dataSet.color = produit.color;
  return article;
}

function makeImage(produit) {
  const image = document.createElement("img");
  image.src = produit.imageUrl;
  image.alt = produit.altTxt;
  return image;
}
*/
// JSON.stringify === retourne une chaine de caractère
// JSON.parse === retourne un objet
