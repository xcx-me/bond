module.exports = {
	defaultConfig : [			
		{
			"name": "bond_type",
			"title": "债券品种",
			"isShow": false,
			"width": 150,
			"values": [
				{"isSelected": true, "value": "0", "title": "不限"},
				{"isSelected": false, "value": "101", "title": "NCD"},
				{"isSelected": false, "value": "102", "title": "政金债"},
				{"isSelected": false, "value": "103", "title": "商行债"},
				{"isSelected": false, "value": "104", "title": "次级债"},
				{"isSelected": false, "value": "114", "title": "PPN"},
				{"isSelected": false, "value": "106", "title": "企业债"},
				{"isSelected": false, "value": "107", "title": "ABS"},
				{"isSelected": false, "value": "108", "title": "公司债"},
				{"isSelected": false, "value": "109", "title": "小公募"},
				{"isSelected": false, "value": "110", "title": "私募债"},
				{"isSelected": false, "value": "111", "title": "SCP"},
				{"isSelected": false, "value": "112", "title": "CP"},
				{"isSelected": false, "value": "113", "title": "MTN"},
				{"isSelected": false, "value": "105", "title": "其他金融债"}
			]
		},
		{
			"name": "deadline",
			"title": "发行期限",
			"isShow": false,
			"width": 65,
			"values": [
				{"isSelected": true, "value": "0", "title": "不限"},
				{"isSelected": false, "value": "1", "title": "1M"},
				{"isSelected": false, "value": "2", "title": "3M"},
				{"isSelected": false, "value": "3", "title": "6M"},
				{"isSelected": false, "value": "4", "title": "9M"},
				{"isSelected": false, "value": "5", "title": "1Y"},
				{"isSelected": false, "value": "6", "title": "3Y"},
				{"isSelected": false, "value": "7", "title": "5Y"},
				{"isSelected": false, "value": "8", "title": "7Y"},
				{"isSelected": false, "value": "9", "title": "10Y"},
				{"isSelected": false, "value": "10", "title": "≥10Y"}
			]
		},
		{
			"name": "subject_rating",
			"title": "主体评级",
			"isShow": false,
			"width": 65,
			"values": [
				{"isSelected": true, "value": "0", "title": "不限"},
				{"isSelected": false, "value": "1", "title": "AAA+"},
				{"isSelected": false, "value": "2", "title": "AAA"},
				{"isSelected": false, "value": "3", "title": "AA+"},
				{"isSelected": false, "value": "4", "title": "AA"},
				{"isSelected": false, "value": "5", "title": "AA-"},
				{"isSelected": false, "value": "6", "title": "A+"},
				{"isSelected": false, "value": "7", "title": "A"},
				{"isSelected": false, "value": "8", "title": "A-"},
				{"isSelected": false, "value": "9", "title": "其他"}
			]
		}
	]
}