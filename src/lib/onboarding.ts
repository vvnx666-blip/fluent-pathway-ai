export interface OnboardingState {
  ready?: "yes" | "not-yet";
  tested?: "yes" | "no";
  targetBand?: string;
  examWindow?: string;
  reportUnlocked?: boolean;
  homeIntroSeen?: boolean;
  done?: boolean;
}

const KEY = "sl.onboarding";

export function readOnboarding(): OnboardingState {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as OnboardingState;
  } catch {
    return {};
  }
}

export function writeOnboarding(patch: OnboardingState) {
  if (typeof window === "undefined") return;
  const next = { ...readOnboarding(), ...patch };
  window.localStorage.setItem(KEY, JSON.stringify(next));
}
