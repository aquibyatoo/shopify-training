import { createApp } from 'vue'

const transformProps = (propsEl) => {
  const propsJsonEl = propsEl && document.querySelector(propsEl);
  let props = {};
  if(propsJsonEl) {
    const jsonData = propsJsonEl.innerHTML;
    props = JSON.parse(jsonData);
  }
  console.log(props);
  return props;
}


export default (parentComponent = null,el = null,propsEl = null) => {
  //parentComponent = parent vue component
  //el = element where you want render your component
  //propsEl = class or id of script from which contains json data (props) for your component
  if(!parentComponent || !el) {
    console.error("Check vue-wrapper.js file , parentComponent and element required to create vue instance");
    return;
  }
  const propData =  transformProps(propsEl);
  const options = {
    el,
    data(){ return {propData}},
    components: {
      parentComponent
    },
    template: `<parent-component :data="propData" />`
  }
  const app = createApp(options);
  app.config.devtools = true
  app.mount(el);
  return app;
}