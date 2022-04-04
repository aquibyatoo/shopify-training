import vueWrapper from "../utils/vue-wrapper"

//import vue here

//Test Component
import testComponent from '../vue/Test/testComponent.vue';


export const Test = ( () => vueWrapper(testComponent, "Test"));
