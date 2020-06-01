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

import navigation from '../components/navigation';

navigation();
window.navigation.init();