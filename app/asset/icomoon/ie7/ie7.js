/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-calendar': '&#xe934;',
		'icon-hand-shake': '&#xe935;',
		'icon-line-chart': '&#xe936;',
		'icon-clock': '&#xe937;',
		'icon-detail': '&#xe938;',
		'icon-logo-of-q': '&#xe910;',
		'icon-basic-calendar': '&#xe93e;',
		'icon-answer-it': '&#xe93c;',
		'icon-back-arrow': '&#xe93d;',
		'icon-contact-tim': '&#xe93f;',
		'icon-edit-it': '&#xe940;',
		'icon-hot': '&#xe941;',
		'icon-hotter': '&#xe942;',
		'icon-hottest': '&#xe943;',
		'icon-said-good': '&#xe944;',
		'icon-share-to': '&#xe945;',
		'icon-store': '&#xe946;',
		'icon-to-say-good': '&#xe947;',
		'icon-up-arrow': '&#xe93b;',
		'icon-administration-delete': '&#xe93a;',
		'icon-management-intention': '&#xe939;',
		'icon-qq-shape': '&#xe90f;',
		'icon-plus-with-circle': '&#xe91c;',
		'icon-pending-deal': '&#xe92e;',
		'icon-less-than': '&#xe900;',
		'icon-great-than': '&#xe901;',
		'icon-excalmatory': '&#xe902;',
		'icon-download': '&#xe903;',
		'icon-detail-text': '&#xe904;',
		'icon-up-rectangle': '&#xe905;',
		'icon-down-rectangle': '&#xe906;',
		'icon-original-text': '&#xe907;',
		'icon-collapse': '&#xe908;',
		'icon-expand': '&#xe909;',
		'icon-maximize': '&#xe90a;',
		'icon-minimize': '&#xe90b;',
		'icon-correct': '&#xe90c;',
		'icon-show-more': '&#xe90d;',
		'icon-sort': '&#xe90e;',
		'icon-search': '&#xe912;',
		'icon-export': '&#xe913;',
		'icon-logo-with-square': '&#xe914;',
		'icon-activity': '&#xe916;',
		'icon-question-medium': '&#xe917;',
		'icon-system-notification': '&#xe918;',
		'icon-contact-book': '&#xe919;',
		'icon-attachment': '&#xe91a;',
		'icon-delete': '&#xe91b;',
		'icon-right-arrow': '&#xe91d;',
		'icon-down-arrow': '&#xe91e;',
		'icon-checkout-0': '&#xe91f;',
		'icon-checkout-2': '&#xe920;',
		'icon-checkout-1': '&#xe921;',
		'icon-person-individual': '&#xe922;',
		'icon-people-group': '&#xe925;',
		'icon-question-small': '&#xe927;',
		'icon-conversation-delete': '&#xe928;',
		'icon-history-record': '&#xe929;',
		'icon-unchecked-radio': '&#xe92a;',
		'icon-checked-radio': '&#xe92b;',
		'icon-chat-mode': '&#xe92c;',
		'icon-close': '&#xe92d;',
		'icon-complete': '&#xe92f;',
		'icon-on-sell': '&#xe930;',
		'icon-direction-in': '&#xe931;',
		'icon-direction-out': '&#xe932;',
		'icon-chat-message': '&#xe933;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
