// ELEMENTS
const productsContainer = document.getElementById("productsContainer");

const searchInput = document.getElementById("searchInput");

const loader = document.getElementById("loader");

const errorMessage = document.getElementById("errorMessage");

const productModal = document.getElementById("productModal");

const modalBody = document.getElementById("modalBody");

const closeModal = document.getElementById("closeModal");



// ================= FETCH PRODUCTS =================
async function fetchProducts(searchText = "") {

  try {

    loader.classList.remove("hidden");

    errorMessage.textContent = "";

    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchText}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    renderProducts(data.products);

  }

  catch(error){

    errorMessage.textContent = error.message;

  }

  finally{

    loader.classList.add("hidden");

  }

}



// ================= FETCH SINGLE PRODUCT =================
async function fetchSingleProduct(productId){

  try{

    loader.classList.remove("hidden");

    const response = await fetch(
      `https://dummyjson.com/products/${productId}`
    );

    if(!response.ok){
      throw new Error("Failed to fetch product");
    }

    const product = await response.json();

    showProductModal(product);

  }

  catch(error){

    errorMessage.textContent = error.message;

  }

  finally{

    loader.classList.add("hidden");

  }

}



// ================= RENDER PRODUCTS =================
function renderProducts(products){

  productsContainer.innerHTML = "";


  if(products.length === 0){

    productsContainer.innerHTML = `
      <h2>No Products Found</h2>
    `;

    return;
  }


  products.forEach((product)=>{

    // CREATE CARD
    const card = document.createElement("div");

    card.classList.add("card");


    // CARD CONTENT
    card.innerHTML = `

      <img src="${product.thumbnail}" alt="${product.title}">

      <div class="card-content">

        <h3>${product.title}</h3>

        <p>💲 Price: $${product.price}</p>

        <p>⭐ Rating: ${product.rating}</p>

        <p>📦 Stock: ${product.stock}</p>

      </div>

    `;


    // CLICK EVENT
    card.addEventListener("click", ()=>{

      fetchSingleProduct(product.id);

    });


    // APPEND CARD
    productsContainer.appendChild(card);

  });

}



// ================= SHOW MODAL =================
function showProductModal(product){

  modalBody.innerHTML = `

    <img src="${product.thumbnail}" alt="${product.title}">

    <h2>${product.title}</h2>

    <br>

    <p>${product.description}</p>

    <br>

    <p><strong>Category:</strong> ${product.category}</p>

    <p><strong>Brand:</strong> ${product.brand}</p>

    <p><strong>Price:</strong> $${product.price}</p>

    <p><strong>Discount:</strong> ${product.discountPercentage}%</p>

    <p><strong>Rating:</strong> ${product.rating}</p>

    <p><strong>Stock:</strong> ${product.stock}</p>

    <p><strong>Warranty:</strong> ${product.warrantyInformation}</p>

    <p><strong>Shipping:</strong> ${product.shippingInformation}</p>

    <p><strong>Return Policy:</strong> ${product.returnPolicy}</p>

  `;


  productModal.classList.remove("hidden");

}



// ================= CLOSE MODAL =================
closeModal.addEventListener("click", ()=>{

  productModal.classList.add("hidden");

});



// ================= CLOSE OUTSIDE =================
window.addEventListener("click",(e)=>{

  if(e.target === productModal){

    productModal.classList.add("hidden");

  }

});



// ================= SEARCH =================
searchInput.addEventListener("input",(e)=>{

  fetchProducts(e.target.value);

});



// ================= FIRST LOAD =================
fetchProducts();