module.exports = {
	isPhoneNumber: function (value) {
		return /^1[3|4|5|7|8]\d{9}$/.test(value)
	},

	isEmail: function (value) {
		return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(value)
	},

	isQQNumber: function (value) {
		return /^[1-9]\d{4,11}$/.test(value)
	},

	isDeskPhoneNumber (value) {
		return /^(0\d{2,3}-\d{7,8})$/.test(value)
	},

	isValidationCode: function (value) {
		return /^\d{4}$/.test(value)
	},

	hasEmoji: function (s) {
		return /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g.test(s)
	},

	isRating: function (value) {
		return /^[a-zA-Z]{1,3}[+-]?$/.test(value)
	},

	isPublishDeadline: function (value) {
		return /(^[1-9]{1}[0-9]{0,4}([.]+[0-9]{1,2})?)([dymDYM]{1}$)|([dymDYM]{1}[+]{1}[a-zA-Z]$)|([dymDYM]{1}[+]{1}[1-9]{1}[0-9]{0,4}([.]+[0-9]{1,2})?[dymDYM]{1}$)/.test(value)
	},

	isBenifitNumber: function (value) {
		return /^\d{0,2}(\.\d{0,4})?$/g.test(value)
	},

	isIssueTotal: function (value) {
		return /^\d{0,5}(\.\d{0,4})?$/g.test(value)
	}
}
