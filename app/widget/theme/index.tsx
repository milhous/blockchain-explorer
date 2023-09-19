'use client';

import {useEffect} from 'react';

import Assets from '@assets/index';

import './index.scss';

const updateTheme = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark');

    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');

    localStorage.theme = 'light';
  }
};

// Widget - Theme
export default function WidgetTheme() {
  const handleMode = (type: string) => {
    const classList = document.documentElement.classList;
    const isDark = type === 'dark' && !classList.contains('dark');

    updateTheme(isDark);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const isDark =
      theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    updateTheme(isDark);
  }, []);

  return (
    <div className="widget-theme">
      <button className="btn-light" onClick={() => handleMode('light')}>
        <Assets.IconSun />
      </button>
      <button className="btn-dark" onClick={() => handleMode('dark')}>
        <Assets.IconMoon />
      </button>
    </div>
  );
}
