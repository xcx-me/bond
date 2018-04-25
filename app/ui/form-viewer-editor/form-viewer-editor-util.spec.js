const assert = require('chai').assert
const FormViewerEditorUtil = require('./form-viewer-editor-util')
const RegexpUtil = require('../../util/regexp-util/regexp-util')

describe('FormViewerEditorUtil', () => {
	const QQ_NUMBER = 'qqNumber'
	const DEPARTMENT_NAME = 'departmentName'

	let descriptors = [
		{
			fieldName: QQ_NUMBER,
			label: 'QQ',
			value: '555',
			mandatory: true,
			hasWarning: true,
			placeholder: '请输入QQ号'
		},
		{
			fieldName: DEPARTMENT_NAME,
			label: '所在部门',
			value: '',
			mandatory: false,
			placeholder: '请输入部门'
		}
	]

	let advancedValidators = {
		[QQ_NUMBER]: (value) => {
			return RegexpUtil.isQQNumber(value)
		}
	}

	it('getAdvancedProblemFieldNames() will return a list that has advanced validation problem', () => {
		let advancedProblemFieldNames = FormViewerEditorUtil.getAdvancedProblemFieldNames(descriptors, advancedValidators)
		assert.equal(1, advancedProblemFieldNames.length)
		assert.equal(QQ_NUMBER, advancedProblemFieldNames[0])
	})
})
