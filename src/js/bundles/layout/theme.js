/*
 * Basic file with global javascripts.
 * Files imported here will be available on every page.
 */

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import 'Styles/layout/theme.scss';

import mobileNavigation from '../components/mobile-navigation';
import headerSearch from '../components/header-search';
import ajaxSearch from '../components/ajax-search';

mobileNavigation()
headerSearch()
ajaxSearch()

window.headerSearch.init();
window.mobileNavigation.init();
window.ajaxSearch.init();