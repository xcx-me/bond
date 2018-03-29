// app/page/bond-detail/bond-attached/bond-attached.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	nameList: {
		type: Array,
		value: []
	},
	urlList: {
		type: Array,
		value: []
	}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
	doDownloadFile: function(e) { //下载并预览文件,支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
		let url = e.currentTarget.dataset.url
		wx.downloadFile({
			url: url,
			success: function (res) {
			  var filePath = res.tempFilePath
			  wx.openDocument({
				filePath: filePath,
				success: function (res) {
				  console.log('打开文档成功')
				}
			  })
			}
		 })
	  }
	}
})
