paper.install(window)
window.onload = function(){

	var canvas = document.getElementById('canvas')
	paper.setup(canvas)

	paper.view.viewSize.width = window.innerWidth
	paper.view.viewSize.height = window.innerHeight

	var picker = document.getElementById('picker')
	var size = document.getElementById('brushSize')

	var color = '#000000'
	var brushSize = 5

	window.setColor = function setColor(jscolor){
		color = '#' + jscolor
	}

	size.addEventListener('input', function(){
		brushSize = size.value
	})

	var path

	brush = new Tool()

	brush.onMouseDown = function(e){
		path = new paper.Path()
		path.add(e.point)
		path.strokeColor = color
		path.strokeWidth = brushSize
		path.strokeCap = 'square'
	}

	brush.onMouseDrag = function(e){
		path.add(e.point)
		path.smooth()
	}

	path.onMouseUp = function(){
		path.simplify()
	}

	paper.view.draw()
}
