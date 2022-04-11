import 'Styles/templates/index.scss';
import mobileNavigation from '../components/mobile-navigation';

import {test} from '../vue/Test/test';
test();
console.log("blah blah")

document.addEventListener('click', async() => {
    const module = await import(/* webpackChunkName: "print" */ '../components/print');
    const print = module.default;
    print();
});
mobileNavigation();