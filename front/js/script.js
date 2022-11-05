let apiProduct = "http://localhost:3000/api/products";

fetch(apiProduct)
.then((res) => {
    return res.json();
})
.then((data) => {
    for (product of data){
        document.getElementById("items").innerHTML +=`<a href="./product.html?id=${product._id}">
              <article>
               <img
                src="${product.imageUrl}"
                     alt="${product.altTxt}"/>
                 <h3 class="productName">${product.name}</h3>
                 <p class="productDescription">${product.description}</p>
             </article>
         </a>`;

    }
    
})
.catch((err) => {
    alert(err)

});


/*

let buttons = document.querySelectorAll(".item__content__addButton");
console.log(buttons);

buttons.forEach((button) =>
 button.addEventListener("click", () =>{
    console.log(button);

    window.location = `product.html?${button.id}`; 
 }),
  );*/








 









/*let productData = []; 
const fetchProduct = async () => {
    await fetch("http://localhost:3000/api/products")
    .then ((response) => response.json())
    .then((data) => {
        productData = data;
        console.log(productData);
    });
};
 const displayProduct = async () => {
    await fetchProduct();
    for (product of productData){
        console.log(product);

    document.getElementById("items").innerHTML = productData.map((product) =>`<a href="./product.html?id=${product._id}">
              <article>
               <img
                     src="${product.imageUrl}"
                     alt="${product.altTxt}"/>
                 <h3 class="productName"> ${product.name}</h3>
                 <p class="productDescription"> ${product.description}</p>
             </article>
         </a>`,
};
 };
fetchProduct();*/




























/*fetch("http://localhost:3000/api/products")
.then(data => data.json())
.then(listProduitJson => {
    for (let listProduit of listProduitJson){
        let products = new products(listProduit);
        document.querySelector(".items").innerHTML += `<a href="./product.html?id=${products._class}">
            <article>
              <img src="${products.imageUrl}" alt="${products.altTxt}"/>
              <h3 class="productName">${products.name}</h3>
              <p class="productDescription">${products.description}</p>
            </article>
          </a> `
    }
});
 */





























/*let  produitContainer= document.getElementById("items")


const displayProduits = (produits) =>{
   for (let produit of produits){
        let urlElement = document.createElement('a')
        let articleElement = document.createElement('article')
        let imageElement = document.createElement('img')
        let nameELement = document.createElement('h3')
        let elementDescription = document.createElement('p')
        
        console.log(elementDescription)dk

        produitContainer.appendChild(urlElement)
        urlElement.appendChild(articleElement)
        articleElement.appendChild(imageElement)
        articleElement.appendChild(nameELement)
        articleElement.appendChild(elementDescription)

        urlElement.setAttribute('alt', produit.altTxt)
        imageElement.src = produit.imageUrl
        nameELement.textContent = produit.name
        elementDescription.textContent = produit.description
        urlElement.href = "../html/product.html?produitId=" + produit._id
        
    }
}

const afficherLesProduits = async () => {
    await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => displayProduits(data))
    .catch(err => console.log(err))
}

afficherLesProduits()*/































































/*fetch(" http://localhost:3000/api/products")
.then(data => data.json())
.then(listProduitJson => {
    for(let jsonProduit of listProduitJson ){
    document.querySelector(".items").innerHTML += `<a href="./product.html?id=${jsonProduit._id}">
                                                           <article>
                                                             <img src="${jsonProduit.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                                                             <h3 class="productName">${jsonProduit.name}</h3>
                                                             <p class="productDescription">${jsonProduit.description}</p>
                                                           </article>
                                                        </a> `
    }
});
*/




/*

let 
 
fetch(" http://localhost:3000/api/products")
.then(data => data.json())
.then(jsonListProducts => {
    for (let jsonProduct of jsonListProducts){
        let products = new products(jsonProduct)
        document.querySelector(".items").innerHTML += `<a href="../html/product.html?id=${jsonProduct._id}">
            <article> 
            <img src="${jsonProduct.imageURL}" alt="Lorem ipsum dolor sit amet, Kanap name1">
             <h3 class="productName">${jsonProduct.name}</h3>
              <p class="productDescription">${jsonProduct.description}</p>
             </article>
                </a>` 
    }
})
*/






























































































