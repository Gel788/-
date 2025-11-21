// Получение данных из URL параметров
const urlParams = new URLSearchParams(window.location.search);
const sbpNumber = urlParams.get('sbp') || '2000123456789';
const amount = urlParams.get('amount') || '1500';
const bank = urlParams.get('bank') || 'sber';

// Названия банков
const bankNames = {
    'sber': { name: 'Сбербанк', logo: 'Сбер', class: 'sber' },
    'vtb': { name: 'ВТБ', logo: 'ВТБ', class: 'vtb' },
    'tinkoff': { name: 'Тинькофф', logo: 'Т', class: 'tinkoff' },
    'alfa': { name: 'Альфа-Банк', logo: 'α', class: 'alfa' },
    'raiffeisen': { name: 'Райффайзенбанк', logo: 'R', class: 'raiffeisen' },
    'gazprombank': { name: 'Газпромбанк', logo: 'ГПБ', class: 'gazprombank' },
    'rosbank': { name: 'Росбанк', logo: 'РБ', class: 'rosbank' },
    'other': { name: 'Банк', logo: '🏦', class: 'other' }
};

// Установка данных на странице
const bankInfo = bankNames[bank] || bankNames['sber'];
const bankLogo = document.getElementById('bankLogoLarge');
const bankSbpNumber = document.getElementById('bankSbpNumber');
const bankAmount = document.getElementById('bankAmount');
const confirmAmount = document.getElementById('confirmAmount');

bankLogo.textContent = bankInfo.logo;
bankLogo.classList.add(bankInfo.class);
bankSbpNumber.textContent = sbpNumber;
bankAmount.textContent = parseInt(amount).toLocaleString('ru-RU') + ' ₽';
confirmAmount.textContent = parseInt(amount).toLocaleString('ru-RU') + ' ₽';

// Обработка формы оплаты
const bankPaymentForm = document.getElementById('bankPaymentForm');
const bankPayBtn = document.getElementById('bankPayBtn');

bankPaymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cardSelect = document.getElementById('cardSelect');
    const confirmPayment = document.getElementById('confirmPayment');
    
    if (!cardSelect.value) {
        showNotification('Выберите карту для оплаты', 'error');
        cardSelect.focus();
        return;
    }
    
    if (!confirmPayment.checked) {
        showNotification('Подтвердите перевод', 'error');
        return;
    }
    
    const btnText = bankPayBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    bankPayBtn.disabled = true;
    btnText.textContent = 'Обработка...';
    
    // Имитация обработки платежа
    setTimeout(() => {
        // В реальном проекте здесь будет запрос к API банка
        console.log('Оплата по СБП:', {
            sbp: sbpNumber,
            amount: amount,
            bank: bank,
            card: cardSelect.value
        });
        
        // Перенаправление на страницу успеха
        const successParams = new URLSearchParams({
            sbp: sbpNumber,
            amount: amount,
            bank: bank
        });
        
        window.location.href = `payment-success.html?${successParams.toString()}`;
    }, 2000);
});

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, type === 'error' ? 5000 : 4000);
}

// Добавляем стили для уведомлений
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        border-left: 4px solid;
    }
    
    .notification-success {
        border-left-color: #4ecdc4;
    }
    
    .notification-error {
        border-left-color: #f5576c;
    }
    
    .notification-info {
        border-left-color: #667eea;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 20px;
        font-weight: bold;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        flex-shrink: 0;
    }
    
    .notification-success .notification-icon {
        background: #4ecdc4;
        color: white;
    }
    
    .notification-error .notification-icon {
        background: #f5576c;
        color: white;
    }
    
    .notification-info .notification-icon {
        background: #667eea;
        color: white;
    }
    
    .notification-message {
        font-size: 14px;
        line-height: 1.5;
        color: #333;
    }
    
    @media (max-width: 480px) {
        .notification {
            right: 12px;
            left: 12px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);

// Анимация появления элементов
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.bank-header, .payment-card, .security-info');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150 + 200);
    });
});

