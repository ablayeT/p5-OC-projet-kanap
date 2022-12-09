let apiProduct = "http://localhost:3000/api/products";

fetch(apiProduct)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for (product of data) {
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${product._id}">
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
    alert(err);
  });
