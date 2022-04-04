import { createApp } from 'vue'
import transformProps from "./transformProps";

export default (parentComponent,el,propsEl = null) => {
  const props =  transformProps(propsEl);
  const options = {
    el,
    data(){ return props},
    components: {
      parentComponent
    },
    template: `<parent-component/>`
  }
  const app = createApp(options);
  app.mount(el);
  return app;
}