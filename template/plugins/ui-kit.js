import Vue from 'vue';
/**
 * Import all components or 
 */
import * as uikit from 'icex-landing-uikit';
Object.keys(uikit).forEach((comp) => Vue.component(`${comp}`, uikit[comp]));

/**
 * Just what you need
 */

// import { uiFooter, uiIcon, uiHeader, uiSection, uiSlider, uiSocials } from 'icex-landing-uikit';

// Vue.component('uiFooter', uiFooter);
// Vue.component('uiIcon', uiIcon);
// Vue.component('uiHeader', uiHeader);
// Vue.component('uiSection', uiSection);
// Vue.component('uiSlider', uiSlider);
// Vue.component('uiSocials', uiSocials);