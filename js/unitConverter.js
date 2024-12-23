document.addEventListener('DOMContentLoaded', () => {
    const valueInput = document.getElementById('value');
    const sourceUnitSelect = document.getElementById('source-unit');
    const targetUnitSelect = document.getElementById('target-unit');
    const convertButton = document.getElementById('convert');
    const resultSpan = document.getElementById('result');
    const categorySelect = document.getElementById('category-select');

    const units = {
        length: {
            m: { name: 'Meter', toBase: 1 },
            cm: { name: 'Centimeter', toBase: 0.01 },
            ft: { name: 'Foot', toBase: 0.3048 },
        },
        weight: {
            kg: { name: 'Kilogram', toBase: 1 },
            g: { name: 'Gram', toBase: 0.001 },
            lb: { name: 'Pound', toBase: 0.453592 },
        },
        volume: {
            l: { name: 'Liter', toBase: 1 },
            ml: { name: 'Milliliter', toBase: 0.001 },
            gal: { name: 'Gallon', toBase: 3.78541 },
        },
    };

    function populateUnitOptions(category) {
        sourceUnitSelect.innerHTML = '';
        targetUnitSelect.innerHTML = '';

        for (const unit in units[category]) {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = units[category][unit].name + ` (${unit})`;
            sourceUnitSelect.appendChild(option);

            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = units[category][unit].name + ` (${unit})`;
            targetUnitSelect.appendChild(option2);
        }
    }

    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        populateUnitOptions(selectedCategory);
    });

    convertButton.addEventListener('click', () => {
        const value = parseFloat(valueInput.value);
        const sourceUnit = sourceUnitSelect.value;
        const targetUnit = targetUnitSelect.value;
        const category = categorySelect.value;


        if (isNaN(value)) {
            resultSpan.textContent = 'Invalid input';
            return;
        }

        if (!category || !units[category] || !units[category][sourceUnit] || !units[category][targetUnit]) {
            resultSpan.textContent = 'Invalid unit selection';
            return;
        }

        const baseValue = value * units[category][sourceUnit].toBase;
        const result = baseValue / units[category][targetUnit].toBase;

        resultSpan.textContent = result.toFixed(2);
    });

    // Initialize with the first category
    populateUnitOptions(categorySelect.value);
});
