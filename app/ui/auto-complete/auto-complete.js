
Component({
	properties: {
		nameListVisible: {
			type: Boolean,
			value: false
		},
		memberList: {
			type: Object,
			value: [],
		}
	},

	data: {
		nameListVisible: false
	},

	methods: {
		onHandleClose: function () {
			this.triggerEvent('onHandleCloseList', false)
		},

		onHandleSelect: function (e) {
			this.triggerEvent('onHandleSelectItem', e.currentTarget.dataset.memberName)
		}
	}
})