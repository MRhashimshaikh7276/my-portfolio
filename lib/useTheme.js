"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
let listeners = [];

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
  };
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot() {
  return "dark";
}

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
    notify();
  }, []);

  return { theme, toggleTheme };
}
