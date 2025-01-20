(async function loadProducts() {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    if (!productId) {
        document.body.innerHTML = '<h1>Product not found</h1>';
        return;
    }
  
    try {
        // Fetch the product data from the JSON file
        const response = await fetch('products.json');
        const products = await response.json();
  
        // Find the product by ID
        const product = products.find(p => p.id.toString() === productId);
  
        if (!product) {
            document.body.innerHTML = '<h1>Product not found</h1>';
            return;
        }
  
        // Update the page with the product details
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-price').textContent = `Price: ₦${product.price}`;
        document.getElementById('product-description').textContent = product.description || 'No description available.';

        const productList = document.getElementById('product-container');
  
        // Display only the products from index 16 to 24
        const limitedProducts = products.slice(30, 34);
  
        // Loop through the limited products and create Bootstrap cards for each
        limitedProducts.forEach(product => {
            productList.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card  shadow-sm p-3 mb-3 mt-3 bg-body-tertiary rounded">
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
  
                            <!-- View Profile Button -->
                            <a href="productDetails.html?id=${product.id}">
                            <button class="button w-100">View profile</button>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error('Error loading product details:', error);
        document.body.innerHTML = '<h1>Error loading product details</h1>';
    }
})();
