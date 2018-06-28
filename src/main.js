import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';

Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import {checkFilter, setDay} from './util/bus.js';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus} });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes'
const router = new VueRouter({routes});

import Tooltip from './util/tooltip';
Vue.use(Tooltip);

new Vue({
	el: '#app',
	data: {
		genre: [],
		time: [],
		movies: '',
		moment,
		day: moment(),
		bus
	},
	methods: {
		checkFilter(category, title, checked) {
			if (checked) {
				this[category].push(title);
			} else {
				let index = this[category].indexOf(title);
				console.log(index)
				if (index > -1) {
					this[category].splice(index, 1);
				}
			}
		}
	},
	created() {
		this.$http.get('/api').then(response => {
			this.movies = response.data;
		});

		this.$bus.$on('check-filter', this.checkFilter);
		this.$bus.$on('set-day', setDay.bind(this))
	},
	router
});
