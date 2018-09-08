import Vue from 'vue';

Vue.component('greeting-component', {
    template: '<h2>Hi from VueJS!</h2>'
});

const app = new Vue({
  el: '#page',
  template: '<greeting-component />',
});
