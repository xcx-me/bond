function findDescriptorByFieldName (descriptors, fieldName) {
	return descriptors.find((item) => {
		return item.fieldName === fieldName
	})
}

function setValueByFieldName (host, descriptors, fieldName, propertyName, value) {
	let matchedDescriptor = this.findDescriptorByFieldName(descriptors, fieldName)
	matchedDescriptor[propertyName] = value
	host.setData({
		descriptors: descriptors
	})
}

function parseAllFieldsToSubmissionObject (descriptors) {
	let allFieldNames = descriptors.map((item) => item.fieldName)
	let submissionObject = {}
	allFieldNames.forEach((fieldName) => {
		submissionObject[fieldName] = this.findDescriptorByFieldName(descriptors, fieldName).value
	})
	return submissionObject
}

function doBasicValidation (descriptors, fieldName, validators) {
	let matchedDescriptor = findDescriptorByFieldName(descriptors, fieldName)
	if (!validators[fieldName]) return true
	return validators[fieldName](matchedDescriptor.value)
}

function doBasicValidationForAllFields (descriptors, validators) {
	return descriptors.every((item) => {
		return doBasicValidation(descriptors, item.fieldName, validators)
	})
}

function getAdvancedProblemFieldNames (descriptors, validators) {
	return descriptors.filter((descriptor) => {
		let matchedValidator = validators[descriptor.fieldName]
		return matchedValidator && !matchedValidator(descriptor.value)
	}).map((descriptor) => {
		return descriptor.fieldName
	})
}

module.exports = {
	findDescriptorByFieldName: findDescriptorByFieldName,
	setValueByFieldName: setValueByFieldName,
	parseAllFieldsToSubmissionObject: parseAllFieldsToSubmissionObject,
	doBasicValidation: doBasicValidation,
	doBasicValidationForAllFields: doBasicValidationForAllFields,
	getAdvancedProblemFieldNames: getAdvancedProblemFieldNames
}