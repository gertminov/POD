// @ts-ignore
import interact from 'https://cdn.interactjs.io/v1.10.11/interactjs/index.js'

let container = document.getElementById('pod-container');
let containerMiddle = document.getElementById('container-middle');
let middle = document.getElementById('middle');
let middleMiddle = document.getElementById('middle-middle')
let point = document.getElementById('point');
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

const containerOffset = container.getBoundingClientRect().left


class Coords {

    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    set x(num){
        this._x = num
    }
    set y(value: number) {
        this._y = value;
    }

}




interact(".draggable").draggable({
    inertia: false,
    autoScroll: false,
    modifiers: [
    ],
    listeners: {
        move: dragMoveListener,
        end(event) {

        }
    }
})


function dragMoveListener(event){
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = 'translate('+x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}





function getCoords(elem): Coords {
    let elemBox = elem.getBoundingClientRect();
    let y = elemBox.top + (elemBox.height / 2);
    let x = elemBox.left + (elemBox.width / 2);

    return new Coords(x, y)
}

function getMiddle(elem): Coords {
    let elemBox = elem.getBoundingClientRect();
    let y = elemBox.height/2;
    let x = elemBox.width/2;
    return new Coords(x, y)
}


//sets position ob elem at coords
//axis = 0 sets x and y
//axis = 1 sets x
//axis = -1 sets y
function positionSetter(elem, coords: Coords, axis?: string) {

    switch (axis) {
        case "x":
            setXPosition(elem, coords.x)
            break
        case "y":
            setYPosition(elem, coords.y)
            break
        case "b":
            setXPosition(elem, coords.x)
            setYPosition(elem, coords.y)
            break
    }

}

function getDistance(center: Coords, point: Coords) {
    const distVector = new Coords(point.x - center.x, point.y - center.y)

    return (Math.sqrt(Math.pow(distVector.x, 2) + Math.pow(distVector.y, 2)))
}

function degree(center: Coords, point: Coords) {
    const ankathete = point.x - center.x;
    let distance = getDistance(center, point);
    const winkelcos = Math.acos(ankathete/distance)
    return winkelcos * (180 / Math.PI)
}

function relDistance(dinstance: number, elem ) {
    let elemBox = elem.getBoundingClientRect();
    let width = elemBox.width;
    return 100 / width * dinstance
}

function setXPosition(elem, pos:number) {
    let elemBox = elem.getBoundingClientRect();
    elem.style.left = "" + (pos - elemBox.width/2).toFixed(0) + "px"
}

function setYPosition(elem, pos: number) {
    let elemBox = elem.getBoundingClientRect();
    elem.style.top = "" + (pos -elemBox.height/2).toFixed(0) + "px"

}

let contMiddleCoords = getMiddle(container);
let containerCords = getCoords(container)
let pointCoords = getCoords(point)


positionSetter(middle, contMiddleCoords, "x")

let middleCoords = getCoords(middle);

positionSetter(containerMiddle, middleCoords, "b")
positionSetter(middleMiddle, middleCoords , "b")

let distance = getDistance(middleCoords , pointCoords);


// console.log("breite: " + windowWidth)
// console.log("container x: " + containerCords.x + "\ncontainer y: " + containerCords.y);
// console.log("middle x: " + middleCoords.x + "\nmiddle y: " + middleCoords.y);
// console.log("point x: " + pointCoords.x + "\npoint y: " + pointCoords.y);
console.log("distance: " + distance)
console.log("winkel: " + degree(middleCoords, pointCoords))
console.log("distance: " + relDistance(distance, container))
// console.log("relContainer x: " + relContainerCoords.x + "\ncontainer y: " + relContainerCoords.y);
// console.log("middle x: " + relMiddleCoords.x + "\nmiddle y: " + relMiddleCoords.y);