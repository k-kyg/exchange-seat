import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement!);
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
	return new MDCRipple(el);
});


const columnField = new MDCTextField(document.querySelector('.columnField')!);
const rowField = new MDCTextField(document.querySelector('.rowField')!);
