document.addEventListener('DOMContentLoaded', async () => {
    const dateInput = document.getElementById('date-input');
    const calculateDayButton = document.getElementById('calculate-day');
    const dayOfYearSpan = document.getElementById('day-of-year');

    calculateDayButton.addEventListener('click', () => {
        const dateValue = dateInput.value;
        if (!dateValue) {
            dayOfYearSpan.textContent = 'Please enter a date';
            return;
        }

        const date = new Date(dateValue);
        const startOfYear = new Date(date.getFullYear(), 0, 0);
        const diff = date - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        dayOfYearSpan.textContent = dayOfYear;
    });
});
