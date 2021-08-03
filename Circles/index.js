var canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot;


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}

//draw straight line
function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

//draw dotted line
function drawDotted(position){
    　　context.lineWidth = 4;
    　　context.beginPath();
    　　context.setLineDash([5, 15]);
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
        context.lineTo(position.x, position.y);

    　　context.stroke();
    }

//draw circle
function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
}
function smile(position){
    var mySmile = document.getElementById('canvas')
    var smileCtx = mySmile.getContext('2d');

    // create new image object to use as pattern
    var img = new Image();
    img.src = 'heart.jpg';
    // create pattern
    var myPattern = context.createPattern(img,'repeat');
    context.fillStyle = myPattern;
    
    context.arc(100,100,99,0,Math.PI*2);
    context.stroke();
    context.fill();

    
}

function draw(position) {

    var fillBox = document.getElementById("fillBox"),
        option = document.querySelector('input[type="radio"][name="option"]:checked').value;

    if (option === "circle") {
        drawCircle(position);
    }
    if (option === "straightline") {
        drawLine(position);
    }
    if (option === "dottedline") {
        drawDotted(position);
    }
    if (option === "smile") {
        smile(position);
    }

    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        draw(position, "circle");
    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    draw(position, "circle");
}
function changeStrokeStyle() {
    context.strokeStyle = this.value;
    event.stopPropagation();
}

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.strokeStyle = strokeColor.value;

    strokeColor = document.getElementById("strokeColor"),


    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    strokeColor.addEventListener("input", changeStrokeStyle, false);

    
}

window.addEventListener('load', init, false);