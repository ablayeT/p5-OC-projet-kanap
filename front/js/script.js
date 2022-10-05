




let  produitContainer= document.getElementById("#items")


const displayProducts = (produits) =>{
    for (let produit of produits){
        let urlElement = document.createElement('a')
        let articleElement = document.createElement('article')
        let imageElement = document.createElement('img')
        let nameELement = document.createElement('h3')
        let elementDescription = document.createElement('p')


      produitContainer.appendChild(urlElement)
        urlElement.appendchil(articleElement)
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
    await fetch(" http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => displayProducts(data))
    .catch(err => console.log(err))
}

afficherLesProduits()




























