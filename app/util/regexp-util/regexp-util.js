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

	isValidationCode: function (value) {
		return /^\d{4}$/.test(value)
	}
}
