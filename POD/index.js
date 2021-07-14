import interact from 'https://cdn.interactjs.io/v1.10.11/interactjs/index.js'


//das Objekt mit allen Daten einer VP das an pageclip gesendet wird
const alldata = {
    id: ""
}

/**
 * Eine Klasse die ein Item repräsentiert
 */
class Item {
    constructor(item, name) {
        this.item = item;
        this.name = name
    }
}

/**
 * Eine Klasse die x und y Koordinaten speichert
 */
class Coords {
    constructor(x, y) {
        this._x = parseInt(x, 10);
        this._y = parseInt(y, 10);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(num) {
        this._x = num;
    }

    set y(value) {
        this._y = value;
    }
}


interact(".draggable").draggable({
    inertia: false,
    autoScroll: false,
    modifiers: [],
    listeners: {
        move: dragMoveListener,
        end(event) {
        }
    }
})


function dragMoveListener(event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}



var itemArray = []

const devicelist = ['Computer', 'TV', "SmartSpeaker", "Konsole", "Smartwatch", "Tablet", "Radio", "Laptop", "Smartphone", 'Navi', 'Telefon']
const peopleList = [
    'Pastor*in',
    'Lehrende',
    "Arbeitskolleg*in",
    "Großeltern",
    "Verwandte",
    "Mitbewohner*in",
    "Haustier",
    "Kommiliton*in",
    'Mutter',
    'Vater',
    'Freund*in',
    'Mitschüler*in',
    'Partner*in',
    'Nachbar*in',
    'Geschwister'
]

/**
 *holt alle gewaelten devices aus local storage und pushed sie auf itemArray
 */
function getDevices() {
    for (let device of devicelist) {
        const itemSel = sessionStorage.getItem(device)
        if (itemSel === 'true') {
            let itemObj = new Item(device, device)
            itemArray.push(itemObj)
        }
    }
}

/**
 * holt alle gewaelten personen aus local storage und pushed sie auf itemArray
 */
function getPeople() {
    for (let person of peopleList) {
        const personSel = sessionStorage.getItem(person)
        if (personSel) {
            let itemObj = new Item(person, personSel)
            itemArray.push(itemObj)
            console.log(personSel + " pushed")
        }
    }
}


/**
 * fuegt items aus itemArray auf der Website in "items" div ein
 */
function itemAdder() {

    for (let i = 0; i < itemArray.length; i++) {
        let curItem = itemArray[i].item
        let newDiv = document.createElement("div")
        newDiv.setAttribute('class', 'draggable item')
        newDiv.setAttribute('id', curItem)
        // if (colorMap[curItem] != null) {                        fügt den Items farben zu
        //     console.log(colorMap[curItem]);
        //     newDiv.style.backgroundColor = colorMap[newDiv.id]
        // }
        let newP = document.createElement('p')
        newP.setAttribute('class', 'itemText')
        newP.innerHTML = itemArray[i].name

        newDiv.appendChild(newP)
        let itemContainer = document.getElementById('items')
        itemContainer.appendChild(newDiv)

    }

}

/**
 * holt die Kennung der VP aus dem sesseionStorage und fügt sie dem alldata Objekt hinzu
 */
function getID() {
    alldata.id = sessionStorage.getItem('kennung')
}

getDevices()
getPeople()
getID()


itemAdder()



/**
 * gibt Koordinaten von der mitte des Objekts zurück
 * @param {Element} elem ein HTML element von dem die Coordinaten ermittelt werden sollen
 * @returns {Coords} ein Coords Objekt mit den Koordinaten des Mittelpunkts
 */
function getCoords(elem) {
    let elemBox = elem.getBoundingClientRect();
    let y = elemBox.top + (elemBox.height / 2);
    let x = elemBox.left + (elemBox.width / 2);
    return new Coords(x, y)
}


/**
 *
 * @param center KoordinatenObjket des Mittelpunkts
 * @param point KoordinatenObjket des anderen Objektes
 * @returns {number} Die Distanz zwischen zwei punkten in Pixeln
 */
function getDistance(center, point) {
    const distVector = new Coords(point.x - center.x, point.y - center.y)

    return (Math.sqrt(Math.pow(distVector.x, 2) + Math.pow(distVector.y, 2)))
}

/**
 *
 * @param {Coords} center KoordinatenObjket des Mittelpunkts
 * @param {Coords} point KoordinatenObjket des anderen Objektes
 * @returns {number} der Winkel in °
 */
function degree(center, point) {
    const ankathete = point.x - center.x;
    let distance = getDistance(center, point);
    const winkelcos = Math.acos(ankathete / distance)
    return  Math.round((180 -(winkelcos * (180 / Math.PI))) *100)/100
}

/**
 *Gibt Distanz relativ zur breite des elements zurück
 *@param {Number} distance die absolute Distanz zwischen zwei punkten,
 *
 *@param {Element} elem ein Element das als sKala dient
 * @returns {Number} distance
 */
function relDistance(distance, elem) {
    let elemBox = elem.getBoundingClientRect();
    let width = elemBox.width;
    return Math.round((100 / width * distance)*100)/100
}


/**
 * sendet data Objekt an Pagegclip form
 * @param data Objekt das an Pageclip gesendet wird
 */
function sender(data) {

    Pageclip.send('Fz7R3ajDyYVoaVmPQKeq5RpYbqaIQa97', 'POD_form', data, function (error, response) {
        console.log('saved?', !!error, '; response:', error || response)
    })
    // pageclip.send('Fz7R3ajDyYVoaVmPQKeq5RpYbqaIQa97', 'POD Form', data,  function (error, response) {
    //     console.log('saved?', !!error, '; response:', error || response)})
    console.log("daten gesendet")

}

document.querySelector('#dataRec').addEventListener('click', outputChecker)

let dataSend = false

function outputChecker() {
    ToggleSendPopUp()
    if (!dataSend){
        output()
        dataSend = true
    }
}

/**
 * sendet daten an Pageclip
 */
function output() {


    var centerCoords = getCoords(document.getElementById('middle'))
    var items = document.getElementsByClassName('item') //alle Item Objekte

    for (let i = 0; i < items.length; i++) {

        let itemscord = getCoords(items[i])
        let absDistance = getDistance(centerCoords, itemscord)
        let entfernung = relDistance(absDistance, document.getElementById('circles'))
        let kreis = distToCirc(entfernung)
        let winkel = degree(centerCoords, itemscord)

        let name = items[i].innerText;
        let item = items[i].getAttribute('id')
        let itemdata = {
            height: window.innerHeight,
            width: window.innerWidth,
            coords: itemscord,
            name: name,
            distance: entfernung,
            circle: kreis,
            degree: winkel
        }

        alldata[item] = itemdata
        console.log(itemdata.distance)
        console.log(itemdata.degree)

    }

    sender(alldata)

}

/**
 * Teil die relative Entfernung in die Kreise ein
 * @param entfernung
 * @returns {number}
 */
function distToCirc(entfernung) {
    switch (true) {
        case (entfernung < 12):
            entfernung = 1;
            break;
        case (entfernung < 20):
            entfernung = 2;
            break;
        case (entfernung < 27):
            entfernung = 3;
            break;
        case (entfernung <= 35):
            entfernung = 4;
            break;
        case (entfernung > 35):
            entfernung = 5;
            break
    }
    return entfernung
}


document.getElementById('infoBtn').addEventListener('click', toggleInfoPopUp)
document.getElementById('popup-close-btn').addEventListener('click', toggleInfoPopUp)
document.getElementById('popUp-absenden').addEventListener("click", ToggleSendPopUp)

function toggleInfoPopUp() {
    document.getElementById('popup-1').classList.toggle("active")
}

function ToggleSendPopUp() {
    document.getElementById('popUp-absenden').classList.toggle("active")
}


sessionStorage.clear()







