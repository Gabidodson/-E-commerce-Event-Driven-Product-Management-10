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

