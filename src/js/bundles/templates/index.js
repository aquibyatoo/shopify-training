import 'Styles/templates/index.scss';
import {Test} from '../vue/vue-entry';
document.addEventListener('click', async() => {
    const module = await import(/* webpackChunkName: "print" */ '../components/print')
    const print = module.default;
    print();
});
Test();