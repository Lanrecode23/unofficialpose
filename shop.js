let products = [];
    let currentPage = 1;
    const itemsPerPage = 12;

    async function loadProducts() {
      try {
        // Fetch the product data from the JSON file
        const response = await fetch('products.json');
        products = await response.json();

        // Display the first page
        displayProducts();
      } catch (error) {
        console.error('Error loading the products:', error);
      }
    }

    function displayProducts() {
      // Calculate the range of products to display
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = products.slice(startIndex, endIndex);

      // Get the container where the products will be displayed
      const productList = document.getElementById('product-container');
      productList.innerHTML = '';

      // Loop through the products and create Bootstrap cards for each
      paginatedProducts.forEach(product => {
        productList.innerHTML += `
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card shadow-sm p-3 mb-4 mt-2 bg-body-tertiary rounded">
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

      // Update pagination controls
      updatePaginationControls();
    }

    function updatePaginationControls() {
      const totalPages = Math.ceil(products.length / itemsPerPage);

      // Update the page info
      document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;

      // Enable/Disable buttons
      document.getElementById('prev-btn').disabled = currentPage === 1;
      document.getElementById('next-btn').disabled = currentPage === totalPages;
    }

    // Event listeners for pagination buttons
    document.getElementById('prev-btn').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayProducts();
      }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      const totalPages = Math.ceil(products.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
      }
    });

    // Call the function to load products
    loadProducts();