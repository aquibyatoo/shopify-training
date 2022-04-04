import 'Styles/templates/index.scss';

document.addEventListener('click', async() => {
    const module = await import(/* webpackChunkName: "print" */ '../components/print')
    const print = module.default;
    print();
});