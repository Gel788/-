import type { CSSProperties, ReactNode } from "react";
import "./ui.css";

type BtnVariant = "primary" | "secondary" | "ghost" | "dark" | "outline";

export function Button({
  children,
  variant = "primary",
  full,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  full?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`lb-btn lb-btn--${variant}${full ? " lb-btn--full" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function IconButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button type="button" className="lb-icon-btn" onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}

export function Header({
  title,
  onBack,
  right,
  large,
}: {
  title?: string;
  onBack?: () => void;
  right?: ReactNode;
  large?: boolean;
}) {
  return (
    <header className={`lb-header${large ? " lb-header--large" : ""}`}>
      <div className="lb-header__row">
        {onBack ? (
          <IconButton label="Назад" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </IconButton>
        ) : (
          <span className="lb-header__spacer" />
        )}
        {title && !large ? <h1 className="lb-header__title">{title}</h1> : <span />}
        <div className="lb-header__right">{right ?? <span className="lb-header__spacer" />}</div>
      </div>
      {large && title ? <h1 className="screen-title" style={{ marginTop: 8 }}>{title}</h1> : null}
    </header>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="lb-progress">
      {label ? (
        <div className="lb-progress__meta">
          <span>{label}</span>
          <strong>{value}%</strong>
        </div>
      ) : null}
      <div className="lb-progress__track">
        <div className="lb-progress__fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function Chip({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={`lb-chip${active ? " is-active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

export function Field({
  label,
  placeholder,
  type = "text",
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="lb-field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="lb-empty">
      <div className="lb-empty__moon" aria-hidden />
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}

export function StatusBanner({
  variant,
  title,
  text,
}: {
  variant: "success" | "error" | "info";
  title: string;
  text: string;
}) {
  return (
    <div className={`lb-status lb-status--${variant}`}>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

export function Avatar({
  src,
  initials,
  size = 40,
}: {
  src?: string;
  initials?: string;
  size?: number;
}) {
  const style = { "--size": `${size}px` } as CSSProperties;
  if (src) {
    return <img className="lb-avatar" src={src} alt="" style={style} />;
  }
  return (
    <div className="lb-avatar lb-avatar--fallback" style={style}>
      {initials ?? "А"}
    </div>
  );
}

export function BottomSheet({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="lb-sheet" role="dialog">
      <button type="button" className="lb-sheet__backdrop" aria-label="Закрыть" onClick={onClose} />
      <div className="lb-sheet__panel fade-in">
        <div className="lb-sheet__handle" />
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}
