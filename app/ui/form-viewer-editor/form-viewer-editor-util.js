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

module.exports = {
	findDescriptorByFieldName: findDescriptorByFieldName,
	setValueByFieldName: setValueByFieldName,
	parseAllFieldsToSubmissionObject: parseAllFieldsToSubmissionObject
}