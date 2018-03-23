export default function ({
  isHMR, app, store, route, params, redirect, error,
}) {
  if (isHMR) return;
  const locale = params.lang || 'en';

  if (!(locale in store.state.common.glossary.locales)) {
    // eslint-disable-next-line
    return error({ message: 'This page could not be found.', statusCode: 404 });
  }

  console.log(locale);

  store.dispatch('common/setUserLocale', locale);
  app.i18n.locale = locale;

  const hasKo = route.fullPath.indexOf('ko/');

  if (hasKo !== -1) {
    const newPath = route.fullPath.replace('ko/', 'en/');
    redirect(newPath);
  }

  if (route.fullPath === '/') {
    redirect(`/${locale}`);
  }
}
