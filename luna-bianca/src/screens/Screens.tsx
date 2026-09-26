import "./screens.css";
import { Avatar, Button, Chip, EmptyState, Field, Header, ProgressBar, StatusBanner } from "../components/ui";
import {
  clinic,
  cosmetologyCategories,
  dentalCategories,
  doctors,
  documents,
  family,
  notifications,
  payments,
  procedures,
  teethData,
  treatmentPlan,
  user,
  visits,
  type ScreenId,
} from "../data/content";
import { useMemo, useState } from "react";

type Nav = (id: ScreenId) => void;

function BrandMark({ compact }: { compact?: boolean }) {
  return (
    <div className={`brand-mark${compact ? " brand-mark--compact" : ""}`}>
      <div className="brand-mark__moon" aria-hidden />
      <div>
        <div className="brand-mark__name">LUNA BIANCA</div>
        <div className="brand-mark__tag">DENTAL & COSMETIC</div>
      </div>
    </div>
  );
}

export function SplashScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="screen screen--no-nav splash fade-in" onClick={onDone} role="presentation">
      <div className="splash__orb" aria-hidden />
      <div className="splash__content">
        <div className="splash__moon" aria-hidden />
        <h1>LUNA BIANCA</h1>
        <p>DENTAL & COSMETIC</p>
      </div>
      <span className="splash__hint">Коснитесь, чтобы продолжить</span>
    </div>
  );
}

export function OnboardingScreen({ onContinue }: { onContinue: () => void }) {
  const slides = [
    { title: "Ваша улыбка.\nВаша эстетика.", text: "Премиальная стоматология и косметология в одном пространстве." },
    { title: "Всё необходимое\nв одном приложении.", text: "Запись, план лечения, документы и связь с клиникой." },
    { title: "Ваше здоровье и красота\nпод контролем.", text: "Персональный путь ухода — спокойно и приватно." },
  ];
  const [i, setI] = useState(0);
  const last = i === slides.length - 1;

  return (
    <div className="screen screen--no-nav onboarding fade-in">
      <BrandMark compact />
      <div className="onboarding__visual">
        <div className={`onboarding__photo onboarding__photo--${i + 1}`} />
        <div className="onboarding__veil" />
      </div>
      <div className="onboarding__copy">
        <h2>{slides[i].title}</h2>
        <p>{slides[i].text}</p>
      </div>
      <div className="onboarding__dots">
        {slides.map((_, idx) => (
          <button key={idx} type="button" className={idx === i ? "is-active" : undefined} onClick={() => setI(idx)} aria-label={`Слайд ${idx + 1}`} />
        ))}
      </div>
      <div className="onboarding__actions">
        {last ? (
          <>
            <Button full onClick={onContinue}>Войти</Button>
            <Button full variant="outline" onClick={onContinue}>Создать аккаунт</Button>
          </>
        ) : (
          <Button full onClick={() => setI((v) => v + 1)}>Далее</Button>
        )}
      </div>
    </div>
  );
}

export function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState(0);

  return (
    <div className="screen screen--no-nav login fade-in">
      <BrandMark />
      <h2 className="screen-title" style={{ marginTop: 28 }}>{step === 0 ? "Вход" : step === 1 ? "Код из SMS" : "О вас"}</h2>
      <p className="screen-subtitle">
        {step === 0 && "Войдите по номеру телефона — без паролей."}
        {step === 1 && "Мы отправили код на +7 ••• •••-45-67"}
        {step === 2 && "Заполните профиль один раз — дальше всё автоматически."}
      </p>

      <div style={{ marginTop: 28 }}>
        {step === 0 && <Field label="Телефон" placeholder="+7" />}
        {step === 1 && (
          <div className="otp-row">
            {["", "", "", ""].map((_, idx) => (
              <input key={idx} className="otp" maxLength={1} inputMode="numeric" defaultValue={idx < 2 ? String(idx + 1) : ""} />
            ))}
          </div>
        )}
        {step === 2 && (
          <>
            <Field label="Имя" placeholder="Альберт" />
            <Field label="Дата рождения" placeholder="ДД.ММ.ГГГГ" />
            <Field label="Email" placeholder="name@email.com" type="email" />
            <label className="consent">
              <input type="checkbox" defaultChecked />
              <span>Согласие на обработку персональных данных</span>
            </label>
          </>
        )}
      </div>

      <div className="sticky-actions">
        <Button
          full
          onClick={() => {
            if (step < 2) setStep((s) => s + 1);
            else onSuccess();
          }}
        >
          {step < 2 ? "Продолжить" : "Начать"}
        </Button>
      </div>
    </div>
  );
}

export function HomeScreen({ go }: { go: Nav }) {
  return (
    <div className="screen home fade-in">
      <div className="home__top">
        <div>
          <p className="eyebrow">Luna Bianca</p>
          <h2 className="home__hello">Добрый день, {user.name}</h2>
        </div>
        <button type="button" onClick={() => go("profile")} aria-label="Профиль">
          <Avatar initials="А" size={44} />
        </button>
      </div>

      <article className="visit-hero card">
        <div className="visit-hero__top">
          <span className="eyebrow">Ближайший визит</span>
          <span className="pill">Подтверждён</span>
        </div>
        <div className="visit-hero__date">
          <strong>26 сентября</strong>
          <span>15:30</span>
        </div>
        <p className="visit-hero__role">Стоматолог-терапевт</p>
        <p className="visit-hero__doctor">Лиана Александровна</p>
        <p className="visit-hero__addr">{clinic.city}, {clinic.address}</p>
        <div className="visit-hero__actions">
          <Button
            variant="dark"
            onClick={() => go("clinic")}
          >
            Маршрут
          </Button>
          <Button
            variant="outline"
            onClick={() => go("booking")}
          >
            Перенести
          </Button>
        </div>
      </article>

      <section className="block">
        <div className="block__head">
          <h3>Ваш план лечения</h3>
          <button type="button" className="linkish" onClick={() => go("treatment")}>Подробнее</button>
        </div>
        <div className="card plan-card">
          <ProgressBar value={treatmentPlan.progress} label="Завершено" />
          <ul className="plan-steps">
            {treatmentPlan.stages.map((s) => (
              <li key={s.title} className={`plan-steps__item is-${s.status}`}>
                <span className="plan-steps__dot">{s.status === "done" ? "✓" : s.status === "current" ? "●" : "○"}</span>
                <span>{s.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block">
        <h3 className="section-label">Быстрые действия</h3>
        <div className="quick-grid">
          {[
            { label: "Записаться", id: "booking" as ScreenId },
            { label: "Мои визиты", id: "visits" as ScreenId },
            { label: "План лечения", id: "treatment" as ScreenId },
            { label: "Документы", id: "documents" as ScreenId },
          ].map((q) => (
            <button key={q.id} type="button" className="quick-tile" onClick={() => go(q.id)}>
              <span className="quick-tile__icon" />
              {q.label}
            </button>
          ))}
        </div>
      </section>

      <section className="block">
        <h3 className="section-label">Персонально для вас</h3>
        <article className="card recommend" onClick={() => go("procedure")} role="presentation">
          <div className="recommend__media" />
          <div className="recommend__body">
            <p className="eyebrow">Рекомендация клиники</p>
            <h4>Курс биоревитализации</h4>
            <p>Мягкое восстановление кожи после лета — индивидуально под ваш фототип.</p>
            <Button variant="secondary">Смотреть</Button>
          </div>
        </article>
      </section>

      <section className="block home__links">
        <button type="button" className="text-row" onClick={() => go("dentistry")}><span>Стоматология</span><span>→</span></button>
        <button type="button" className="text-row" onClick={() => go("cosmetology")}><span>Косметология</span><span>→</span></button>
        <button type="button" className="text-row" onClick={() => go("teeth-map")}><span>Карта зубов</span><span>→</span></button>
        <button type="button" className="text-row" onClick={() => go("chat")}><span>Чат с клиникой</span><span>→</span></button>
      </section>
    </div>
  );
}

export function DentistryScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="Стоматология" onBack={() => go("home")} large />
      <p className="screen-subtitle">Экспертная диагностика и эстетика улыбки</p>
      <div className="cat-list" style={{ marginTop: 22 }}>
        {dentalCategories.map((c) => (
          <button key={c} type="button" className="cat-row card" onClick={() => go(c === "Диагностика" ? "teeth-map" : "booking")}>
            <span>{c}</span>
            <span className="chev">›</span>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <Button full variant="dark" onClick={() => go("doctors")}>Выбрать врача</Button>
      </div>
    </div>
  );
}

export function TeethMapScreen({ go }: { go: Nav }) {
  const [selected, setSelected] = useState(16);
  const info = teethData[selected] ?? { status: "Нет данных", history: [] };
  const upper = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lower = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  return (
    <div className="screen fade-in">
      <Header title="Карта зубов" onBack={() => go("dentistry")} large />
      <p className="screen-subtitle">Нажмите на зуб, чтобы увидеть статус и историю</p>

      <div className="teeth-map card">
        <div className="teeth-row">
          {upper.map((n) => (
            <button
              key={n}
              type="button"
              className={`tooth${selected === n ? " is-selected" : ""}${teethData[n] ? " has-data" : ""}`}
              onClick={() => setSelected(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="teeth-arch" aria-hidden />
        <div className="teeth-row">
          {lower.map((n) => (
            <button
              key={n}
              type="button"
              className={`tooth${selected === n ? " is-selected" : ""}${teethData[n] ? " has-data" : ""}`}
              onClick={() => setSelected(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <article className="card tooth-detail">
        <div className="tooth-detail__head">
          <h3>Зуб {selected}</h3>
          <span className={`status-tag status-tag--${info.status === "Здоров" ? "ok" : "warn"}`}>{info.status}</span>
        </div>
        <p className="section-label" style={{ marginTop: 16 }}>История</p>
        <ul className="plan-steps">
          {info.history.map((h) => (
            <li key={h.label} className={`plan-steps__item is-${h.done ? "done" : "todo"}`}>
              <span className="plan-steps__dot">{h.done ? "✓" : "○"}</span>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <Button variant="secondary" full onClick={() => go("documents")}>Снимки</Button>
          <Button full onClick={() => go("booking")}>Записаться</Button>
        </div>
      </article>
    </div>
  );
}

export function CosmetologyScreen({ go }: { go: Nav }) {
  const [cat, setCat] = useState("Инъекционная");
  const list = useMemo(
    () => procedures.filter((p) => cat === "Все" || p.category === cat || (cat === "Anti-Age" && p.id === "laser")),
    [cat],
  );

  return (
    <div className="screen fade-in">
      <Header title="Косметология" onBack={() => go("home")} large />
      <p className="screen-subtitle">Эстетика лица с медицинской точностью</p>
      <div className="chips-scroll" style={{ marginTop: 18 }}>
        {cosmetologyCategories.map((c) => (
          <Chip key={c} active={c === cat} onClick={() => setCat(c)}>{c}</Chip>
        ))}
      </div>
      <div className="proc-list">
        {(list.length ? list : procedures).map((p) => (
          <article key={p.id} className="card proc-card" onClick={() => go("procedure")} role="presentation">
            <img src={p.image} alt="" />
            <div className="proc-card__body">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="proc-card__meta">
                <span>{p.duration}</span>
                <strong>{p.price}</strong>
              </div>
              <Button variant="outline">Подробнее</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ProcedureScreen({ go }: { go: Nav }) {
  const p = procedures[0];
  return (
    <div className="screen screen--flush fade-in">
      <div className="proc-hero" style={{ backgroundImage: `url(${p.image})` }}>
        <Header onBack={() => go("cosmetology")} />
      </div>
      <div className="proc-page">
        <p className="eyebrow">{p.category}</p>
        <h2 className="screen-title">{p.title}</h2>
        <p className="screen-subtitle">{p.description}. Индивидуальный протокол после консультации врача.</p>
        <div className="meta-grid">
          <div><span>Длительность</span><strong>45 мин</strong></div>
          <div><span>Стоимость</span><strong>от 12 000 ₽</strong></div>
        </div>
        <h3 className="section-label" style={{ marginTop: 22 }}>Показания</h3>
        <ul className="bullet-list">
          <li>Сухость и потеря тонуса</li>
          <li>Тонкая, обезвоженная кожа</li>
          <li>Подготовка к сезонным нагрузкам</li>
        </ul>
        <h3 className="section-label" style={{ marginTop: 22 }}>Врач</h3>
        <button type="button" className="doctor-mini card" onClick={() => go("doctor")}>
          <img src={doctors[1].photo} alt="" />
          <div>
            <strong>{doctors[1].name}</strong>
            <p>{doctors[1].role}</p>
          </div>
          <span className="chev">›</span>
        </button>
        <div className="sticky-actions">
          <Button full onClick={() => go("booking")}>Записаться</Button>
        </div>
      </div>
    </div>
  );
}

export function DoctorsScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="Врачи" onBack={() => go("home")} large />
      <p className="screen-subtitle">Команда клиники — эксперты с индивидуальным подходом</p>
      <div className="doctor-list">
        {doctors.map((d) => (
          <article key={d.id} className="card doctor-card">
            <img src={d.photo} alt="" />
            <div>
              <h4>{d.name}</h4>
              <p>{d.role}</p>
              <p className="muted">Стаж {d.experience}</p>
              <p className="focus">{d.focus}</p>
              <Button variant="outline" onClick={() => go("doctor")}>Профиль</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function DoctorScreen({ go }: { go: Nav }) {
  const d = doctors[0];
  return (
    <div className="screen screen--flush fade-in">
      <div className="doctor-hero" style={{ backgroundImage: `url(${d.photo})` }}>
        <Header onBack={() => go("doctors")} />
      </div>
      <div className="doctor-page">
        <h2 className="screen-title">{d.name}</h2>
        <p className="screen-subtitle">{d.role} · стаж {d.experience}</p>
        <div className="meta-grid">
          <div><span>Рейтинг</span><strong>{d.rating}</strong></div>
          <div><span>Отзывы</span><strong>{d.reviews}</strong></div>
        </div>
        <h3 className="section-label" style={{ marginTop: 22 }}>Образование</h3>
        <p className="body-text">{d.education}</p>
        <h3 className="section-label" style={{ marginTop: 18 }}>Направления</h3>
        <p className="body-text">{d.focus}</p>
        <h3 className="section-label" style={{ marginTop: 18 }}>Свободные даты</h3>
        <div className="chips-scroll">
          {d.available.map((a) => <Chip key={a}>{a}</Chip>)}
        </div>
        <div className="sticky-actions">
          <Button full onClick={() => go("booking")}>Записаться к врачу</Button>
        </div>
      </div>
    </div>
  );
}

export function BookingScreen({ go }: { go: Nav }) {
  const steps = ["Направление", "Услуга", "Врач", "Дата", "Время", "Подтверждение"];
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState("Стоматология");

  return (
    <div className="screen fade-in">
      <Header title="Запись" onBack={() => (step === 0 ? go("home") : setStep((s) => s - 1))} large />
      <div className="booking-steps">
        {steps.map((s, idx) => (
          <div key={s} className={`booking-steps__item${idx === step ? " is-active" : ""}${idx < step ? " is-done" : ""}`}>
            <span>{idx + 1}</span>
            <small>{s}</small>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="choice-grid">
          {["Стоматология", "Косметология"].map((d) => (
            <button key={d} type="button" className={`choice-card card${dir === d ? " is-active" : ""}`} onClick={() => setDir(d)}>
              {d}
            </button>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="cat-list">
          {(dir === "Стоматология" ? dentalCategories : cosmetologyCategories).slice(0, 5).map((c) => (
            <button key={c} type="button" className="cat-row card" onClick={() => setStep(2)}>{c}<span className="chev">›</span></button>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className="doctor-list">
          {doctors.map((d) => (
            <button key={d.id} type="button" className="doctor-mini card" onClick={() => setStep(3)}>
              <img src={d.photo} alt="" />
              <div><strong>{d.name}</strong><p>{d.role}</p></div>
              <span className="chev">›</span>
            </button>
          ))}
        </div>
      )}
      {step === 3 && (
        <div className="date-grid">
          {["14 окт", "16 окт", "18 окт", "20 окт", "21 окт", "22 окт"].map((d, i) => (
            <button key={d} type="button" className={`date-cell${i === 0 ? " is-active" : ""}`} onClick={() => setStep(4)}>{d}</button>
          ))}
        </div>
      )}
      {step === 4 && (
        <div className="time-grid">
          {["10:00", "11:30", "14:00", "15:30", "17:30", "19:00"].map((t, i) => (
            <button key={t} type="button" className={`time-cell${i === 4 ? " is-active" : ""}`} onClick={() => setStep(5)}>{t}</button>
          ))}
        </div>
      )}
      {step === 5 && (
        <article className="card confirm-card">
          <p className="eyebrow">Подтверждение</p>
          <h3>14 октября · 17:30</h3>
          <div className="divider" />
          <p><span>Доктор</span><strong>Лиана Александровна</strong></p>
          <p><span>Услуга</span><strong>Профессиональная гигиена</strong></p>
          <p><span>Адрес</span><strong>{clinic.address}</strong></p>
        </article>
      )}

      <div className="sticky-actions">
        {step < 5 ? (
          step === 0 || step === 3 || step === 4 ? (
            <Button full onClick={() => setStep((s) => s + 1)}>Далее</Button>
          ) : null
        ) : (
          <Button full onClick={() => go("success")}>Подтвердить запись</Button>
        )}
      </div>
    </div>
  );
}

export function VisitsScreen({ go }: { go: Nav }) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = visits[tab];
  return (
    <div className="screen fade-in">
      <Header title="Мои визиты" large />
      <div className="segment">
        <button type="button" className={tab === "upcoming" ? "is-active" : undefined} onClick={() => setTab("upcoming")}>Предстоящие</button>
        <button type="button" className={tab === "past" ? "is-active" : undefined} onClick={() => setTab("past")}>Прошедшие</button>
      </div>
      <div className="visit-list">
        {list.map((v) => (
          <article key={v.date + v.time} className="card visit-row">
            <div>
              <strong>{v.date}</strong>
              <span>{v.time}</span>
            </div>
            <div>
              <p>{v.service}</p>
              <p className="muted">{v.doctor}</p>
            </div>
            <span className="pill">{v.status}</span>
          </article>
        ))}
      </div>
      <Button full variant="outline" onClick={() => go("booking")}>Новая запись</Button>
    </div>
  );
}

export function TreatmentScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="План лечения" onBack={() => go("home")} large />
      <div className="card finance-summary">
        <div><span>Общая стоимость</span><strong>{treatmentPlan.total}</strong></div>
        <div><span>Оплачено</span><strong>{treatmentPlan.paid}</strong></div>
        <div><span>Осталось</span><strong>{treatmentPlan.remaining}</strong></div>
      </div>
      <ProgressBar value={treatmentPlan.progress} label="Прогресс" />
      <div className="stage-list">
        {treatmentPlan.stages.map((s) => (
          <article key={s.title} className="card stage-card">
            <div className="stage-card__top">
              <h4>{s.title}</h4>
              <span className={`status-tag status-tag--${s.status === "done" ? "ok" : s.status === "current" ? "warn" : "muted"}`}>
                {s.status === "done" ? "Готово" : s.status === "current" ? "Сейчас" : "План"}
              </span>
            </div>
            <p className="muted">{s.doctor}</p>
            <div className="stage-card__bottom">
              <span>{s.date}</span>
              <strong>{s.price}</strong>
            </div>
          </article>
        ))}
      </div>
      <Button full onClick={() => go("finance")}>Перейти к оплате</Button>
    </div>
  );
}

export function DocumentsScreen({ go }: { go: Nav }) {
  const cats = ["Все", "КТ", "Рентген", "План лечения", "Договоры", "Чеки"];
  const [cat, setCat] = useState("Все");
  const list = documents.filter((d) => cat === "Все" || d.type === cat);
  return (
    <div className="screen fade-in">
      <Header title="Документы" large />
      <p className="screen-subtitle">Цифровая медицинская папка</p>
      <div className="chips-scroll" style={{ marginTop: 14 }}>
        {cats.map((c) => <Chip key={c} active={c === cat} onClick={() => setCat(c)}>{c}</Chip>)}
      </div>
      <div className="doc-list">
        {list.map((d) => (
          <article key={d.title} className="card doc-row">
            <div className="doc-row__icon">{d.type.slice(0, 2)}</div>
            <div>
              <strong>{d.title}</strong>
              <p className="muted">{d.date} · {d.size}</p>
            </div>
            <Button variant="ghost" onClick={() => go("success")}>Открыть</Button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function FinanceScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="Мои платежи" onBack={() => go("profile")} large />
      <div className="card balance-card">
        <p className="eyebrow">Баланс плана</p>
        <h3>{treatmentPlan.remaining}</h3>
        <p>к оплате по текущему плану лечения</p>
        <div className="spend-bars" aria-hidden>
          <div style={{ height: "40%" }} />
          <div style={{ height: "55%" }} />
          <div style={{ height: "85%" }} />
          <div style={{ height: "60%" }} />
        </div>
      </div>
      <h3 className="section-label">История оплат</h3>
      <div className="pay-list">
        {payments.map((p) => (
          <div key={p.title + p.date} className="pay-row">
            <div>
              <strong>{p.title}</strong>
              <p className="muted">{p.date}</p>
            </div>
            <span>{p.amount}</span>
          </div>
        ))}
      </div>
      <Button full onClick={() => go("success")}>Оплатить остаток</Button>
    </div>
  );
}

export function LoyaltyScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="Private Client" onBack={() => go("profile")} large />
      <article className="wallet-card">
        <div className="wallet-card__top">
          <span>LUNA BIANCA</span>
          <span className="wallet-card__moon" />
        </div>
        <p className="wallet-card__tier">PRIVATE CLIENT</p>
        <strong>{user.fullName}</strong>
        <div className="wallet-card__bottom">
          <div className="qr" aria-hidden />
          <div>
            <span>Бонусы</span>
            <em>{user.bonuses.toLocaleString("ru-RU")}</em>
          </div>
        </div>
      </article>
      <p className="muted center-note">Карта готова к добавлению в Apple Wallet</p>
      <Button full variant="outline" onClick={() => go("bonuses")}>Мои бонусы</Button>
    </div>
  );
}

export function BonusesScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="Мои бонусы" onBack={() => go("loyalty")} large />
      <div className="card bonus-hero">
        <p className="eyebrow">Доступно</p>
        <h3>{user.bonuses.toLocaleString("ru-RU")} баллов</h3>
      </div>
      <h3 className="section-label">История</h3>
      {[
        { t: "Начисление за визит", a: "+450", d: "12 авг" },
        { t: "Списание — гигиена", a: "−200", d: "12 авг" },
        { t: "Приветственный бонус", a: "+1 000", d: "3 июля" },
      ].map((x) => (
        <div key={x.t} className="pay-row">
          <div><strong>{x.t}</strong><p className="muted">{x.d}</p></div>
          <span>{x.a}</span>
        </div>
      ))}
      <h3 className="section-label" style={{ marginTop: 18 }}>Персональные предложения</h3>
      <article className="card recommend-mini">
        <h4>−15% на биоревитализацию</h4>
        <p>До 30 сентября · для Private Client</p>
      </article>
    </div>
  );
}

export function ChatScreen({ go }: { go: Nav }) {
  return (
    <div className="screen chat fade-in">
      <Header title="Luna Bianca" onBack={() => go("home")} />
      <div className="chat__thread">
        <div className="bubble bubble--in">
          Здравствуйте, Альберт 🤍<br />Чем можем помочь?
        </div>
        <div className="bubble bubble--out">Хочу уточнить подготовку к приёму</div>
        <div className="bubble bubble--in">Конечно. Отправим рекомендации и напомним за 24 часа.</div>
      </div>
      <div className="quick-replies">
        {["Перенести запись", "Задать вопрос врачу", "Уточнить стоимость", "Подготовка к приёму"].map((q) => (
          <Chip key={q}>{q}</Chip>
        ))}
      </div>
      <div className="chat__composer">
        <input placeholder="Сообщение..." />
        <Button variant="dark">→</Button>
      </div>
    </div>
  );
}

export function NotificationsScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="Уведомления" onBack={() => go("profile")} large />
      <div className="notif-list">
        {notifications.map((n) => (
          <article key={n.title} className="card notif-row">
            <div className="notif-row__dot" />
            <div>
              <strong>{n.title}</strong>
              <p>{n.text}</p>
            </div>
            <span className="muted">{n.time}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ProfileScreen({ go }: { go: Nav }) {
  const rows: { label: string; id: ScreenId }[] = [
    { label: "Мои визиты", id: "visits" },
    { label: "План лечения", id: "treatment" },
    { label: "Документы", id: "documents" },
    { label: "Мои врачи", id: "doctors" },
    { label: "Платежи", id: "finance" },
    { label: "Бонусы", id: "loyalty" },
    { label: "Уведомления", id: "notifications" },
    { label: "Семья", id: "family" },
    { label: "Клиника", id: "clinic" },
  ];
  return (
    <div className="screen fade-in">
      <Header title="Профиль" large />
      <div className="profile-head">
        <Avatar initials="А" size={72} />
        <div>
          <h2>{user.name}</h2>
          <p className="muted">{user.phone}</p>
          <p className="muted">{user.email}</p>
          <p className="muted">{user.birthDate}</p>
        </div>
      </div>
      <div className="settings-list">
        {rows.map((r) => (
          <button key={r.id} type="button" className="text-row" onClick={() => go(r.id)}>
            <span>{r.label}</span><span>→</span>
          </button>
        ))}
        <button type="button" className="text-row" onClick={() => go("empty")}>
          <span>Empty states</span><span>→</span>
        </button>
      </div>
    </div>
  );
}

export function FamilyScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="Мои близкие" onBack={() => go("profile")} large />
      <p className="screen-subtitle">Переключайтесь между профилями семьи</p>
      <div className="family-list">
        {family.map((f) => (
          <button key={f.name} type="button" className={`card family-card${f.active ? " is-active" : ""}`}>
            <Avatar initials={f.name[0]} size={48} />
            <div>
              <strong>{f.name}</strong>
              <p className="muted">{f.relation}</p>
            </div>
            {f.active ? <span className="pill">Активен</span> : null}
          </button>
        ))}
      </div>
      <Button full variant="outline">Добавить родственника</Button>
    </div>
  );
}

export function ClinicScreen({ go }: { go: Nav }) {
  return (
    <div className="screen screen--flush fade-in">
      <div className="clinic-hero">
        <Header onBack={() => go("home")} />
      </div>
      <div className="clinic-page">
        <p className="eyebrow">Москва</p>
        <h2 className="screen-title">LUNA BIANCA</h2>
        <p className="screen-subtitle">{clinic.address}</p>
        <div className="meta-grid">
          <div><span>Часы работы</span><strong>{clinic.hours}</strong></div>
          <div><span>Телефон</span><strong>{clinic.phone}</strong></div>
        </div>
        <div className="sticky-actions" style={{ display: "grid", gap: 10 }}>
          <Button full>Построить маршрут</Button>
          <Button full variant="outline">Позвонить</Button>
        </div>
      </div>
    </div>
  );
}

export function EmptyStatesScreen({ go }: { go: Nav }) {
  const [i, setI] = useState(0);
  const states = [
    { title: "Нет записей", text: "Запишитесь на удобное время — мы подготовим всё к визиту." },
    { title: "Нет документов", text: "Снимки и договоры появятся здесь после приёма." },
    { title: "Нет бонусов", text: "Баллы начисляются после визитов и акций Private Client." },
    { title: "Нет сообщений", text: "Concierge-чат клиники всегда рядом, когда понадобится." },
    { title: "Нет плана лечения", text: "После диагностики врач составит персональный план." },
  ];
  return (
    <div className="screen fade-in">
      <Header title="Empty states" onBack={() => go("profile")} />
      <div className="chips-scroll">
        {states.map((s, idx) => (
          <Chip key={s.title} active={idx === i} onClick={() => setI(idx)}>{s.title}</Chip>
        ))}
      </div>
      <EmptyState title={states[i].title} text={states[i].text} action={<Button onClick={() => go("booking")}>Записаться</Button>} />
    </div>
  );
}

export function SuccessStatesScreen({ go }: { go: Nav }) {
  return (
    <div className="screen fade-in">
      <Header title="Статусы" onBack={() => go("home")} large />
      <div className="status-stack">
        <StatusBanner variant="success" title="Успешная запись" text="14 октября, 17:30 · Лиана Александровна" />
        <StatusBanner variant="success" title="Успешная оплата" text="Списано 9 500 ₽ · чек в документах" />
        <StatusBanner variant="info" title="Документ загружен" text="КТ верхней челюсти доступен в папке" />
        <StatusBanner variant="info" title="Запись отменена" text="Вы можете выбрать новое время в один клик" />
        <StatusBanner variant="error" title="Ошибка оплаты" text="Проверьте карту или попробуйте другой способ" />
        <StatusBanner variant="error" title="Нет свободных мест" text="Выберите другую дату или врача" />
      </div>
      <Button full onClick={() => go("home")}>На главную</Button>
    </div>
  );
}
