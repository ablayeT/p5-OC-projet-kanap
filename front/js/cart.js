

























































/*// recuperation des cartes dans le localStorage
function getPanier() {
    let items = [];
    if (localStorage.getItem("panier") != null) {
      items = JSON.parse(localStorage.getItem("panier"));
    }
    return items;
  }
  
  // add2cart function adds the selected kanap to the localStorage, depending on if it's already here or not in the localStorage
  function add2Cart(productId, color, qty) {
    if (qty <= 0 || color == "") {
      return;
    }
    let items = getPanier();
    if (items.length == 0) {
      items = [[productId, color, qty]];
    } else {
      let found = false;
      for (let i = 0; i < items.length; i++) {
        if (productId === items[i][0] && color === items[i][1]) {
          found = true;
          items[i][2] += qty;
        }
      }
      if (found == false) {
        let item = [productId, color, qty];
        items.push(item);
      }
    }
    localStorage.setItem("panier", JSON.stringify(items));
  }
  
  // function deleItem deletes a selected entry from the localStorage
  function deleteItem(id, color) {
    let items = getPanier();
    for (i = 0; i < items.length; i++) {
      if (id === items[i][0] && color === items[i][1]) {
        items.splice(i, 1);
        localStorage.setItem("panier", JSON.stringify(items));
        window.location.reload();
      }
    }
  }
  // function changeQuantity makes the localStorage quantity reflect whats the user chooses on the HTML page
  function changeQuantity(id, color, qty) {
    let items = getPanier();
    for (let i = 0; i < items.length; i++) {
      if (id === items[i][0] && color === items[i][1]) {
        items[i][2] = qty;
      }
      localStorage.setItem("panier", JSON.stringify(items));
      window.location.reload();
    }
  }
  
  ////////////////////////////////////////////////////////////////
  // Form elements & POST request ////////////////////
  ////////////////////////////////////////////////////////////////
  
  //// REGEXs
  // no regex for addresses, "required" attribute speaks for himself
  // variables values for the form :
  const prenom = document.getElementById("firstName");
  const nom = document.getElementById("lastName");
  const ville = document.getElementById("city");
  const adresse = document.getElementById("address");
  const mail = document.getElementById("email");
  
  // email
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  function validateEmail(mail) {
    const regexMail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexMail.test(mail) == false) {
      return false;
    } else {
      emailErrorMsg.innerHTML = null;
      return true;
    }
  }
  // simple RegEx for names : accepted characters by RegEx
  
  const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
  
  // first name
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  function validateFirstName(prenom) {
    if (regexName.test(prenom) == false) {
      return false;
    } else {
      firstNameErrorMsg.innerHTML = null;
      return true;
    }
  }
  
  // last name
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  function validateLastName(nom) {
    if (regexName.test(nom) == false) {
      return false;
    } else {
      lastNameErrorMsg.innerHTML = null;
      return true;
    }
  }
  
  // city
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  function validateCity(ville) {
    if (regexName.test(ville) == false) {
      return false;
    } else {
      cityErrorMsg.innerHTML = null;
      return true;
    }
  }
  
  //////////// POST request
  // generation of the JSON to post
  // extracted from backend :
  /**
   *
   * Expects request to contain:
   * contact: {
   *   firstName: string,
   *   lastName: string,
   *   address: string,
   *   city: string,
   *   email: string
   * }
   * products: [string] <-- array of product _id
   *
   */
  // fonction getForm() qui genere le"contact" du formulaire
  /*
  function makeJsonData() {
    let contact = {
      firstName: prenom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: mail.value,
    };
    let items = getPanier();
    let products = [];
  
    for (i = 0; i < items.length; i++) {
      if (products.find((e) => e == items[i][0])) {
        console.log("not found");
      } else {
        products.push(items[i][0]);
      }
    }
    let jsonData = JSON.stringify({ contact, products });
    return jsonData;
  }*/