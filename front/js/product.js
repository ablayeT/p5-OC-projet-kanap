var url = new URL(window.location.href);
var id = url.searchParams.get("id");
if (id != null) {
  let itemPrix = 0;
  let imgeUrl, alttext, nomArtcle;
}
let newPrice;

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => manipulerDonnees(res));

function manipulerDonnees(data) {
  const { altTxt, colors, description, imageUrl, name, price } = data;
  itemPrix = price;
  imgUrl = imageUrl;
  alttext = altTxt;
  nomArtcle = name;
  newPrice = itemPrix;
  faireImage(imageUrl, altTxt);
  faireNom(name);
  fairePrix(price);
  faireDescription(description);
  faireCouleurs(colors);
}

function faireImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.altTxt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}
function faireNom(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}

function fairePrix(price) {
  const span = document.querySelector("#price");
  if (span != null) {
    span.textContent = itemPrix;
  }
}

function faireDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}
function faireCouleurs(colors) {
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
//
function auClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  // si tout es ok : direction page panier
  if (commandeValide(color, quantity)) return;
  enregistreCommande(color, quantity);
  allerVertCart();
}
function allerVertCart() {
  window.location.href = "cart.html";
}

function enregistreCommande(color, quantity) {
  // la variable "clé" pour mettre deux elements de meme couleur
  const clé = `${id}-${color}`;
  const donnees = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: itemPrix,
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

// Option des couleurs

/*var url = new URL(window.location.href);
var newId = url.searchParams.get("id");
//recuêration des données et  ajout dans le HTML
fetch(`http://localhost:3000/api/products/${newId}`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    document.getElementById("title").textContent = data.name;
    document.getElementById("price").textContent = data.price;
    document.getElementById("description").textContent = data.description;
    let imageProduct = document.createElement("img");
    imageProduct.setAttribute("src", `${data.imageUrl}`);
    imageProduct.setAttribute("alt", `${data.altTxt}`);
    document.getElementsByClassName("item__img")[0].appendChild(imageProduct);
    let colorOptions = document.getElementById("colors");
    for (i in data.colors) {
      let newColor = document.createElement("option");
      newColor.setAttribute("data", data.colors[i]);
      newColor.textContent = data.colors[i];
      colorOptions.appendChild(newColor);
    }
  })
  .catch(function (err) {
    console.log(err);
  });

// Fonction alerte pour affirmer l'ajout au panier
function alertAjout() {
  if (confirm("Produit bien ajouter au panier.\nAller au panier ")) {
    window.location.href = "../html/cart.html";
  } else {
    window.location.href = "../html/index.html";
  }
}

// Ajouter le produit panier
function ajouterProduit() {
  // parametre actuel du produit
  let newProduct = {
    id: newId,
    color: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value,
  };
  // Alerte pour selectionner une couleur et une quantité
  if (
    newProduct.color == "" ||
    newProduct.quantity <= 0 ||
    newProduct.quantity > 100
  ) {
    alert("Séléctionner une couleur et une quantité");
    return;
  }
  console.log(localStorage.getItem("productCart"));
  if (localStorage.getItem("productCart")) {
    let productCart = JSON.parse(localStorage.getItem(newId));

    if (
      productCart === newProduct.id &&
      productCart.color === newProduct.color
    ) {
      productCart.quantity = newProduct.quantity;
      localStorage.setItem("productCart", JSON.stringify(productCart));
    }
  } else {
    localStorage.setItem("productCart", JSON.stringify(newProduct));
    window.location.href = "./cart.html";
  }

  // bouton add to cart
}
const ajouterBouton = document.getElementById("addToCart");
console.log(ajouterBouton);
ajouterBouton.addEventListener("click", () => {
  ajouterProduit();
});

const quantity = document.getElementById("quantity");
quantity.addEventListener("change", () => {
  let Newprice = document.getElementById("price");
});

/* GET ID OF THE PAGE'S PRODUCT
const params = new URLSearchParams(window.location.search);

const id = params.get('id');

const url = `http://localhost:3000/api/products/${id}`;


// NOW GET ITS DATAS BY FETCH REQUEST
getProductDatas = () => {
    fetch(url)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (datas) {
            console.log(datas);
            displayItemData(datas);
            addItemToCart(datas);

        }
        )
        .catch(function (err) {
            console.log("Erreur lors du chargement : " + err);
        })
};
getProductDatas();


// DISPLAY PRODUCT'S DATAS ON THE PAGE, INJECT TO HTML
displayItemData = (datas) => {
    document.querySelector(".item__img").innerHTML = `<img src="${datas.imageUrl}" alt="${datas.altTxt}" />`;
    document.querySelector('title').innerText = `${datas.name}`;
    document.querySelector("#title").innerText = `${datas.name}`;
    document.querySelector("#price").innerText = `${datas.price}`;
    document.querySelector("#description").innerText = `${datas.description}`;
    for (let i of datas.colors) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        document.querySelector("#colors").appendChild(option);
    }
}


const itemQty = document.querySelector("#quantity");

const itemColor = document.querySelector("#colors");

const addToCart_btn = document.querySelector("#addToCart");


// CREATE CUSTOMER'S BASKET
addItemToCart = (datas) => {

    addToCart_btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (itemQty.value <= 0 || itemQty.value > 100 || itemColor.value == "") {
            alert("Veuillez saisir une quantité correcte et la couleur");
        }

        else {
            let qty = itemQty.value;
            let colour = itemColor.value;

            let selectedItem = {
                id: id,
                img: datas.imageUrl,
                alt: datas.altTxt,
                description: datas.description,
                name: datas.name,
                quantity: Number(qty),
                color: colour
            };

            let basket = JSON.parse(localStorage.getItem("localBasket"));

            // ADD SELECTED PRODUCT TO BASKET
            addToBasket = () => localStorage.setItem("localBasket", JSON.stringify(basket));

            // WANT TO ACCESS THE BASKET ?
            accessToCart = () => {
                if (confirm("Commande enregistrée, accéder au panier ?") == true) {
                    window.location.href = "../html/cart.html";
                }
            }

            // CREATE OR MODIFY BASKET
            if (basket) {

                let sameItem = basket.find((elt) => elt.id === id && elt.color === colour);

                if (sameItem) {

                    let addQuantity = parseInt(selectedItem.quantity) + parseInt(sameItem.quantity);
                    sameItem.quantity = addQuantity;

                    addToBasket();
                    accessToCart();
                }
                else {
                    basket.push(selectedItem);

                    addToBasket();
                    accessToCart();

                }

            } else {
                basket = [];
                basket.push(selectedItem);

                addToBasket();
                accessToCart();
            }
        }
    });
}
*/

/*let params = new URL(document.location).searchParams;
let id = params.get('id');

let url = 'http://localhost:3000/api/products/' + id;
const numberSelect = document.getElementById('quantity');
const itemImg = document.querySelector('.item__img');
const itemTitle = document.getElementById('title');
const itemPrice = document.getElementById('price');
const itemDesc = document.getElementById('description');
const valueInput = document.getElementById('quantity');
const valueSelect = document.getElementById('colors');

// Récupération des donnés back-end pour les articles
const fetchProduct = async() => {
   product = await fetch(url)
      .then(response => response.json())
      .then((resultatAPI) => {
         article = resultatAPI;
         let min = 0, max = article.colors.length, select = document.getElementById('colors');
         // Placer les élèments si le fetch arrive à trouver les informations back-end
         itemImg.innerHTML = `<img src='${article.imageUrl}' alt='Photographie d'un canapé'></img>`;
         itemTitle.innerHTML = article.name;
         itemPrice.innerHTML = article.price;
         itemDesc.innerHTML = article.description;
         document.title = 'Kanap - ' + article.name;
         // Boucle pour afficher les options de couleurs dans le menu déroulant
         for (var i = min; i < max; i++) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = article.colors[i];
            select.appendChild(opt);
         }
      })
      .catch(function(error) {
         console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      });
}

// Ajout au panier avec le localStorage
function addPanier () {
   const addButton = document.querySelector('#addToCart');
   addButton.addEventListener('click', () => {
      if (valueInput.value > 0 && valueInput.value <= 100 && valueSelect.value != '') {
         // Création des valeurs localStorage
         let productAdded = {
            name: itemTitle.innerHTML + ' ' + valueSelect.options[valueSelect.selectedIndex].innerHTML,
            color: valueSelect.options[valueSelect.selectedIndex].innerHTML,
            price: parseFloat(itemPrice.innerHTML),
            quantity: parseFloat(valueInput.value),
            img: article.imageUrl,
            _id: id,
         };
         let listProduct = [];
         if (localStorage.getItem('products') !== null) {
            listProduct = JSON.parse(localStorage.getItem('products'));
         } 
         let match = listProduct.find((item) => {
            return item['_id'] === id;
         });
         let matchColors = listProduct.find((item) => {
            return item['color'] === valueSelect.options[valueSelect.selectedIndex].innerHTML;
         });
         // Si doublons, ajouter la valeur à l'id et couleur déjà existante
         if (match && matchColors) {
            matchColors['quantity'] += parseFloat(valueInput.value);
         } else {
            listProduct.push(productAdded);
         } 
         // Création du localStorage product (une seule valeur pour tous les produits)
         localStorage.setItem('products', JSON.stringify(listProduct));
         alert('Les articles ont bien été ajoutés');
         document.location = 'cart.html';
      } else {
         alert('Merci de remplir toutes les informations demandées avant de continuer');
         setTimeout('location.reload(true);', 400);
      }
   });
}

fetchProduct();
addPanier();
*/

/*
// configurer buton poour envoyer au panier 
 function ajouterpanier(data){
     const buttonEnvoyer = document.querySelector("#addToCart");

     buttonEnvoyer.addEventListener("click", (Event) =>{
         if (quantity.data > 0 && quantity.data <= 100 && quantity.data != 0) {
             let 
         }
     })
 }*/
/*function ecoutEvent(){
    const gardeProduct = document.getElementById("addToCart");
    gardeProduct.addEventListener("click", function (){
       let id = newId;
       let gardeColor = document.getElementById("colors").data;
       let gardeQuantity = parseInt(document.getElementById("quantity").value);
       const data = {
           id: newId,
           color: gardeColor,
           quantity:  gardeQuantity,
       }
       if(gardeColor){

           if(window.confirm("voulez-vous ajouter ce produit au panier?")) {
               panier.ajouterAuPagner(data);
           }
        } else{
               return window.alert("vous n'avez selectoner aucune couleur")
           }

    });
}
ecoutEvent()*/

/*
const link = window.location.search;
const param = new URLSearchParams(link).get("id");
const objetUrl = `http://localhost:3000/api/products/${param}`;

// =================== GET ITEM FROM API ====================
function getItemData(url) {
    return fetch(url)
        .then(function (rep) {
            return rep.json();
        });
}

// =================== CREATION OF COLOR SELECTOR INPUT ====================
function setColorsOptionsIputs(colorArray) {
    for (i in colorArray) {
        const option = document.createElement('option');
        option.setAttribute("value", colorArray[i]);
        option.textContent = `${colorArray[i]}`;
        document.getElementById('colors').appendChild(option);
    }
}

// =================== CHECK OF LOCAL STORAGE AND ADD ITEM OPTION ====================
function addItem(itemOjet) {
    const button = document.getElementById('addToCart');
    button.addEventListener('click', () => {

        if (document.getElementById('colors').value == '') {
            alert("Couleur obligatoir")
        }

        else if (
            document.getElementById('quantity').value <= 0 ||
            document.getElementById('quantity').value > 100) {
            alert("Quantité incorrecte (doit être supérieur à 0)")
        }

        else {
            let item = {
                id: `${itemOjet._id}`,
                itemColor: `${document.getElementById('colors').value}`,
                quant: `${document.getElementById('quantity').value}`
            }
            let saveOption = JSON.parse(localStorage.getItem('option'));
            if (saveOption) {
                saveOption.find(curent => (
                    curent.id == item.id) && (curent.itemColor == item.itemColor)) ?
                    saveOption.forEach((curent) => {
                        if (curent.id == item.id) { curent.quant = parseInt(item.quant) + parseInt(curent.quant) }
                    }) :
                    saveOption.push(item);
                localStorage.setItem('option', JSON.stringify(saveOption));
                alert('article ajouté');
            }
            else {
                saveOption = [];
                saveOption.push(item);
                localStorage.setItem('option', JSON.stringify(saveOption));
                alert('article ajouté');
            }
        }


    })
}

// =================== DISPLAY ITEM DETAILS ====================
function displayItem() {
    getItemData(objetUrl)
        .then(function (itemObjet) {
            document.querySelector('.item__img').innerHTML = `<img src=${itemObjet.imageUrl} alt=${itemObjet.altTxt}>`;
            document.getElementById('title').innerHTML = `${itemObjet.name}`;
            document.getElementById('price').innerHTML = `${itemObjet.price}`;
            document.getElementById('description').textContent = `${itemObjet.description}`;
            setColorsOptionsIputs(itemObjet.colors);
            addItem(itemObjet);
        });
}
displayItem();
*/
