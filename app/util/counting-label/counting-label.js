const PERIOD = 60

module.exports = {
	updateLabel (host, setLabelByConditionCallback) {
		setLabelByConditionCallback(true, PERIOD)
		let counter = PERIOD
		host.timer = setInterval(() => {
			counter--
			if (counter === 0) {
				clearInterval(host.timer)
				host.timer = undefined
				counter = PERIOD
				setLabelByConditionCallback(false)
				return
			}
			setLabelByConditionCallback(true, counter)
		}, 1000)
	}
}