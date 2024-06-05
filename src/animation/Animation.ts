
export const anim = ( direction:string, delay :number) => {
	return {
		hidden: {
			y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
			x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
			opacity: 0,
		},
		show: {
			y: 0,
			x: 0,
			opacity: 1,
			transition: {
				type: 'tween',
				duration: 1,
				delay: delay,
				ease: [0.25, 0.25, 0.25, 0.75]
			}
		}
	}
}