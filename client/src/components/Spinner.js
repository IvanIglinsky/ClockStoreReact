import React from 'react';

const Spinner = () => {
    const sales = [
        'Розпродаж літньої колекції! Знижки до 50% на всю продукцію! Тільки сьогодні: безкоштовна доставка!',
        'Акція: купуйте дві одиниці товару, а отримуйте третю безкоштовно! Знижки на весь асортимент магазину!',
        'Тільки цього тижня: спеціальні пропозиції для клієнтів з дисконтною карткою!',
    ];


    const allSales = sales.join(' • ');

    return (
        <div style={{ top: 0, left: 0, width: '100%', backgroundColor: 'lightgray', padding: '10px' }}>
            <marquee>{allSales}</marquee>
        </div>
    );
};

export default Spinner;
