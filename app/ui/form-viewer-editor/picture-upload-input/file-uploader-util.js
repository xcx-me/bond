export const isValidExtension = (fileName, list) => {
	if (!fileName || fileName === '') return false
	return list.some((extension) => {
		return fileName.toLowerCase().lastIndexOf(extension.toLowerCase()) === (fileName.length - extension.length)
	})
}

export const toMB = (size) => {
	return size / 1024 / 1024
}
