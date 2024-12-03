document.addEventListener('DOMContentLoaded', () => {
    const valueInput = document.getElementById('value');
    const sourceUnitSelect = document.getElementById('source-unit');
    const targetUnitSelect = document.getElementById('target-unit');
    const convertButton = document.getElementById('convert');
    const resultSpan = document.getElementById('result');

    convertButton.addEventListener('click', () => {
        const value = parseFloat(valueInput.value);
        const sourceUnit = sourceUnitSelect.value;
        const targetUnit = targetUnitSelect.value;

        if (isNaN(value)) {
            resultSpan.textContent = 'Invalid input';
            return;
        }

        let result;

        // Length conversions
        if (sourceUnit === 'm' && targetUnit === 'cm') result = value * 100;
        else if (sourceUnit === 'm' && targetUnit === 'ft') result = value * 3.28084;
        else if (sourceUnit === 'cm' && targetUnit === 'm') result = value / 100;
        else if (sourceUnit === 'cm' && targetUnit === 'ft') result = value / 30.48;
        else if (sourceUnit === 'ft' && targetUnit === 'm') result = value / 3.28084;
        else if (sourceUnit === 'ft' && targetUnit === 'cm') result = value * 30.48;
        else if (sourceUnit === targetUnit) result = value;

        // Weight conversions
        else if (sourceUnit === 'kg' && targetUnit === 'g') result = value * 1000;
        else if (sourceUnit === 'kg' && targetUnit === 'lb') result = value * 2.20462;
        else if (sourceUnit === 'g' && targetUnit === 'kg') result = value / 1000;
        else if (sourceUnit === 'g' && targetUnit === 'lb') result = value / 453.592;
        else if (sourceUnit === 'lb' && targetUnit === 'kg') result = value / 2.20462;
        else if (sourceUnit === 'lb' && targetUnit === 'g') result = value * 453.592;

        // Volume conversions
        else if (sourceUnit === 'l' && targetUnit === 'ml') result = value * 1000;
        else if (sourceUnit === 'l' && targetUnit === 'gal') result = value / 3.78541;
        else if (sourceUnit === 'ml' && targetUnit === 'l') result = value / 1000;
        else if (sourceUnit === 'ml' && targetUnit === 'gal') result = value / 3785.41;
        else if (sourceUnit === 'gal' && targetUnit === 'l') result = value * 3.78541;
        else if (sourceUnit === 'gal' && targetUnit === 'ml') result = value * 3785.41;

        resultSpan.textContent = result.toFixed(2);
    });
});