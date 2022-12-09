const cart = [];
// fonction pour recuperer dans le cache
retrieveItemFromCache();

function retrieveItemFromCache() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""; // si item est null ne renvoi rien
    const itemObjet = JSON.parse(item);
    cart.push(itemObjet);
  }
  cart.forEach((item) => displayItem(item)); // affichage des elements
}
function displayItem(item) {
  const article = makeArticle(item);
  const imageDiv = makeImageDiv(item);
  article.appendChild(imageDiv);

  const cartItemContent = makecartContent(item);
  article.appendChild(cartItemContent);
  displayArticle(article);
  afficherPrixTotal(item);
  afficherQuantiteTotal(item);
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
  afficherPrixTotal();
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
  const itemAmettreAjour = cart.find((item) => item.id === id);
  itemAmettreAjour.quantity = Number(nouvelleValue);
  item.quantity = itemAmettreAjour.quantity;
  afficherPrixTotal();
  afficherQuantiteTotal();
  enregistreNewdataToCache(item);
}
function supprimeNewDataDansCach(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

function enregistreNewdataToCache(item) {
  const dataAenregistrer = JSON.stringify(item);
  const key = `${item.id}-${item.color}`; // permettre de mettre deux produits meme couleur
  localStorage.setItem(key, dataAenregistrer);
}

/**
 * partie FORMULAIRE
 */

const boutonComander = document.querySelector("#order");
boutonComander.addEventListener("click", (e) => soumettreFormulaire(e));

function soumettreFormulaire(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Selectionner un produit à acheter");
    return;
  }
  // verication de la validation du formulaire
  if (FomulaireInvalide()) return;
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
      console.log(orderId);
      window.location.href =
        "../html/confirmation.html" + "?orderId=" + orderId;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function emailInvalide() {
  const email = document.querySelector("#email").value;
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regex.test(email) === false) {
    alert("Entrez l'email valide s'il vous plait");
    return true;
  }
  return false;
}
function FomulaireInvalide() {
  const formulaire = document.querySelector(".cart__order__form");
  const inputs = formulaire.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("remplir tous les champs");
      return true;
    }
    return false;
  });
}
function makeRequestBody() {
  const formulaire = document.querySelector(".cart__order__form");
  const firstName = formulaire.elements.firstName.value;
  const lastName = formulaire.elements.lastName.value;
  const address = formulaire.elements.address.value;
  const city = formulaire.elements.city.value;
  const email = formulaire.elements.email.value;

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
  console.log(body);
  return body;
}
function getIdsFromCach() {
  const numbreDeProduits = localStorage.length;
  const ids = [];
  for (let i = 0; i < numbreDeProduits; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}
