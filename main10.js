document.addEventListener('DOMContentLoaded', function(){
    const sizeSelect = document.getElementById('size-select');
    const priceShown = document.querySelector('.product-price');
    const purchaseButton = document.querySelector('.purchase-button');
    const stockStatus = document.createElement('p');
    stockStatus.className = 'stock-status';

    sizeSelect.parentNode.insertBefore(stockStatus, sizeSelect.nextSibling);
 
    //stock data for dog collars
    const stockData ={
        small:15,
        medium: 25,
        large: 20,
        'x-large': 12,
        'xx-large':8
    };



    function updatePriceAndAvailability(){
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        const size = selectedOption.value;
        const price = selectedOption.getAttribute('data-price');
        const stockQuantity = stockData[size];
        
        priceShown.textContent = `${price}`;

        if (stockQuantity > 0) {
            purchaseButton.disabled = false;
            purchaseButton.textContent = 'Add to Cart';
            stockStatus.textContent = `In Stock: ${stockQuantity} available`;
            stockStatus.style.color = 'Pink';
        }
         else { 
            purchaseButton.disabled = true;
            purchaseButton.textContent = 'Out of Stock';
            stockStatus.textContent = 'Out of Stock';
            stockStatus.style.color = 'blue';
        }
    }
    sizeSelect.addEventListener('change', updatePriceAndAvailability);
    updatePriceAndAvailability();
});

//create checkout event
function completePurchase() {
    const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
    const size = selectedOption.value;
    const stockQuantity = stockData[size];
    if (stockQuantity > 0) {
        alert(`Thank you for shopping with us! Your ${size} Dog collar is working to be shipped.`);
        stockData[size]--;
        updatePriceAndAvailability();
    }else{
        alert('Sorry, Our paws are working to get this back in stock');
    }
    
}
sizeSelect.addEventListener('change', updatePriceAndAvailability);
purchaseButton.addEventListener('click', handlePurchase);
    updatePriceAndAvailability();

//Event Delegation for Dynamic Product List 
function createProductElement(productData) {
    const productElement = document.createElement('section');
    productElement.className = 'product';
    productElement.innerHTML = `
    <h2 class = "product-name">${productData.name}</h2>
    <p class = "product-price">$${productData.price}</p>
    <div class = "product-options">
    <label for = "size-select-${productData.id}">Size:</label>
    <select id = "size-select-${productData.id}"name="size" class="size-select">
    ${Object.entries(productData.sizes).map(([size, stock]) =>
    `<option value="${size}" data-price="${productData.price}" data-stocks="${stock}">${size}</option>`
).join('')}
</select>
</div>
<p class="stock-status"></p>
<button class="purchase-button">Add to Cart</button>
`;
return productElement;
}
function handleProductInteraction(event) {
    const product = event.petSupplies.closest('.product');
    if (!product) return;

    const sizeSelect = product.querySelector('.size-select');
    const priceShown = product.querySelector('.product-price');
    const purchaseButton = product.querySelector('.purchase-button');
    const stockStatus = product.querySelector('.stock-status';

        if (event.petSupplies.classList.contains('size-select')) {
            updatePriceAndAvailability(sizeSelect, priceShown, purchaseButton, stockStatus);
        } else if (event.petSupplies.classList.contains('purchase-button')) {
            handlePurchase(sizeSelect, purchaseButton, stockStatus);
        }
}
function addNewMerchendise(event) {
    event.preventDefault();
    const formData = new FormData(event.petSupplies);
    const newMerchendise = {
        id: Date.now(),
        name: formData.get('name'),
        price: formData.get('price'),
        sizes:{
            small: parseInt (formData.get('small-stock')),
            medium: parseInt (formData.get('medium-stock')),
            large: parseInt (formData.get('large-stock')),
            'x-large': parseInt (formData.get('x-large-stock')),
            'xx-large': parseInt (formData.get('xx-large-stock')),
        }
    };
    const productElement = createProductElement (newProduct);
    productList.appendChild(productElement);
    event.petSupplies.reset();
}

productList.addEventListener('click', handleProductInteraction);
productList.addEventListener('change', handleProductInteraction);
addProductForm.addEventListener('submit', addNewMerchendise);