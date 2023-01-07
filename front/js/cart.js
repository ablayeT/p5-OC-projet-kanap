const cart = [];
let totalPrice = 0;
// fonction pour recuperer dans le cache
retrieveProductFromCache();

function retrieveProductFromCache() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""; // si item est null ne renvoi rien
    const itemObjet = JSON.parse(item);

    cart.push(itemObjet);
  }
  totalPrice = 0;
  cart.forEach((item) => displayProduct(item)); // affichage des elements
}
function displayProduct(item) {
  const article = makeArticle(item);
  const imageDiv = makeImageDiv(item);
  article.appendChild(imageDiv);

  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((response) => response.json())
    .then((res) => calculatePrice(res, item, article));

  afficherQuantiteTotal(item);
}
function calculatePrice(res, item, article) {
  const newPrice = res.price * item.quantity;
  afficherPrixTotal(res.price, item.quantity);
  item.price = newPrice;

  const cartItemContent = makecartContent(item);
  article.appendChild(cartItemContent);
  displayArticle(article);
}
/** debut de displaye item */
function afficherQuantiteTotal(item) {
  let total = 0;
  const quantiteTotal = document.querySelector("#totalQuantity");
  cart.forEach((item) => {
    const quantiteUnitaire = item.quantity;
    total += quantiteUnitaire;
  });
  quantiteTotal.textContent = total;
}
function afficherPrixTotal(price, quantity) {
  //  calcul du prix total dans le panier

  const prixTotal = document.querySelector("#totalPrice");

  const prixUnitaire = price * quantity;
  totalPrice += prixUnitaire;

  prixTotal.textContent = totalPrice;
}
function afficherTotalPriceOnInputChanges(oldPrice, newPrice) {
  //  calcul du prix total dans le panier

  const prixTotal = document.querySelector("#totalPrice");

  totalPrice = totalPrice - oldPrice + newPrice;

  prixTotal.textContent = totalPrice;
}

function displayPrice(newPrice, id) {
  const product = document.querySelector("#" + id);

  product.textContent = newPrice + " €";
}
// function displaye article pour mettre article dan la page
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

function makeArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
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
  p2.id = item.color.replaceAll("/", "") + item.id;
  p2.textContent = item.price + " €";
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
  // demarre par itemA supprimer puis on eleve 1
  cart.splice(produitAsupprimer, 1);
  afficherPrixTotal(0, 0);
  afficherQuantiteTotal();
  supprimeNewDataDansCach(item);
  supprimeArticledanPage(item);
}
function supprimeArticledanPage(item) {
  const articleAsupprimer = document.querySelectorAll(
    `article[data-id="${item.id}"]`
  );
  for (let i = 0; i < articleAsupprimer.length; i++) {
    if (articleAsupprimer[i].dataset.color === item.color) {
      articleAsupprimer[i].remove();
    }
  }
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
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  (input.value = item.quantity),
    input.addEventListener("input", () =>
      miseAjourPrixQuantity(item.id, input.value, item)
    );

  quantity.appendChild(input);
  settings.appendChild(quantity);
}
function miseAjourPrixQuantity(id, nouvelleValue, item) {
  //la fonction find() pour
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((response) => response.json())
    .then((res) => {
      let oldPrice = res.price * item.quantity;
      const itemAmettreAjour = cart.find(
        (produit) => produit.id === item.id && produit.color === item.color
      );
      itemAmettreAjour.quantity = Number(nouvelleValue);
      item.quantity = itemAmettreAjour.quantity;
      let newPrice = item.quantity * res.price;
      afficherTotalPriceOnInputChanges(oldPrice, newPrice);
      displayPrice(
        res.price * item.quantity,
        item.color.replaceAll("/", "") + item.id
      );
      afficherQuantiteTotal(item);
      item.price = 0;
      saveNewDataInCache(item);
    });
}
function supprimeNewDataDansCach(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

function saveNewDataInCache(item) {
  const dataAenregistrer = JSON.stringify(item);
  const key = `${item.id}-${item.color}`; // permettre de mettre deux produits meme couleur
  localStorage.setItem(key, dataAenregistrer);
}

/**
 * partie form
 */

const boutonComander = document.querySelector("#order");
boutonComander.addEventListener("click", (e) => formData(e));

function formData(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Selectionner un produit à acheter");
    return;
  }
  // verication de la validation du form
  if (formInvalid()) return;
  //------
  // validation de l'email
  if (emailInvalide()) return;
  const body = makeRequestBody();

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href =
        "../html/confirmation.html" + "?orderId=" + orderId;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function emailInvalide() {
  const email = document.getElementById("email").value;
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regex.test(email) === false) {
    alert("Entrez l'email valide s'il vous plait");
    return true;
  }
  return false;
}
function formInvalid() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const adress = document.getElementById("address");
  const city = document.getElementById("city");

  const regex = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;
  //verifier si le prenom est correcte
  if (regex.test(firstName.value) === false) {
    alert("Veuillez saisir un prénom correcte");
    return true;
  }
  // verifier si le nom est correcte
  if (regex.test(lastName.value) === false) {
    alert("Veuillez saisir un nom correcte");
    return true;
  }
  //verifier si la ville correcte
  const regexCity = /^[a-zA-Z]+[a-zA-Z0-9]+\s*$/;
  if (regexCity.test(city.value) === false) {
    alert("Veuillez reseigne correctement la ville");
    return true;
  }
  //verifier si l'adress est correcte
  const regexPostalAdress = /^[a-zA-Z0-9\s,'-]*$/;
  if (regexPostalAdress.test(adress.value) === false) {
    alert("Veuillez entrer une adresse postale valid");
    return true;
  }

  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez remplir tous les champs");
      return true;
    }
    return false;
  });
  return false;
}

function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromCach(),
  };

  return body;
}
function getIdsFromCach() {
  const numberOfProduct = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberOfProduct; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}
