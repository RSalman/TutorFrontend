import I18n from 'react-native-i18n';

import en from './locales/en';
import fr from './locales/fr';

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr
};

global.I18n = I18n;
