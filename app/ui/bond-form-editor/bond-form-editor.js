
var dateTimePicker = require('../../util/date-time-picker/date-time-picker')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const formConfig = require('./form-config/form-config')
const converson = require('../../util/converson/converson')
const AutoCompleteTextInputUtil = require('../../ui/form-viewer-editor/auto-complete-text-input/auto-complete-text-input-util')

Component({
	properties: {
		isEditEntry: { // 是否是编辑债券的入口
			type: Boolean,
			value: false
		},
		bondSimpleName: {
			type: String,
			value: ''
		},
		highlight: {
			type: Object,
			value: {}
		}
	},

	data: {
		formData: JSON.parse(JSON.stringify(formConfig.defaultFormData)),
		newSimpleName: '',// 解决input输入框在原生输入法下，拼音打字时闪烁(消失)的问题。
		ascNameListOpen: false, 
		simpleNameList: [],

		// 时间
		dateTimeArray: dateTimePicker.dateTimePicker(2000, 2050).dateTimeArray,
		dateTime: dateTimePicker.dateTimePicker(2000, 2050).dateTime,

		// 上市地点-多选
		listingOpenFlag: false,
		listingSpotItems: formConfig.listingSpot.items,
		listingSelectFlag: converson.parseToObject([]),

		// 企业性质-单选
		enterpriseNature: formConfig.enterpriseNature.items,
		enterpriseIndex: -1,

		// 债券品种-多选
		bondTypeOpenFlag: false,
		bondTypeItems: formConfig.bondType.items,
		bondTypeSelectFlag: converson.parseToObject([]),

		// 发行方式-单选
		issuanceMethodItem: formConfig.issuanceMethod.items,
		issuanceMethodIndex: -1,

		//  利率方式
		rateWayArray: formConfig.rateWay.items,
		rateWayIndex: -1,
		rateReply: false,

		// 特殊条款-多选
		specificOpenFlag: false,
		specificItems: formConfig.specificClause.items,
		specificSelectFlag: converson.parseToObject([]),
	},

	ready: function() {
		this.bondDetailsAssociate(this.data.bondSimpleName)
	},

	methods: {
		simpleNameChange: function (e) {
			let formData = this.data.formData
			formData.bond_simple_name = e.detail.value
			this.setData({
				formData: formData,
				ascNameListOpen: false
			})

			let currentTime = new Date().getTime()
			this.timeStamp_ = currentTime
			setTimeout(() => {
				if (this.timeStamp_ - currentTime === 0) {
					this.bondDetailsAssociate(e.detail.value) // 债券详情联想
					this.bondSimpleNameAssociate(e.detail.value) // 债券简称列表联想
				}
			}, 1000)

			this.triggerEvent('changeValueEvent', formData)
		},

		changeValue (e) { // 改变各input的value
			let formData = this.data.formData
			if (e.currentTarget.dataset.inputName === 'left_benefit') { // 参考收益 左值
				let val = e.detail.value
				this.benifitValueChange(val, 'left_benefit')
				this.triggerEvent('changeHighLightState', 'benefit')
			} else if (e.currentTarget.dataset.inputName === 'right_benefit') { // 参考收益 右值
				let val = e.detail.value
				this.benifitValueChange(val, 'right_benefit')
				this.triggerEvent('changeHighLightState', 'benefit')
			} else if (e.currentTarget.dataset.inputName === 'subject_rating') { // 主体评级
				formData[e.currentTarget.dataset.inputName] = e.detail.value
				this.triggerEvent('changeHighLightState', 'subject_rating')
			} else if (e.currentTarget.dataset.inputName === 'facility_rating') { // 债项评级
				formData[e.currentTarget.dataset.inputName] = e.detail.value
				this.triggerEvent('changeHighLightState', 'facility_rating')
			} else if (e.currentTarget.dataset.inputName === 'deadline') { // 期限
				formData[e.currentTarget.dataset.inputName] = e.detail.value
				this.triggerEvent('changeHighLightState', 'deadline')
			} else if (e.currentTarget.dataset.inputName === 'issue_total') { // 发行量
				let val = e.detail.value
				let reg = /^\d{0,5}(\.\d{0,4})?$/g
				if (reg.test(val)) {
					if (val !== '' && val.substring(0, 1) === '.') {
						val = ''
						formData[e.currentTarget.dataset.inputName] = ''
					}
					val = val.replace(/[^\d.]/g, '')
					val = val.replace(/\.{2,}/g, '.')
					val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
					if (val.indexOf('.') < 0 && val !== '' && val.substring(0, 1) === '0' && val.length === 2) {
						val = val.substring(1, val.length)
					}
					formData[e.currentTarget.dataset.inputName] = val
				}

				this.triggerEvent('changeHighLightState', 'issue_total')
			}else {
				formData[e.currentTarget.dataset.inputName] = e.detail.value
			}

			this.setData({
				formData: formData
			})

			this.triggerEvent('changeValueEvent', formData)
		},

		benifitValueChange: function(val, currentDataSet) {
			let formData = this.data.formData
			let reg = /^\d{0,2}(\.\d{0,4})?$/g
			if (reg.test(val)) {
				if (val !== '' && val.substring(0, 1) === '.') {
					val = ''
					formData[currentDataSet] = ''
				}
			 	return	formData[currentDataSet] = val
			}
		},

		// picker,年月日 + 时分
		changeDateTime (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.inputName] = this.data.dateTimeArray[0][e.detail.value[0]] +'-'+ this.data.dateTimeArray[1][e.detail.value[1]] +'-'+ this.data.dateTimeArray[2][e.detail.value[2]] +' '+ this.data.dateTimeArray[3][e.detail.value[3]] +':'+ this.data.dateTimeArray[4][e.detail.value[4]]
			this.setData({
				dateTime: e.detail.value,
				formData: formData
			});
			this.triggerEvent('changeValueEvent', formData)
		},

		// 上市地点
		handleListingSelect: function () {
			this.setData({
				listingOpenFlag: !this.data.listingOpenFlag
			})
		},
		inverseChange: function (e) {
			let formData = this.data.formData
			let falg = this.data.listingSelectFlag
			falg[e.currentTarget.dataset.name] = !falg[e.currentTarget.dataset.name]
			formData[e.currentTarget.dataset.listingSpot] = converson.parseToArray(falg).filter((item) => { return item !== '' && item !== undefined }).join('|')
			this.setData({
				listingSelectFlag: falg,
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 企业性质
		changeEnterpriseNature: function (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.enterpriseNature] = Number(e.detail.value) + 1
			this.setData({
				enterpriseIndex: e.detail.value,
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 债券品种
		handleOpenBondType: function () {
			this.setData({
				bondTypeOpenFlag: !this.data.bondTypeOpenFlag
			})
		},
		bondTypeChange: function (e) {
			let formData = this.data.formData
			let falg = this.data.bondTypeSelectFlag
			falg[e.currentTarget.dataset.name] = !falg[e.currentTarget.dataset.name]

			formData[e.currentTarget.dataset.bondType] = converson.parseToArray(falg).filter((item) => { return item !== '' && item !== undefined }).join('|')
			this.setData({
				bondTypeSelectFlag: falg,
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 发行方式
		changeIssuancemethod: function (e) {
			let formData = this.data.formData
			formData[e.currentTarget.dataset.issuanceMethod] = Number(e.detail.value) + 1
			this.setData({
				issuanceMethodIndex: e.detail.value,
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 利率方式
		handleDropdownRateWay: function (e) {
			if (e.detail.value == 2) {
				this.setData({ rateReply: true })
			} else {
				let formData = this.data.formData
				formData['benchmark'] = ''
				this.setData({
					rateReply: false,
					formData: formData
				})
			}
			let formData = this.data.formData
			formData[e.currentTarget.dataset.rateMethod] = Number(e.detail.value) + 1
			this.setData({
				rateWayIndex: e.detail.value,
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// 特殊条款
		handleOpenSpecific: function () {
			this.setData({
				specificOpenFlag: !this.data.specificOpenFlag
			})
		},
		specificChange: function (e) {
			let formData = this.data.formData
			let falg = this.data.specificSelectFlag
			falg[e.currentTarget.dataset.name] = !falg[e.currentTarget.dataset.name]

			formData[e.currentTarget.dataset.specificItems] = converson.parseToArray(falg).filter((item) => { return item !== '' && item !== undefined }).join('|')
			this.setData({
				specificSelectFlag: falg,
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},


		// 获取债券详情
		bondDetailsAssociate: function (bondSimpleName) {
			request(config.NEW_BOND.associateBond, {bond_simple_name: bondSimpleName}).then((result)=>{
				let resultData = result.retdata

				if (Object.keys(resultData).length > 0) {
					resultData.bond_simple_name = bondSimpleName
					this.setData({
						formData: resultData,
						newSimpleName: bondSimpleName,
						enterpriseIndex: resultData.company_type && (resultData.company_type - 1), // 企业性质
						issuanceMethodIndex: resultData.issue_way && (resultData.issue_way - 1), // 发行方式
	
						rateReply: resultData.rate_way && String(resultData.rate_way) === '3',
						rateWayIndex: resultData.rate_way && (resultData.rate_way - 1),
	
						listingOpenFlag: resultData.public_place,
						listingSelectFlag: resultData.public_place !=='' ? converson.parseToObject(resultData.public_place.split('|')) : converson.parseToObject([]),
	
						bondTypeOpenFlag: resultData.bond_type,
						bondTypeSelectFlag: resultData.bond_type !=='' ? converson.parseToObject(resultData.bond_type.split('|')) : converson.parseToObject([]),
	
						specificOpenFlag: resultData.specific_items,
						specificSelectFlag: resultData.specific_items !=='' ? converson.parseToObject(resultData.specific_items.split('|')) : converson.parseToObject([])
					})
					this.triggerEvent('changeValueEvent', resultData)
				} else {
					this.setData({
						formData: formData,

						enterpriseIndex: -1, // 企业性质
						issuanceMethodIndex: -1, // 发行方式
	
						rateReply: false,
						rateWayIndex: -1,
	
						listingOpenFlag: false,
						listingSelectFlag: converson.parseToObject([]),
	
						bondTypeOpenFlag: false,
						bondTypeSelectFlag: converson.parseToObject([]),
	
						specificOpenFlag: false,
						specificSelectFlag: converson.parseToObject([])
					})
					this.triggerEvent('changeValueEvent', formData)
				}
			})
		},

		// 债券简称联想
		bondSimpleNameAssociate: function (curName) {
			request(config.NEW_BOND.associateBondName, {bond_msg: curName}).then((result) => {
				let resultData = result.retdata.array

				let formData = JSON.parse(JSON.stringify(formConfig.defaultFormData))
				formData.bond_simple_name = curName
				if (curName !=='' && resultData.length > 0) {
					let nameArray = AutoCompleteTextInputUtil.parseAssociateBondSimpleName(curName, resultData, 'bond_simple_name')
					this.setData({
						formData: formData,
						ascNameListOpen: true,
						simpleNameList: nameArray
					})
					this.triggerEvent('changeFixedPageScroll', true)
				} else {
					this.setData({
						formData: formData,
						ascNameListOpen: false,
						simpleNameList: []
					})
					this.triggerEvent('changeFixedPageScroll', false)
				}
			})
		},

		_closeAssociateList: function () {
			this.hideAssociateNameList()
		},

		_selectAssociateBondName: function (e) {
			this.bondDetailsAssociate(e.detail)
			this.hideAssociateNameList()
		},

		hideAssociateNameList: function () {
			this.setData({
				ascNameListOpen: false,
				simpleNameList: []
			})
			this.triggerEvent('changeFixedPageScroll', false)
		},

		saveCheckedValue: function (targetValue, dataArray) {
			let checkedItem = []
			let checkedParams = []
			targetValue.forEach((item, index) => {
				checkedItem.push(dataArray.find((items) => { return items.name === item}).value)
				checkedParams.push(item)
			})

			return {
				checkedItem: checkedItem,
				checkedParams: checkedParams
			}
		},
	}
})