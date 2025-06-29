
        // Product data
        const products = [
            {
                id: 1,
                name: "Premium Smartphone",
                price: 899,
                image: "📱",
                description: "Latest flagship smartphone with advanced features"
            },
            {
                id: 2,
                name: "Wireless Headphones",
                price: 299,
                image: "🎧",
                description: "High-quality wireless headphones with noise cancellation"
            },
            {
                id: 3,
                name: "Smart Watch",
                price: 399,
                image: "⌚",
                description: "Advanced smartwatch with health monitoring"
            },
            {
                id: 4,
                name: "Laptop Pro",
                price: 1299,
                image: "💻",
                description: "Professional laptop for work and creativity"
            },
            {
                id: 5,
                name: "Gaming Console",
                price: 499,
                image: "🎮",
                description: "Next-gen gaming console for immersive gaming"
            },
            {
                id: 6,
                name: "Tablet",
                price: 649,
                image: "📧",
                description: "Versatile tablet for work and entertainment"
            }
        ];

        // Cart functionality
        let cart = [];

        // Navigation
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Load page-specific content
            if (pageId === 'products') {
                loadProducts();
            } else if (pageId === 'cart') {
                loadCart();
            }
        }

        // Load products
        function loadProducts() {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = '';

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">${product.image}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <p style="color: #666; margin-bottom: 1rem;">${product.description}</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }

            updateCartCount();
            showNotification(`${product.name} added to cart!`);
        }

        // Update cart count
        function updateCartCount() {
            const cartCount = document.getElementById('cartCount');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        // Load cart
        function loadCart() {
            const cartItems = document.getElementById('cartItems');
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <h3>Your cart is empty</h3>
                        <p>Add some products to get started!</p>
                    </div>
                `;
                return;
            }

            let cartHTML = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                cartHTML += `
                    <div class="cart-item">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="font-size: 2rem;">${item.image}</div>
                            <div>
                                <h4>${item.name}</h4>
                                <p style="color: #666;">$${item.price} each</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span style="margin: 0 0.5rem; font-weight: bold;">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <div style="font-weight: bold; margin: 0 1rem;">$${itemTotal}</div>
                            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `;
            });

            cartHTML += `
                <div class="cart-total">
                    Total: $${total}
                </div>
                <button class="checkout-btn" onclick="checkout()">
                    Proceed to Checkout
                </button>
            `;

            cartItems.innerHTML = cartHTML;
        }

        // Update quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartCount();
                    loadCart();
                }
            }
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            loadCart();
            showNotification('Item removed from cart');
        }

        // Checkout
        function checkout() {
            if (cart.length === 0) return;
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            showNotification(`Thank you for your purchase! Total: $${total}`);
            cart = [];
            updateCartCount();
            loadCart();
        }

        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We will get back to you soon.');
            this.reset();
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadProducts();
            updateCartCount();
        });

        // Mobile menu toggle (for future enhancement)
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }

        // Smooth scrolling for better UX
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add some interactivity to product cards
        document.addEventListener('mouseover', function(e) {
            if (e.target.closest('.product-card')) {
                e.target.closest('.product-card').style.transform = 'translateY(-10px) scale(1.02)';
            }
        });

        document.addEventListener('mouseout', function(e) {
            if (e.target.closest('.product-card')) {
                e.target.closest('.product-card').style.transform = 'translateY(0) scale(1)';
            }
        });
    