const UserDetailFormModel = require('./user-detail-form-model')
const UiType = require('../../ui/form-viewer-editor/ui-type')
const config = require('../../util/ajax/config')

module.exports = class UserDetailFormModelReviewing extends UserDetailFormModel {
	constructor (host) {
		super(host)
	}

	getNavigationBarTitle () {
		return '修改资料'
	}

	getVisibleNotification () {
		return true
	}

	getNotificationText () {
		return '资料审核中'
	}

	getDescriptors () {
		return [
			{
				fieldName: this.PERSONAL_PHOTO,
				uiType: UiType.PICTURE_UPLOAD_INPUT,
				label: '名片照',
				mandatory: true,
				value: '',
				disabled: true
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
				disabled: true,
				mandatory: true,
				placeholder: '请输入机构名'
			},
			{
				fieldName: this.REAL_NAME,
				uiType: UiType.TEXT_INPUT,
				label: '真实姓名',
				value: '',
				maxLength: 15,
				disabled: true,
				mandatory: true,
				placeholder: '请输入姓名'
			},
			{
				fieldName: this.QQ_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: 'QQ',
				value: '',
				type: 'number',
				maxLength: 11,
				disabled: true,
				mandatory: true,
				hasWarning: false,
				placeholder: '请输入QQ号'
			},
			{
				fieldName: this.DEPARTMENT_NAME,
				uiType: UiType.TEXT_INPUT,
				label: '所在部门',
				value: '',
				maxLength: 15,
				disabled: true,
				mandatory: false,
				placeholder: '请输入部门'
			},
			{
				fieldName: this.POSITION,
				uiType: UiType.TEXT_INPUT,
				label: '职位',
				value: '',
				maxLength: 15,
				disabled: true,
				mandatory: false,
				placeholder: '请输入职位'
			},
			{
				fieldName: this.DESK_PHONE_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: '座机号码',
				value: '',
				disabled: true,
				mandatory: false,
				placeholder: '请输入座机号'
			},
			{
				fieldName: this.COMPANY_EMAIL,
				uiType: UiType.TEXT_INPUT,
				label: '公司邮箱',
				value: '',
				disabled: true,
				mandatory: false,
				placeholder: '请输入公司邮箱'
			},
			{
				fieldName: this.TRADER_CERTIFICATE,
				uiType: UiType.PICTURE_UPLOAD_INPUT,
				label: '交易员资格证',
				mandatory: false,
				disabled: true,
				value: ''
			}
		]
	}

	getUrlConfig () {
		return config.USER_REGISTER.getUserInfoForEdit
	}

	getVisibleControlArea () {
		return false
	}

	getBasicValidators () {
		return {}
	}
	
	getAdvancedValidators () {
		return {
		}
	}

	doSubmit (submissionObject) {}
}