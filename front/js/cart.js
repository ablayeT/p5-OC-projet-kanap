const cart = [];
// fonction pour recuperer dans le cache
retrieveItemFromCache();

cart.forEach((item) => displayItem(item)); // affichage des elements
function retrieveItemFromCache() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""; // si item est null ne renvoi rien
    const itemObjet = JSON.parse(item);
    cart.push(itemObjet);
  }
}
function displayItem(item) {
  const article = makeArticle(item);
  const imageDiv = makeImageDiv(item);
  article.appendChild(imageDiv);

  const cartItemContent = makecartContent(imageDiv, item);
  article.appendChild(cartItemContent);
  displayArticle(article);
  afficherPrixTotal();
  afficherQuantiteTotal();
}
/** debut de displaye item */
function afficherQuantiteTotal() {
  let total = 0;
  const quantiteTotal = document.querySelector("#totalQuantity");
  cart.forEach((item) => {
    const quantiteUnitaire = item.quantity * item.quantity;
    total += quantiteUnitaire;
  });
  quantiteTotal.textContent = total;
}
function afficherPrixTotal(item) {
  //  calcul du prix total dans le panier
  let total = 0;
  const prixTotal = document.querySelector("#totalPrice");
  cart.forEach((item) => {
    const prixUnitaire = item.price * item.quantity;
    total += prixUnitaire;
  });
  prixTotal.textContent = total;
}
// function displaye article pour mettre article dan la page
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}
function makeArticle(item) {
  const article = document.createElement("article");

  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.id;
  return article;
}

function makeImageDiv(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  div.appendChild(image);
  return div;
}

function makecartContent(item) {
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");

  const description = makeDescription(item);
  const settings = makeSettings(item);
  cartItemContent.appendChild(description);
  cartItemContent.appendChild(settings);
  return cartItemContent;
}
function makeDescription(item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  p.textContent = item.color;
  const p2 = document.createElement("p");
  p2.textContent = item.price = " €";
  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  return description;
}
function makeSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  addQuantityToSettings(settings, item);
  addDeleteToSettings(settings, item);
  return settings;
}
function addDeleteToSettings(settings, item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => supprimerItem(item));
  const p = document.createElement("p");
  p.textContent = "supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}
//fonction pour supprimer un produit ajouté
function supprimerItem(item) {
  const produitAsupprimer = cart.findIndex(
    (produit) => produit.id === item.id && produit.color === item.color
  );
  //methode 'splice()' pour supprimer un produit du panier
  cart.splice(produitAsupprimer, 1);
  afficherPrixTotal();
  afficherQuantiteTotal();
  supprimeNewDataDansCach(item);
  supprimeArticledanPage(item);
}
function supprimeArticledanPage(item) {
  const articleAsupprimer = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté : ";
  quantity.appendChild(p);
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity ";
  input.min = "1";
  input.max = "100";
  input.Value = item.quantity;
  input.addEventListener("input", () =>
    miseAjourPrixQuantity(input.value, item)
  );

  quantity.appendChild(input);
  settings.appendChild(quantity);
}
function miseAjourPrixQuantity(id, nouvelleValue, item) {
  const itemAmettreAjour = cart.find((item) => item.id === id);
  itemAmettreAjour.quantity = Number(nouvelleValue);
  item.quantity = item.itemAmettreAjour;
  afficherPrixTotal();
  afficherQuantiteTotal();
  enregistreNewdataToCache(item);
}
function supprimeNewDataDansCach(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

function enregistreNewdataToCache() {
  const dataToCash = JSON.stringify(item);
  const key = `${item.id}-${item.color}`; // permettre de mettre deuw produits meme couleur
  localStorage.setItem(item.id, dataToCash);
}
