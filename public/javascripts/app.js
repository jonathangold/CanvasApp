paper.install(window)

var brush, eraser

window.onload = function(){

	var canvas = document.getElementById('canvas')
	paper.setup(canvas)

	paper.view.viewSize.width = window.innerWidth
	paper.view.viewSize.height = window.innerHeight

	var picker = document.getElementById('picker')
	var size = document.getElementById('brushSize')
	var brushSelect = document.getElementById('brush')
	var eraserSelect = document.getElementById('eraser')
	var undo = document.getElementById('undo')
	var download = document.getElementById('download')

	var path
	var color = '#000000'
	var brushSize = 5

	window.setColor = function setColor(jscolor){
		color = '#' + jscolor
	}

	size.addEventListener('input', function(){
		brushSize = size.value
	})

	brushSelect.addEventListener('click' , function(){
		brush.activate()
	})
	
	eraserSelect.addEventListener('click' , function(){
		eraser.activate()
	})
	
	undo.addEventListener('click', function(){
		var undoPath = path
		path = path.previousSibling
		undoPath.removeSegments()
	})

	download.addEventListener('click', function(){
		var image = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream")
		download.setAttribute('href', image)
	})

	brush = new Tool()

	brush.onMouseDown = function(e){
		path = new paper.Path()
		path.add(e.point)
		path.strokeColor = color
		path.strokeWidth = brushSize
		path.strokeCap = 'round'
	}

	brush.onMouseDrag = function(e){
		path.add(e.point)
		path.smooth()
	}

	eraser = new Tool()

	eraser.onMouseDown = function(e){
		path = new paper.Path()
		path.add(e.point)
		path.strokeColor = '#ffffff'
		path.strokeWidth = brushSize
		path.strokeCap = 'round'
	}

	eraser.onMouseDrag = function(e){
		path.add(e.point)
		path.smooth()
	}
	
	paper.view.draw()
}
