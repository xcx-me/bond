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

module.exports = {
	findDescriptorByFieldName: findDescriptorByFieldName,
	setValueByFieldName: setValueByFieldName
}