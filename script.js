// Форматирование номера телефона с улучшенной логикой
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('8')) {
        value = '7' + value.slice(1);
    }
    
    if (value.startsWith('7')) {
        value = value.slice(0, 11);
        let formatted = '+7';
        
        if (value.length > 1) {
            formatted += ' (' + value.slice(1, 4);
        }
        if (value.length >= 4) {
            formatted += ') ' + value.slice(4, 7);
        }
        if (value.length >= 7) {
            formatted += '-' + value.slice(7, 9);
        }
        if (value.length >= 9) {
            formatted += '-' + value.slice(9, 11);
        }
        
        e.target.value = formatted;
    } else if (value.length > 0 && !value.startsWith('7') && !value.startsWith('8')) {
        e.target.value = '+7 (' + value.slice(0, 3);
    }
});

// Валидация формы в реальном времени
const formInputs = document.querySelectorAll('#deliveryForm input, #deliveryForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#f5576c';
        } else {
            this.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(245, 87, 108)') {
            this.style.borderColor = '';
        }
    });
});

// Обработка отправки формы с улучшенным UX
document.getElementById('deliveryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim()
    };
    
    // Валидация
    let isValid = true;
    const errors = [];
    
    if (!formData.name || formData.name.length < 3) {
        isValid = false;
        errors.push('ФИО должно содержать минимум 3 символа');
        document.getElementById('name').style.borderColor = '#f5576c';
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone || phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
        isValid = false;
        errors.push('Введите корректный номер телефона');
        document.getElementById('phone').style.borderColor = '#f5576c';
    }
    
    if (!formData.address || formData.address.length < 10) {
        isValid = false;
        errors.push('Адрес должен содержать минимум 10 символов');
        document.getElementById('address').style.borderColor = '#f5576c';
    }
    
    if (!isValid) {
        showNotification(errors.join('<br>'), 'error');
        return;
    }
    
    // Имитация отправки данных
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    submitBtn.disabled = true;
    btnText.textContent = 'Обработка...';
    submitBtn.style.opacity = '0.7';
    
    // Имитация задержки обработки
    setTimeout(() => {
        // Здесь можно добавить реальную отправку данных на сервер
        console.log('Данные формы:', formData);
        
        // Перенаправление на страницу оплаты с передачей данных
        const params = new URLSearchParams({
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            amount: '1500'
        });
        
        window.location.href = `payment.html?${params.toString()}`;
    }, 1500);
});

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    // Удаляем существующие уведомления
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
    
    // Анимация появления
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Автоматическое скрытие
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

// Анимация появления элементов при загрузке с улучшенным эффектом
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.main-content > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
        }, index * 120 + 200);
    });
    
    // Анимация логотипа
    const logo = document.querySelector('.logo-container');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        setTimeout(() => {
            logo.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 100);
    }
});

// Плавная прокрутка при фокусе на полях формы
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        setTimeout(() => {
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    });
});

