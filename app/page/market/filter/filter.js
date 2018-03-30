// app/page/market/filter/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
	defaultFilterConfig: [			
		{
			"index": "0",
			"name": "bond_type",
			"title": "债券品种",
			"isSelected": false,
			"width": 150,
			"values": [
				{"0": "不限", "isSelected": true, "index": "0", "ajaxParam": "0", "title": "不限"},
				{"1": "NCD", "isSelected": false, "index": "1", "ajaxParam": "101", "title": "NCD"},
				{"2": "政金债", "isSelected": false, "index": "2", "ajaxParam": "102", "title": "政金债"},
				{"3": "商行债", "isSelected": false, "index": "3", "ajaxParam": "103", "title": "商行债"},
				{"4": "次级债", "isSelected": false, "index": "4", "ajaxParam": "104", "title": "次级债"},
				{"5": "PPN", "isSelected": false, "index": "5", "ajaxParam": "114", "title": "PPN"},
				{"6": "企业债", "isSelected": false, "index": "6", "ajaxParam": "106", "title": "企业债"},
				{"7": "ABS", "isSelected": false, "index": "7", "ajaxParam": "107", "title": "ABS"},
				{"8": "公司债", "isSelected": false, "index": "8", "ajaxParam": "108", "title": "公司债"},
				{"9": "小公募", "isSelected": false, "index": "9", "ajaxParam": "109", "title": "小公募"},
				{"10": "私募债", "isSelected": false, "index": "10", "ajaxParam": "110", "title": "私募债"},
				{"11": "SCP", "isSelected": false, "index": "11", "ajaxParam": "111", "title": "SCP"},
				{"12": "CP", "isSelected": false, "index": "12", "ajaxParam": "112", "title": "CP"},
				{"13": "MTN", "isSelected": false, "index": "13", "ajaxParam": "113", "title": "MTN"},
				{"14": "其他金融债", "isSelected": false, "index": "14", "ajaxParam": "105", "title": "其他金融债"}
			]
		},
		{
			"index": "1",
			"name": "deadline",
			"title": "发行期限",
			"isSelected": false,
			"width": 65,
			"values": [
				{"0": "不限", "isSelected": true, "index": "0", "ajaxParam": "0", "title": "不限"},
				{"1": "1M", "isSelected": false, "index": "1", "ajaxParam": "1", "title": "1M"},
				{"2": "3M", "isSelected": false, "index": "2", "ajaxParam": "2", "title": "3M"},
				{"3": "6M", "isSelected": false, "index": "3", "ajaxParam": "3", "title": "6M"},
				{"4": "9M", "isSelected": false, "index": "4", "ajaxParam": "4", "title": "9M"},
				{"5": "1Y", "isSelected": false, "index": "5", "ajaxParam": "5", "title": "1Y"},
				{"6": "3Y", "isSelected": false, "index": "6", "ajaxParam": "6", "title": "3Y"},
				{"7": "5Y", "isSelected": false, "index": "7", "ajaxParam": "7", "title": "5Y"},
				{"8": "7Y", "isSelected": false, "index": "8", "ajaxParam": "8", "title": "7Y"},
				{"9": "10Y", "isSelected": false, "index": "9", "ajaxParam": "9", "title": "10Y"},
				{"10": "≥10Y", "isSelected": false, "index": "10", "ajaxParam": "10", "title": "≥10Y"}
			]
		},
		{
			"index": "2",
			"name": "subject_rating",
			"title": "主体评级",
			"isSelected": false,
			"width": 65,
			"values": [
				{"0": "不限", "isSelected": true, "index": "0", "ajaxParam": "0", "title": "不限"},
				{"1": "AAA+", "isSelected": false, "index": "1", "ajaxParam": "1", "title": "AAA+"},
				{"2": "AAA", "isSelected": false, "index": "2", "ajaxParam": "2", "title": "AAA"},
				{"3": "AA+", "isSelected": false, "index": "3", "ajaxParam": "3", "title": "AA+"},
				{"4": "AA", "isSelected": false, "index": "4", "ajaxParam": "4", "title": "AA"},
				{"5": "AA-", "isSelected": false, "index": "5", "ajaxParam": "5", "title": "AA-"},
				{"6": "A+", "isSelected": false, "index": "6", "ajaxParam": "6", "title": "A+"},
				{"7": "A", "isSelected": false, "index": "7", "ajaxParam": "7", "title": "A"},
				{"8": "A-", "isSelected": false, "index": "8", "ajaxParam": "8", "title": "A-"},
				{"9": "其他", "isSelected": false, "index": "9", "ajaxParam": "9", "title": "其他"}
			]
		}
	]
  },

  ready: function () {
	console.log(this.data.defaultFilterConfig)
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
