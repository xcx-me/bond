const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const AutoCompleteTextInputUtil = require('./auto-complete-text-input-util')

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		fieldName: {
			type: String,
			value: ''
		},
		value: {
			type: Object,
			value: {
				text: '',
				agencyName: '',
				agencyId: ''
			}
		},
		label: {
			type: String,
			value: ''
		},
		placeholder: {
			type: String,
			value: ''
		},
		maxLength: {
			type: Number,
			value: -1
		},
		type: {
			type: String,
			value: 'text'
		},
		hasWarning: {
			type: Boolean,
			value: false
		},
		mandatory: {
			type: Boolean,
			value: false
		},
		disabled: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		ascNameListOpen: false,
		simpleNameList: [],
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleInputChange: function (e) {
			this.setData({
				ascNameListOpen: false
			})

			let currentTime = new Date().getTime()
			this.timeStamp_ = currentTime
			setTimeout(() => {
				if (this.timeStamp_ - currentTime === 0) {
					this.bondSimpleNameAssociate(e.detail.value) // 债券简称列表联想
				}
			}, 1000)

			this.triggerEvent('change', {
				fieldName: this.properties.fieldName,
				value: {
					text: e.detail.value,
					agencyName: '',
					agencyId: ''
				}
			})
		},

		// TODO: please rename these methods.
		bondSimpleNameAssociate: function (curName) {
			let host = this
			request(config.USER_REGISTER.getAgencyList, {key_word: curName}).then((result) => {
				host.matchedList = result.org_list
				if (curName !=='' && host.matchedList.length > 0) {
					let nameArray = AutoCompleteTextInputUtil.parseAssociateBondSimpleName(curName, host.matchedList, 'name')
					this.setData({
						ascNameListOpen: true,
						simpleNameList: nameArray
					})
					this.triggerEvent('changeFixedPageScroll', true, {
						bubbles: true,
						composed: true
					})
				} else {
					this.setData({
						ascNameListOpen: false,
						simpleNameList: []
					})
					this.triggerEvent('changeFixedPageScroll', false, {
						bubbles: true,
						composed: true
					})
				}
			})
		},

		_selectAssociateBondName: function (e) {
			let matchedItem = this.matchedList.find((item) => {
				return item.name === e.detail
			})
			this.triggerEvent('change', {
				fieldName: this.properties.fieldName,
				value: {
					text: matchedItem.name,
					agencyName: matchedItem.simple_name,
					agencyId: matchedItem.id
				}
			})
			this.hideAssociateNameList()
		},

		_closeAssociateList: function () {
			this.hideAssociateNameList()
		},

		hideAssociateNameList: function () {
			this.setData({
				ascNameListOpen: false,
				simpleNameList: []
			})
			this.triggerEvent('changeFixedPageScroll', false, {
				bubbles: true,
				composed: true
			})
		},
	}
})
