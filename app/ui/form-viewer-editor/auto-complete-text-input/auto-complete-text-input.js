const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')

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
			type: String,
			value: ''
		},
		label: {
			type: String,
			value: ''
		},
		placeholder: {
			type: String,
			value: ''
		},
		maxlength: {
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
				fieldName: e.currentTarget.dataset.fieldName,
				value: e.detail.value
			})
		},

		bondSimpleNameAssociate: function (curName) {
			request(config.NEW_BOND.associateBondName, {bond_msg: curName}).then((result) => {
				let resultData = result.retdata.array
				if (curName !=='' && resultData.length > 0) {
					console.log('has itmes..')
					let nameArray = this.parseAssociateBondSimpleName(curName, resultData)

					console.log('nameArray', nameArray)

					this.setData({
						ascNameListOpen: true,
						simpleNameList: nameArray
					})
					this.triggerEvent('changeFixedPageScroll', true)
				} else {
					console.log('has no itmes..')
					this.setData({
						ascNameListOpen: false,
						simpleNameList: []
					})
					this.triggerEvent('changeFixedPageScroll', false)
				}
			})
		},

		parseAssociateBondSimpleName: function(curName, ascBondSimpleNameList) {
			let result = []
			if (curName === '') {
				return result
			}
			ascBondSimpleNameList.map((item) => {
				let newValueList = []
				let bondSimpleName = item.bond_simple_name
				let lowerBondSimpleName = bondSimpleName.toLowerCase()
				let valueList = lowerBondSimpleName.split(curName.toLowerCase())
				let positionStart = lowerBondSimpleName.indexOf(curName.toLowerCase())
				let positionEnd = positionStart + curName.length
				let highlightValue = bondSimpleName.slice(positionStart, positionEnd)

				valueList.map((value, index) => {
					newValueList.push({
						value: value,
						tag: 0
					})
					if (index < valueList.length - 1) {
						newValueList.push({
							value: highlightValue,
							tag: 1
						})
					}
				})
				result.push({
					value: bondSimpleName,
					list: newValueList
				})
			})

			return result
		},

		bondDetailsAssociate: function (bondSimpleName) {
			// TODO: get list.
		},

		_selectAssociateBondName: function (e) {
			console.log('e.detail', e.detail)
			this.bondDetailsAssociate(e.detail)
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
			this.triggerEvent('changeFixedPageScroll', false)
		},
	}
})
