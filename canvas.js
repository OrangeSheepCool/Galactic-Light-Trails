var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

const colorArray = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66',
	'#3F595A'
]

let mouseDown = false

window.addEventListener('mousedown', () => mouseDown = true)
window.addEventListener('mouseup', () => mouseDown = false)

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	init()
})

class Particle {
	constructor(x, y, radius, color) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
	}
	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.shadowColor = this.color
		c.shadowBlur = 20
		c.fillStyle = this.color
		c.fill()
		c.closePath()
	}
	update() {
		this.draw()
	}
}

let particles

function init() {

	particles = []

	for (let i = 0; i < 400; i++) {
		const canvasWidth = canvas.width + 300
		const canvasHeight = canvas.height + 300
		const x = Math.random() * canvasWidth - canvasWidth / 2
		const y = Math.random() * canvasHeight - canvasHeight / 2
		const radius = Math.random() * 3
		const color = colorArray[Math.floor(Math.random() * colorArray.length)]
		particles.push(new Particle(x, y, radius, color))
	}
}

let radians = 0
let alpha = 1

function animate() {
	requestAnimationFrame(animate)
	c.fillStyle = `rgba(10, 10, 10, ${alpha})`
	c.fillRect(0, 0, canvas.width, canvas.height)
	c.save()
	c.translate(canvas.width / 2, canvas.height / 2)
	c.rotate(radians)
	particles.forEach(particle => particle.update())
	c.restore()
	radians += 0.001
	if (mouseDown && alpha >= 0.1) {
		alpha -= 0.01
	} else if (!mouseDown && alpha < 1) {
		alpha += 0.01
	}
}

init()
animate()