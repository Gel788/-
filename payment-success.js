// Получение данных из URL параметров
const urlParams = new URLSearchParams(window.location.search);
const sbpNumber = urlParams.get('sbp') || '2000123456789';
const amount = urlParams.get('amount') || '1500';

// Установка данных на странице
document.getElementById('successAmount').textContent = parseInt(amount).toLocaleString('ru-RU') + ' ₽';
document.getElementById('successSbp').textContent = sbpNumber;

// Анимация появления
window.addEventListener('load', function() {
    const content = document.querySelector('.success-content');
    content.style.opacity = '0';
    content.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        content.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        content.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 100);
});

