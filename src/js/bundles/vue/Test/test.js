import Vue from 'vue';
import Test from './TestComponent.vue'
export const test = () => {
  const vm = new Vue({
    el: 'Test',
    components: {
      Test
    },
    template: '<test/>'
  })
  return vm;
}