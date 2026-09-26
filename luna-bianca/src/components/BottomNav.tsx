import type { ReactNode } from "react";
import type { ScreenId } from "../data/content";

const items: { id: ScreenId; label: string; icon: ReactNode }[] = [
  {
    id: "home",
    label: "Главная",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 10.5L12 4L20 10.5V20H14.5V14.5H9.5V20H4V10.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "booking",
    label: "Запись",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 8V12L15 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "visits",
    label: "Визиты",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 3.5V6.5M16 3.5V6.5M4 10H20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "documents",
    label: "Документы",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M7 4H14L18 8V20H7V4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M14 4V8H18M9.5 12H14.5M9.5 15.5H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Профиль",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 19C6.8 15.8 9 14 12 14C15 14 17.2 15.8 18 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function BottomNav({
  active,
  onNavigate,
}: {
  active: ScreenId;
  onNavigate: (id: ScreenId) => void;
}) {
  const tabScreens = new Set(items.map((i) => i.id));
  const current = tabScreens.has(active) ? active : "home";

  return (
    <nav className="bottom-nav" aria-label="Навигация">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={current === item.id ? "is-active" : undefined}
          onClick={() => onNavigate(item.id)}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
