
export class ThemeSelector {

  constructor(conf = {}) {
    this.theme = 'system-theme';
    this.themeList = [
      { id: 'system-theme', name: 'Auto' },
      { id: 'light-theme', name: 'Light' },
      { id: 'dark-theme', name: 'Dark' },
    ];

    this.bindDOM(conf);
  }

  bindDOM({ id }) {
    id = id || 'site-theme-selector';

    this.select = document.getElementById(id);
    this.body = document.body;

    this.setDOMTheme(this.getStorageTheme());
    this.bindEvents();
  }

  bindEvents() {
    this.select.value = this.getTheme();
    this.select.addEventListener('change', () => {
      this.setTheme(this.select.value);
    });
  }

  setTheme(theme) {
    this.setDOMTheme(theme);
    this.setStorageTheme(theme);
  }

  setStorageTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  setDOMTheme(theme) {
    if (!theme) return;

    this.theme = theme;
    let themes = this.themeList.map(t => t.id);
    this.body.classList.remove(...themes);
    this.body.classList.add(theme);
  }

  getTheme() {
    this.theme = this.getStorageTheme() || this.getDOMTheme();
    return this.theme;
  }

  getStorageTheme() {
    let storageTheme = localStorage.getItem('theme');
    for (let theme of this.themeList) {
      if (theme.id == storageTheme) {
        return theme.id;
      }
    }
    return '';
  }

  getDOMTheme() {
    let classes = this.body.classList;

    for (let theme of this.themeList) {
      if (classes.contains(theme.id)) {
        return theme.id;
      }
    }
    return '';
  }
}