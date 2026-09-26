import { useMemo, useState } from "react";
import "./styles/global.css";
import { BottomNav } from "./components/BottomNav";
import { SCREEN_LABELS, type ScreenId } from "./data/content";
import {
  BonusesScreen,
  BookingScreen,
  ChatScreen,
  ClinicScreen,
  CosmetologyScreen,
  DentistryScreen,
  DoctorScreen,
  DoctorsScreen,
  DocumentsScreen,
  EmptyStatesScreen,
  FamilyScreen,
  FinanceScreen,
  HomeScreen,
  LoginScreen,
  LoyaltyScreen,
  NotificationsScreen,
  OnboardingScreen,
  ProcedureScreen,
  ProfileScreen,
  SplashScreen,
  SuccessStatesScreen,
  TeethMapScreen,
  TreatmentScreen,
  VisitsScreen,
} from "./screens/Screens";

const TAB_SCREENS = new Set<ScreenId>(["home", "booking", "visits", "documents", "profile"]);

const SHOWCASE: ScreenId[] = [
  "splash",
  "onboarding",
  "login",
  "home",
  "dentistry",
  "teeth-map",
  "cosmetology",
  "procedure",
  "doctors",
  "doctor",
  "booking",
  "visits",
  "treatment",
  "documents",
  "finance",
  "loyalty",
  "bonuses",
  "chat",
  "notifications",
  "profile",
  "family",
  "clinic",
  "empty",
  "success",
];

export default function App() {
  const [screen, setScreen] = useState<ScreenId>("splash");

  const showNav = useMemo(() => TAB_SCREENS.has(screen) || ["treatment", "dentistry", "cosmetology", "chat", "teeth-map", "doctors"].includes(screen), [screen]);

  const go = (id: ScreenId) => setScreen(id);

  const content = (() => {
    switch (screen) {
      case "splash":
        return <SplashScreen onDone={() => go("onboarding")} />;
      case "onboarding":
        return <OnboardingScreen onContinue={() => go("login")} />;
      case "login":
        return <LoginScreen onSuccess={() => go("home")} />;
      case "home":
        return <HomeScreen go={go} />;
      case "dentistry":
        return <DentistryScreen go={go} />;
      case "teeth-map":
        return <TeethMapScreen go={go} />;
      case "cosmetology":
        return <CosmetologyScreen go={go} />;
      case "procedure":
        return <ProcedureScreen go={go} />;
      case "doctors":
        return <DoctorsScreen go={go} />;
      case "doctor":
        return <DoctorScreen go={go} />;
      case "booking":
        return <BookingScreen go={go} />;
      case "visits":
        return <VisitsScreen go={go} />;
      case "treatment":
        return <TreatmentScreen go={go} />;
      case "documents":
        return <DocumentsScreen go={go} />;
      case "finance":
        return <FinanceScreen go={go} />;
      case "loyalty":
        return <LoyaltyScreen go={go} />;
      case "bonuses":
        return <BonusesScreen go={go} />;
      case "chat":
        return <ChatScreen go={go} />;
      case "notifications":
        return <NotificationsScreen go={go} />;
      case "profile":
        return <ProfileScreen go={go} />;
      case "family":
        return <FamilyScreen go={go} />;
      case "clinic":
        return <ClinicScreen go={go} />;
      case "empty":
        return <EmptyStatesScreen go={go} />;
      case "success":
        return <SuccessStatesScreen go={go} />;
      default:
        return <HomeScreen go={go} />;
    }
  })();

  return (
    <div className="app-shell">
      <div className="app-shell__meta">
        <h1>Luna Bianca</h1>
        <p>Dental & Cosmetic · UI Kit</p>
        <p className="app-shell__hint">Интерактивный прототип · iPhone · 24 экрана</p>
      </div>

      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__status">
          <span>9:41</span>
          <div className="phone__status-icons" aria-hidden>
            <span>●●●</span>
            <span>WLAN</span>
            <span>▮</span>
          </div>
        </div>
        <div className="phone__content">
          {content}
          {showNav ? <BottomNav active={screen} onNavigate={go} /> : null}
        </div>
      </div>

      <div className="showcase-switcher" aria-label="Экраны прототипа">
        {SHOWCASE.map((id) => (
          <button
            key={id}
            type="button"
            className={screen === id ? "is-active" : undefined}
            onClick={() => go(id)}
          >
            {SCREEN_LABELS[id]}
          </button>
        ))}
      </div>
    </div>
  );
}
