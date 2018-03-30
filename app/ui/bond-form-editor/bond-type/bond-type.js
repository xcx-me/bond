
const bondType = [
	{name: '101', value: 'NCD'},
	// {name: '102', value: '政金债', checked: 'true'},
	{name: '103', value: '商行债'},
	{name: '104', value: '次级债'},
	{name: '105', value: '其他金融债'},
	{name: '106', value: 'ABS'},
	{name: '107', value: '公司债'},
	{name: '108', value: '小公募'},
	{name: '109', value: 'SCP'},
]

Component({
	properties: {
	//   modalHidden: {
	// 	type: Boolean,
	// 	value: true
	//   }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
	//   modalMsg: {
	// 	type: String,
	// 	value: ' ',
	//   }

	// descriptors: { // 这里定义当组件调用时，需要传入的descriotors的数组
	// 	type: Array,
	// 	value: []
	// }
	},

	data: { // 这里是一些组件内部数据
	  items: bondType,
	  itemsCheckedValue: '',
	  casArray: ['利随本清', '固定利率', '浮动利率', '累积利率'],
	  casIndex: -1
	},

	methods: { // 这里放置自定义方法
		checkboxChange: function(e) {
			// console.log('checkbox发生change事件，携带value值为：', e.detail.value)
			let checkedValue = e.detail.value
			let checkedItem = []
			checkedValue.forEach((item, index) => {
				checkedItem.push(this.data.items.find((items) => { return items.name === item}).value)
			})
			this.setData({
				itemsCheckedValue: checkedItem.join('、')
			})
			console.log('债券品种：', checkedItem)
		},	
	}
})