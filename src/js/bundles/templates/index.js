import 'Styles/templates/index.scss';
import mobileNavigation from '../components/mobile-navigation';

import {test} from '../vue/Test/test';
test();
mobileNavigation();
console.log("new consoles");


document.addEventListener('click', async() => {
    const module = await import(/* webpackChunkName: "print" */ '../components/print');
    const print = module.default;
    print();
});
