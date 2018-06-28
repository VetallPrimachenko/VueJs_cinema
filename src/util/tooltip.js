import { addClass, removeClass } from './helpers';

let mouseOverHandler = function(event) {
	let span = event.target.parentNode.getElementsByTagName("SPAN")[0];

	addClass(span, 'tooltip-show')
};

let mouseOutHandler = function() {
	let span = event.target.parentNode.getElementsByTagName("SPAN")[0];
	removeClass(span, 'tooltip-show')
};

export default {
	install(Vue) {
		Vue.directive('tooltip', {
			bind(el, binding) {
				let span = document.createElement('SPAN'),
					text = document.createTextNode(`Seats available: ${binding.value.seats}`);

				span.appendChild(text);
				addClass(span, 'tooltip');
				el.appendChild(span)

				let div = el.getElementsByTagName('DIV')[0];
				div.addEventListener('mouseover', mouseOverHandler);
				div.addEventListener('mouseout', mouseOutHandler);
				div.addEventListener('touchstart', mouseOverHandler);
				div.addEventListener('toushend', mouseOutHandler);
			},
			unbind(el) {
				let div = el.getElementsByTagName('DIV')[0];
				div.removeEventListener('mouseover', mouseOverHandler);
				div.removeEventListener('mouseout', mouseOutHandler);
				div.removeEventListener('touchstart', mouseOverHandler);
				div.removeEventListener('toushend', mouseOutHandler);
			}
		});
	}
}