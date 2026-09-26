export type ScreenId =
  | "splash"
  | "onboarding"
  | "login"
  | "home"
  | "dentistry"
  | "teeth-map"
  | "cosmetology"
  | "procedure"
  | "doctors"
  | "doctor"
  | "booking"
  | "visits"
  | "treatment"
  | "documents"
  | "finance"
  | "loyalty"
  | "bonuses"
  | "chat"
  | "notifications"
  | "profile"
  | "family"
  | "clinic"
  | "empty"
  | "success";

export const SCREEN_LABELS: Record<ScreenId, string> = {
  splash: "Splash",
  onboarding: "Онбординг",
  login: "Вход",
  home: "Главная",
  dentistry: "Стоматология",
  "teeth-map": "Карта зубов",
  cosmetology: "Косметология",
  procedure: "Процедура",
  doctors: "Врачи",
  doctor: "Профиль врача",
  booking: "Запись",
  visits: "Визиты",
  treatment: "План лечения",
  documents: "Документы",
  finance: "Финансы",
  loyalty: "Private Client",
  bonuses: "Бонусы",
  chat: "Чат",
  notifications: "Уведомления",
  profile: "Профиль",
  family: "Семья",
  clinic: "Клиника",
  empty: "Empty states",
  success: "Success / Error",
};

export const user = {
  name: "Альберт",
  fullName: "Альберт Гилоян",
  phone: "+7 999 123-45-67",
  email: "martinjoycity@gmail.com",
  birthDate: "12.03.1994",
  bonuses: 1250,
};

export const clinic = {
  name: "LUNA BIANCA",
  tagline: "DENTAL & COSMETIC",
  city: "Москва",
  address: "Веерная ул., 22 к1",
  hours: "09:00 — 21:00",
  phone: "+7 (495) 120-45-67",
};

export const doctors = [
  {
    id: "liana",
    name: "Лиана Александровна",
    role: "Стоматолог-терапевт",
    experience: "12 лет",
    focus: "Эстетическая реставрация, эндодонтия",
    education: "МГМСУ им. А.И. Евдокимова",
    rating: 4.9,
    reviews: 128,
    available: ["14 окт", "16 окт", "18 окт"],
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop&q=80",
  },
  {
    id: "marina",
    name: "Марина Сергеевна",
    role: "Врач-косметолог",
    experience: "9 лет",
    focus: "Инъекционная и anti-age косметология",
    education: "РНИМУ им. Н.И. Пирогова",
    rating: 4.95,
    reviews: 96,
    available: ["15 окт", "17 окт", "21 окт"],
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=800&fit=crop&q=80",
  },
  {
    id: "igor",
    name: "Игорь Владимирович",
    role: "Хирург-имплантолог",
    experience: "15 лет",
    focus: "Имплантация, костная пластика",
    education: "Первый МГМУ им. И.М. Сеченова",
    rating: 4.8,
    reviews: 74,
    available: ["20 окт", "22 окт", "25 окт"],
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=800&fit=crop&q=80",
  },
];

export const dentalCategories = [
  "Консультация",
  "Диагностика",
  "Лечение",
  "Имплантация",
  "Ортодонтия",
  "Эстетическая стоматология",
  "Гигиена",
];

export const cosmetologyCategories = [
  "Инъекционная",
  "Аппаратная",
  "Уход за лицом",
  "Лазерная косметология",
  "Anti-Age",
  "Программы ухода",
];

export const procedures = [
  {
    id: "biorev",
    title: "Биоревитализация",
    category: "Инъекционная",
    description: "Глубокое увлажнение и восстановление плотности кожи",
    duration: "45 мин",
    price: "от 12 000 ₽",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed85f36?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "botox",
    title: "Ботулинотерапия",
    category: "Инъекционная",
    description: "Мягкая коррекция мимических морщин",
    duration: "30 мин",
    price: "от 15 000 ₽",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "laser",
    title: "Лазерное омоложение",
    category: "Лазерная косметология",
    description: "Стимуляция коллагена и выравнивание тона",
    duration: "60 мин",
    price: "от 18 000 ₽",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&q=80",
  },
];

export const visits = {
  upcoming: [
    {
      date: "26 сентября",
      time: "15:30",
      doctor: "Лиана Александровна",
      service: "Стоматолог-терапевт",
      status: "Подтверждён",
    },
    {
      date: "14 октября",
      time: "17:30",
      doctor: "Марина Сергеевна",
      service: "Биоревитализация",
      status: "Ожидает",
    },
  ],
  past: [
    {
      date: "12 августа",
      time: "11:00",
      doctor: "Лиана Александровна",
      service: "Профессиональная гигиена",
      status: "Завершён",
    },
    {
      date: "3 июля",
      time: "16:20",
      doctor: "Игорь Владимирович",
      service: "Консультация",
      status: "Завершён",
    },
  ],
};

export const treatmentPlan = {
  total: "185 000 ₽",
  paid: "75 000 ₽",
  remaining: "110 000 ₽",
  progress: 65,
  stages: [
    { title: "Диагностика", doctor: "Лиана Александровна", price: "8 000 ₽", status: "done", date: "3 июля" },
    { title: "Лечение", doctor: "Лиана Александровна", price: "67 000 ₽", status: "done", date: "12 авг" },
    { title: "Эстетическая реставрация", doctor: "Лиана Александровна", price: "85 000 ₽", status: "current", date: "26 сен" },
    { title: "Контроль", doctor: "Лиана Александровна", price: "25 000 ₽", status: "todo", date: "—" },
  ],
};

export const documents = [
  { title: "КТ верхней челюсти", date: "3 июля 2026", size: "12.4 МБ", type: "КТ" },
  { title: "Прицельный снимок 16", date: "12 авг 2026", size: "2.1 МБ", type: "Рентген" },
  { title: "План лечения №48", date: "12 авг 2026", size: "340 КБ", type: "План лечения" },
  { title: "Договор на услуги", date: "3 июля 2026", size: "1.2 МБ", type: "Договоры" },
  { title: "Чек — гигиена", date: "12 авг 2026", size: "180 КБ", type: "Чеки" },
];

export const payments = [
  { title: "Профессиональная гигиена", amount: "9 500 ₽", date: "12 авг" },
  { title: "Консультация", amount: "3 000 ₽", date: "3 июля" },
  { title: "Лечение", amount: "45 000 ₽", date: "12 авг" },
  { title: "Диагностика", amount: "8 000 ₽", date: "3 июля" },
];

export const notifications = [
  { type: "visit", title: "Напоминание о визите", text: "Завтра в 15:30 — Лиана Александровна", time: "1 ч" },
  { type: "doc", title: "Новый документ", text: "Добавлен снимок КТ", time: "Вчера" },
  { type: "plan", title: "Изменение плана лечения", text: "Этап «Реставрация» подтверждён", time: "2 дн" },
  { type: "chat", title: "Сообщение клиники", text: "Подготовка к приёму — рекомендации", time: "3 дн" },
  { type: "offer", title: "Персональное предложение", text: "−15% на биоревитализацию до 30 сен", time: "5 дн" },
];

export const family = [
  { name: "Альберт", relation: "Вы", active: true },
  { name: "Мария", relation: "Супруга", active: false },
  { name: "Артём", relation: "Ребёнок", active: false },
];

export const teethData: Record<number, { status: string; history: { label: string; done: boolean }[] }> = {
  16: {
    status: "Требует лечения",
    history: [
      { label: "Консультация", done: true },
      { label: "Диагностика", done: true },
      { label: "Лечение", done: false },
      { label: "Контроль", done: false },
    ],
  },
  11: {
    status: "Здоров",
    history: [
      { label: "Гигиена", done: true },
      { label: "Контроль", done: true },
    ],
  },
  26: {
    status: "В плане",
    history: [
      { label: "Консультация", done: true },
      { label: "Диагностика", done: false },
    ],
  },
};
