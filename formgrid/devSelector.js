const devices = document.getElementsByClassName('devSelector')
const button = document.querySelector('#devSubmit')
const people = document.getElementsByClassName('peopSelector')
const kennung = document.querySelector('#probKennung')
const kennungText = document.getElementById('kennungPara')
const devicePara = document.getElementById('devicePara');
const peoplerPara = document.getElementById('peoplePara');


button.addEventListener('click', data => {
    if (checkCode() & checkForDevices()  & checkForPeople()) {
        saveToLocal('kennung', kennung.value)

        for (let item of devices) {
            if (item.checked) {
                saveToLocal(item.id, item.checked)
            }
        }

        for (let person of people) {
            if (person.value !== "") {
                console.log(person.id + ": " + person.value)
                saveToLocal(person.id, person.value)
            }
        }
        location.href = 'Video/video.html'
    }

})


function saveToLocal(key, value) {
    sessionStorage.setItem(key, value)
}


function checkCode() {
    if (!kennung.value) {
        kennungText.innerHTML = "Bitte tragen Sie Ihr Codewort ein";
        return false;
    } else {
        return true
    }
}

function checkForDevices() {
    let deviceSelected = false
    for (const device of devices) {
        if (device.checked) {
            deviceSelected = true
        }
    }
    if (deviceSelected) {
        return true;
    } else {
        devicePara.innerHTML = "Bitte wählen Sie mindestens ein Gerät";
        return false;
    }
}

function checkForPeople() {
    let personSelected = false
    for (const person of people) {
        if (person.value !== "") {
            console.log("Du Nuttensohn " + person.value)
            personSelected = true
        }
    }
    if (personSelected) {
        return true;
    } else {
        peoplerPara.innerHTML = "Bitte wählen Sie mindestens ein Gerät";
        return false
    }
}


