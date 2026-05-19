// عناصر الصفحة
const productsContainer = document.getElementById("productsContainer");

const searchInput = document.getElementById("searchInput");

const loader = document.getElementById("loader");

const errorMessage = document.getElementById("errorMessage");



// ================= FETCH PRODUCTS =================
async function fetchProducts(searchText = "") {

  try {

    // إظهار loader
    loader.classList.remove("hidden");

    // مسح أي error قديم
    errorMessage.textContent = "";

    // API Request
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchText}`
    );


    // إذا صار error
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }


    // تحويل البيانات إلى JSON
    const data = await response.json();


    // عرض المنتجات
    renderProducts(data.products);

  }

  catch (error) {

    errorMessage.textContent = error.message;

  }

  finally {

    // إخفاء loader
    loader.classList.add("hidden");

  }

}



// ================= RENDER PRODUCTS =================
function renderProducts(products) {

  // تنظيف المحتوى القديم
  productsContainer.innerHTML = "";


  // إذا ما في منتجات
  if (products.length === 0) {

    productsContainer.innerHTML = `
      <h2>No Products Found</h2>
    `;

    return;
  }


  // Loop على المنتجات
  products.forEach((product) => {

    productsContainer.innerHTML += `

      <div class="card">

        <img src="${product.thumbnail}" alt="${product.title}" />

        <div class="card-content">

          <h3>${product.title}</h3>

          <p>💲 Price: ${product.price}</p>

          <p>⭐ Rating: ${product.rating}</p>

          <p>📦 Stock: ${product.stock}</p>

        </div>

      </div>

    `;
  });

}



// ================= SEARCH =================
searchInput.addEventListener("input", (e) => {

  const searchValue = e.target.value;

  fetchProducts(searchValue);

});



// ================= FIRST LOAD =================
fetchProducts();