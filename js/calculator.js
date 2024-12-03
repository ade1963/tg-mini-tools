
document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.getElementById('price');
    const taxRateInput = document.getElementById('tax-rate');
    const calculateButton = document.getElementById('calculate');
    const totalPriceSpan = document.getElementById('total-price');

    calculateButton.addEventListener('click', async () => {
        const price = parseFloat(priceInput.value);
        const taxRate = parseFloat(taxRateInput.value);
    
        if (isNaN(price) || isNaN(taxRate)) {
            totalPriceSpan.textContent = 'Invalid input';
            return;
        }
    
        const totalPrice = price + (price * taxRate / 100);
        totalPriceSpan.textContent = totalPrice.toFixed(2);
    
        // Save the tax rate
        await UserData.saveToolSettings(TelegramApp.chatId, UserData.currentToolId, { taxRate: taxRate });
    });
});
