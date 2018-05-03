const UserDetailFormModel = require('./user-detail-form-model')
const UiType = require('../../ui/form-viewer-editor/ui-type')
const config = require('../../util/ajax/config')
const { request } = require('../../util/ajax/ajax')
const RegexpUtil = require('../../util/regexp-util/regexp-util')
const StringUtil = require('../../util/string-util/string-util')

module.exports = class UserDetailFormModelCreate extends UserDetailFormModel {
	constructor (host) {
		super(host)
	}

	getNavigationBarTitle () {
		return '填写资料'
	}

	getVisibleNotification () {
		return false
	}

	getNotificationText () {
		return ''
	}

	getDescriptors () {
		return [
			{
				fieldName: this.PERSONAL_PHOTO,
				uiType: UiType.PICTURE_UPLOAD_INPUT,
				label: '名片照',
				mandatory: true,
				value: ''
			},
			{
				fieldName: this.AGENCY_NAME,
				uiType: UiType.AUTO_COMPLETE_TEXT_INPUT,
				label: '机构名',
				value: {
					text: '',
					agencyName: '',
					agencyId: ''
				},
				mandatory: true,
				placeholder: '请输入机构名'
			},
			{
				fieldName: this.REAL_NAME,
				uiType: UiType.TEXT_INPUT,
				label: '真实姓名',
				value: '',
				mandatory: true,
				placeholder: '请输入姓名'
			},
			{
				fieldName: this.QQ_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: 'QQ',
				value: '555',
				mandatory: true,
				hasWarning: false,
				placeholder: '请输入QQ号'
			},
			{
				fieldName: this.DEPARTMENT_NAME,
				uiType: UiType.TEXT_INPUT,
				label: '所在部门',
				value: '',
				mandatory: false,
				placeholder: '请输入部门'
			},
			{
				fieldName: this.POSITION,
				uiType: UiType.TEXT_INPUT,
				label: '职位',
				value: '',
				mandatory: false,
				placeholder: '请输入职位'
			},
			{
				fieldName: this.DESK_PHONE_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: '座机号码',
				value: '',
				mandatory: false,
				placeholder: '请输入座机号'
			},
			{
				fieldName: this.COMPANY_EMAIL,
				uiType: UiType.TEXT_INPUT,
				label: '公司邮箱',
				value: '',
				mandatory: false,
				placeholder: '请输入公司邮箱'
			},
			{
				fieldName: this.TRADER_CERTIFICATE,
				uiType: UiType.PICTURE_UPLOAD_INPUT,
				label: '交易员资格证',
				mandatory: false,
				value: ''
			}
		]
	}

	getUrlConfig () {
		return config.USER_REGISTER.getUserInfo
	}

	getBasicValidators () {
		return {
			[this.PERSONAL_PHOTO]: (value) => {
				return !StringUtil.isNullOrEmpty(value)
			},
			[this.AGENCY_NAME]: (value) => {
				return !StringUtil.isNullOrEmpty(value.agencyId)
			},
			[this.REAL_NAME]: (value) => {
				return !StringUtil.isNullOrEmpty(value)
			},
			[this.QQ_NUMBER]: (value) => {
				return !StringUtil.isNullOrEmpty(value)
			}
		}
	}

	getAdvancedValidators () {
		return {
			[this.QQ_NUMBER]: (value) => {
				return RegexpUtil.isQQNumber(value)
			},
			[this.DESK_PHONE_NUMBER]: (value) => {
				return StringUtil.isNullOrEmpty(value) || RegexpUtil.isDeskPhoneNumber(value)
			}
		}
	}

	doSubmit (submissionObject) {
		request(config.USER_REGISTER.submitUserInfo, {
			real_name: submissionObject.realName,
			qq: submissionObject.qqNumber,
			company: submissionObject.agencyName.agencyId,
			position: submissionObject.position,
			phone: submissionObject.deskPhoneNumber,
			department: submissionObject.departmentName,
			email: submissionObject.companyEmail,
			card_url: submissionObject.personalPhoto,
			certificate: submissionObject.traderCertificate
		}).then((result) => {
			wx.redirectTo({url: '../email-validation-form/email-validation-form'})
		})
	}
}