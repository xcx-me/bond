

module.exports = class UserDetailFormModel {
	constructor (host) {
		this.host = host

		this.PERSONAL_PHOTO = 'personalPhoto'
		this.AGENCY_NAME = 'agencyName'
		this.REAL_NAME = 'realName'
		this.QQ_NUMBER = 'qqNumber'
		this.DEPARTMENT_NAME = 'departmentName'
		this.POSITION = 'position'
		this.DESK_PHONE_NUMBER = 'deskPhoneNumber'
		this.COMPANY_EMAIL = 'companyEmail'
		this.TRADER_CERTIFICATE = 'traderCertificate'
	}

	getVisibleControlArea () {
		return true
	}
}