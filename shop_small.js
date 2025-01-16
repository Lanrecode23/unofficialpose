async function loadProducts() {
    try {
      // Fetch the product data from the JSON file
      const response = await fetch('products.json');
      const products = await response.json();
  
      // Get the container where the products will be displayed
      const productList = document.getElementById('product-container');
  
      // Display only the first 8 products
      const limitedProducts = products.slice(16, 24);
  
      // Loop through the limited products and create Bootstrap cards for each
      limitedProducts.forEach(product => {
        productList.innerHTML += `
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card shadow-sm p-3 mb-3  bg-body-tertiary rounded">
              <!-- Product Image -->
              <div class="card-img-top bg-dark rounded-4" 
                style="height: 12rem; background-image: url('${product.image}'); background-size: cover; background-position: center;"></div>
  
              <!-- Product Details -->
              <div class="card-body d-flex flex-column gap-3">
                <div class="d-flex justify-content-between">
                  <div>
                    <h5 class="card-title title fw-bold mb-0">${product.name}</h5>
                    <p class="text-muted small">UnofficialPose</p>
                  </div>
                  <span class="fw-bold text-danger price">₦${product.price}</span>
                </div>
  
                <!-- Add to Cart Button -->
                <a href="productDetails.html?id=${product.id}">
                  <button class="button w-100">View profile</button>
                </a>
              </div>
            </div>
          </div>
        `;
      });
    } catch (error) {
      console.error('Error loading the products:', error);
    }
  }
  
  // Call the function to load products
  loadProducts();
  