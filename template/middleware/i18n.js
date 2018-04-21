export default function ({
  isHMR, app, store, route, params, redirect, error,
}) {
  if (isHMR) return;
  /**
   * Current locale
   * @type {String}
   */
  let locale = params.lang || 'en';

  console.log(locale);
  /**
   * Validate locale
   * @param  {String} [check locale in locales Object]
   * @return error msg
   */
  if (!(locale in store.state.common.locales)) {
    // eslint-disable-next-line
    return error({ message: 'This page could not be found.', statusCode: 404 });
  }

  /**
   * Check if korean locale
   * @type {Boolean}
   */
  const hasKo = route.fullPath.indexOf('ko');
  /**
   * If it is Korean locale redirect to English 
   * @param  {Boolean} 
   * @return {Event} redirect to new path
   */
  if (hasKo) {
    locale = 'en';
    const newPath = route.fullPath.replace('ko/', 'en/');
    redirect(newPath);
  }

  /**
   * Set current locale
   */
  store.dispatch('common/setUserLocale', locale);
  app.i18n.locale = locale;

  if (route.fullPath === '/') {
    redirect(`/${locale}`);
  }
}
