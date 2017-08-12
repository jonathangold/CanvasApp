//inject global scope
paper.install(window)

//expose required vars to global scope 
var brush, eraser, setColor

window.onload = function(){

//set up paperscope vars
	var canvas = document.getElementById('canvas')
	var picker = document.getElementById('picker')
	var size = document.getElementById('brushSize')
	var brushSelect = document.getElementById('brush')
	var eraserSelect = document.getElementById('eraser')
	var undo = document.getElementById('undo')
	var download = document.getElementById('download')
	var path
	var color = '#000000'
	var brushSize = 5
	
//set up paper canvas
	paper.setup(canvas)
	paper.view.viewSize.width = window.innerWidth
	paper.view.viewSize.height = window.innerHeight


//event listeners
	setColor = function(jscolor){
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

//create white rectagle for background
	new Path.Rectangle({
		point: [0, 0],
		size: [view.size.width, view.size.height],
		strokeWidth: 0,
		fillColor: 'white',
		selected: true
	})

//create the interactive layer
	layer = new Layer()

//begin tools
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
	
//update the view
	paper.view.draw()
}
