document.addEventListener('DOMContentLoaded', async () => {
    const dateInput = document.getElementById('date-input');
    const calculateDayButton = document.getElementById('calculate-day');
    const dayOfYearSpan = document.getElementById('day-of-year');
    const secondDateInput = document.getElementById('second-date-input');
    const calculateDaysBetweenButton = document.getElementById('calculate-days-between');
    const daysBetweenSpan = document.getElementById('days-between');
    const calculateDayOfWeekButton = document.getElementById('calculate-day-of-week');
    const dayOfWeekSpan = document.getElementById('day-of-week');
    const calculateDaysLeftButton = document.getElementById('calculate-days-left');
    const daysLeftSpan = document.getElementById('days-left');

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

    calculateDaysBetweenButton.addEventListener('click', () => {
        const firstDateValue = dateInput.value;
        const secondDateValue = secondDateInput.value;
        if (!firstDateValue || !secondDateValue) {
            daysBetweenSpan.textContent = 'Please enter both dates';
            return;
        }

        const firstDate = new Date(firstDateValue);
        const secondDate = new Date(secondDateValue);
        const diffTime = Math.abs(secondDate - firstDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        daysBetweenSpan.textContent = diffDays;
    });

    calculateDayOfWeekButton.addEventListener('click', () => {
        const dateValue = dateInput.value;
        if (!dateValue) {
            dayOfWeekSpan.textContent = 'Please enter a date';
            return;
        }

        const date = new Date(dateValue);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[date.getDay()];

        dayOfWeekSpan.textContent = dayOfWeek;
    });

    calculateDaysLeftButton.addEventListener('click', () => {
        const dateValue = dateInput.value;
        if (!dateValue) {
            daysLeftSpan.textContent = 'Please enter a date';
            return;
        }

        const date = new Date(dateValue);
        const endOfYear = new Date(date.getFullYear(), 11, 31);
        const diff = endOfYear - date;
        const oneDay = 1000 * 60 * 60 * 24;
        const daysLeft = Math.floor(diff / oneDay);

        daysLeftSpan.textContent = daysLeft;
    });
});
