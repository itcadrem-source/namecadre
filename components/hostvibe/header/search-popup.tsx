"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type HostvibeSearchPopupProps = {
  open: boolean;
  query: string;
  placeholder?: string;
  trendingSearches: string[];
  recentSearches: string[];
  onClose: () => void;
  onSearch: (query: string) => void;
  onQueryChange: (query: string) => void;
};

export default function HostvibeSearchPopup({
  open,
  query,
  placeholder = "Search for anything...",
  trendingSearches,
  recentSearches,
  onClose,
  onSearch,
  onQueryChange,
}: HostvibeSearchPopupProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkTheme(document.body.classList.contains("hvx-theme-dark"));
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    const all = [...trendingSearches, ...recentSearches];
    return all.filter((item) => item.toLowerCase().includes(value));
  }, [query, recentSearches, trendingSearches]);

  const popupThemeVars = isDarkTheme
    ? ({
        "--sp-bg": "#0f172a",
        "--sp-border": "rgba(148, 163, 184, 0.3)",
        "--sp-text": "#e2e8f0",
        "--sp-muted": "#94a3b8",
        "--sp-strong-muted": "#cbd5e1",
        "--sp-row-hover": "rgba(30, 41, 59, 0.8)",
        "--sp-footer-bg": "rgba(15, 23, 42, 0.85)",
        "--sp-kbd-bg": "rgba(15, 23, 42, 0.95)",
      } as React.CSSProperties)
    : ({
        "--sp-bg": "#ffffff",
        "--sp-border": "rgba(148, 163, 184, 0.35)",
        "--sp-text": "#0f172a",
        "--sp-muted": "#64748b",
        "--sp-strong-muted": "#475569",
        "--sp-row-hover": "rgba(241, 245, 249, 0.9)",
        "--sp-footer-bg": "rgba(248, 250, 252, 0.85)",
        "--sp-kbd-bg": "#ffffff",
      } as React.CSSProperties);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1650] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-[10%] z-[1651] w-[95%] max-w-2xl -translate-x-1/2"
          >
            <div
              style={popupThemeVars}
              className="overflow-hidden rounded-xl border border-[color:var(--sp-border)] bg-[var(--sp-bg)] shadow-2xl"
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onSearch(query);
                }}
                className="relative"
              >
                <div className="flex items-center gap-3 border-b border-[color:var(--sp-border)] px-4 py-4">
                  <i className="far fa-search w-5 text-center text-[var(--sp-muted)]" />
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent text-base text-[var(--sp-text)] outline-none placeholder:text-[var(--sp-muted)]"
                  />
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-[var(--sp-muted)] transition-colors hover:bg-[var(--sp-row-hover)]"
                  >
                    <i className="far fa-times" />
                  </button>
                </div>
              </form>

              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() && suggestions.length > 0 ? (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--sp-muted)]">
                      Suggestions
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        type="button"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSearch(suggestion)}
                        className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[var(--sp-row-hover)]"
                      >
                        <i className="far fa-search w-4 text-center text-[var(--sp-muted)] transition-colors group-hover:text-[var(--hv-brand)]" />
                        <span className="text-sm text-[var(--sp-text)]">{suggestion}</span>
                      </motion.button>
                    ))}
                  </div>
                ) : !query.trim() ? (
                  <div className="p-2">
                    {recentSearches.length > 0 ? (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--sp-muted)]">
                          <i className="far fa-clock w-3 text-center" />
                          Recent
                        </div>
                        {recentSearches.map((item, index) => (
                          <motion.button
                            key={item}
                            type="button"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => onSearch(item)}
                            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[var(--sp-row-hover)]"
                          >
                            <i className="far fa-clock w-4 text-center text-[var(--sp-muted)] transition-colors group-hover:text-[var(--hv-brand)]" />
                            <span className="text-sm text-[var(--sp-text)]">{item}</span>
                          </motion.button>
                        ))}
                      </div>
                    ) : null}

                    <div>
                      <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--sp-muted)]">
                        <i className="far fa-chart-line w-3 text-center" />
                        Trending
                      </div>
                      {trendingSearches.map((item, index) => (
                        <motion.button
                          key={item}
                          type="button"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (recentSearches.length + index) * 0.05 }}
                          onClick={() => onSearch(item)}
                          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[var(--sp-row-hover)]"
                        >
                          <i className="far fa-chart-line w-4 text-center text-[var(--sp-muted)] transition-colors group-hover:text-[var(--hv-brand)]" />
                          <span className="text-sm text-[var(--sp-text)]">{item}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-[var(--sp-strong-muted)]">No results found</p>
                  </div>
                )}
              </div>

              <div className="border-t border-[color:var(--sp-border)] bg-[var(--sp-footer-bg)] px-4 py-3">
                <div className="flex items-center justify-between text-xs text-[var(--sp-strong-muted)]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-[color:var(--sp-border)] bg-[var(--sp-kbd-bg)] px-1.5 py-0.5">↵</kbd>
                      to select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-[color:var(--sp-border)] bg-[var(--sp-kbd-bg)] px-1.5 py-0.5">esc</kbd>
                      to close
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
