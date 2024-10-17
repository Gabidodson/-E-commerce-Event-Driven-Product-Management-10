document.addEventListener('DOMContentLoaded', function(){
    const sizeSelect = document.getElementById('size-select');
    const priceShown = document.querySelector('.product-price');
    function updatePrice(){
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        const price = selectedOption.getAttribute('data-price');
        priceShown.textContent = `${price}`;

    }
    updatePrice();
    sizeSelect.addEventListener('change', updatePrice);
});

