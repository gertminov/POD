
import interact from 'https://cdn.interactjs.io/v1.10.11/interactjs/index.js'
// import * as pageclip from 'https://s.pageclip.co/v1/pageclip.js'

const alldata = {
    id: ""
}

interact(".draggable").draggable({
    inertia: false,
    autoScroll: false,
    modifiers: [
    ],
    listeners: {
        move: dragMoveListener,
        end(event) {
            var item = event.target
            var itemCenter = getCoords(item)


            var docext = document.getElementById('weg')
            var distancePara = document.getElementById('distance')
            var CenterMan = document.getElementById('middle').getBoundingClientRect()
            var winkelPara = document.getElementById('winkel')
            var dudecords = [(CenterMan.top + CenterMan.height),(CenterMan.left + CenterMan.width/2) ]
            dudecords = [CenterMan.top, CenterMan.left]
            var ballCoords = [itemCenter.top, itemCenter.left]
            var derweg = distance(dudecords, ballCoords).toFixed(2)
            let winkel = dreiEck(ballCoords, dudecords)

            docext && (docext.textContent = "position: " + itemCenter.left.toFixed(2) + " : " + itemCenter.top.toFixed(2));
            winkelPara && (winkelPara.textContent = "winkel: " + winkel)
            distancePara && (distancePara.textContent = "distance: " + derweg)
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


//gibt Koordinaten von der mitte des Objekts zurück
function getCoords(elem){
    let box = elem.getBoundingClientRect();
    return{
        top: box.top + box.height /2,
        left: box.left + box.width/2
    }
}

//berechnet die distanz zwischen 2 punkten
function distance(pointA, pointB){
    return (Math.sqrt(Math.pow(pointA[0] - pointB[0] , 2) + Math.pow(pointA[1] - pointB[1], 2)|0))

}

//Gibt  den Winkel zurück
function dreiEck(itemP, centerP){
    var ghostP = [itemP[0], centerP[1]]; // 3ter Punkt mit x-Koordinate von itemP und y-Koordinate
    var distItmCntr = distance(itemP, centerP);
    var distItmGhst = distance(itemP, ghostP);
    var distCntrGhst = distance(centerP, ghostP)
    var winkelcos = Math.acos((pow(distItmGhst)-pow(distCntrGhst)-pow(distItmCntr))/(-2*distCntrGhst*distItmCntr));
    var winkel  = winkelcos * (180/Math.PI); //Gradmaß zu Winkelmaß
    if (itemP[1] < centerP[1]){
        winkel = -winkel
    }
    winkel += 90
    return winkel.toFixed(0)
}

//gibt input^2 zurück
function pow(zahl){
    return Math.pow(zahl,2)
}

document.querySelector('#dataRec').addEventListener('click', output)
//gibt .csv Datei mit allen daten zurück
function output() {
    var dudecord = getCoords(document.getElementById('middle'))
    var dudecordar = [dudecord.top, dudecord.left] //wandelt Coordination in Array
    var items = document.getElementsByClassName('item') //alle Item Objekte
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += "item,name,distance,kreis,winkel\r\n"

    for (let i = 0; i<items.length; i++) {
        let itemscord = getCoords(items[i])
        let itemscordar = [itemscord.top, itemscord.left]
        let entfernung = parseInt(distance(dudecordar, itemscordar).toFixed(2),10)
        let kreis = distToCirc(entfernung)
        let winkel = dreiEck(itemscordar, dudecordar)
        let name = items[i].innerText;
        let item = items[i].getAttribute('id')
        let itemdata = {
            name: name,
            distance: entfernung,
            circle: kreis,
            degree: winkel
        }
        alldata[item] = itemdata
        let row = item+ ',' + name + "," + entfernung + ","+kreis +"," + winkel
        csvContent += row +"\r\n";

    }

    sender(alldata)

    // var encodedURI = encodeURI(csvContent)
    // //damit den "Gib daten" Knopf funktionert. ist aus dem Internet, keien Ahnung
    // var link = document.createElement("a")
    // link.setAttribute("href", encodedURI);
    // link.setAttribute('download', "data.csv");
    // document.body.appendChild(link)
    // link.click()
}

//teilt die Entfernung in die Kreise ein
function distToCirc(entfernung) {
    switch (true){
        case (entfernung<200): entfernung  = 1;
            break;
        case (entfernung< 350): entfernung = 2;
            break;
        case (entfernung<500): entfernung = 3;
            break;
        case (entfernung<600): entfernung = 4;
            break;
        case (entfernung>600): entfernung = 5;
            break
    }
    return entfernung
}

class Item{
    item
    name
    constructor(item, name) {
        this.item = item;
        this.name = name
    }
}



var idex = 0
var itemArray = []

const devicelist = ['Computer', 'TV', "SmartSpeaker", "Konsole", "Smartwatch", "Tablet", "Radio", "Laptop" , "Smartphone" , 'Navi', 'Telefon']
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


function getDevices(){
    for (let device of devicelist) {
        const itemSel = localStorage.getItem(device)
        if( itemSel === 'true'){
            let itemObj = new Item(device, device)
            itemArray.push(itemObj)
            console.log('HAllo')
        }
    }
}

function getPeople() {
    for (let person of peopleList) {
        const personSel = localStorage.getItem(person)
        console.log(personSel)
        if (personSel){
            let itemObj = new Item(person, personSel)
            itemArray.push(itemObj)
            console.log(personSel + " pushed")
        }
    }
}


// document.querySelector('#newItem').addEventListener('click', itemAdder)

function itemAdder (){
    if (idex <idexBound){
        let newDiv = document.createElement("div")
        newDiv.setAttribute('class', 'draggable item')
        newDiv.setAttribute('id', itemArray[idex].item)
        let newP = document.createElement('p')
        newP.setAttribute('class', 'itemText')
        newP.innerHTML = itemArray[idex].name

        idex++
        newDiv.appendChild(newP)
        let itemContainer = document.getElementById('items')
        itemContainer.appendChild(newDiv)

    }else {
        console.log("zu Ende")
    }

}
function getID() {
    alldata.id = localStorage.getItem('kennung')
}

getDevices()
getPeople()
getID()
const idexBound = itemArray.length
for (let i = 0; i < itemArray.length; i++) {
    itemAdder()
}
localStorage.clear()


function sender(data){
    // var data = {
    //     name: "Gert",
    //     id: 'Dietrich'
    // }
    Pageclip.send('Fz7R3ajDyYVoaVmPQKeq5RpYbqaIQa97', 'POD_form', data,  function (error, response) {
        console.log('saved?', !!error, '; response:', error || response)})
    // pageclip.send('Fz7R3ajDyYVoaVmPQKeq5RpYbqaIQa97', 'POD Form', data,  function (error, response) {
    //     console.log('saved?', !!error, '; response:', error || response)})
    console.log("hallo")

}



