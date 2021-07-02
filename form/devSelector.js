const devices = document.getElementsByClassName('devSelector')
const button = document.querySelector('#devSubmit')
const people = document.getElementsByClassName('peopSelector')
const kennung = document.querySelector('#probKennung')
const kennungText = document.getElementById('kennungPara')




button.addEventListener('click', data =>{

    if (!kennung.value){
        kennungText.innerHTML = "Du hast das vergessen"
        return
    }else {

        saveToLocal('kennung', kennung.value)

        for(let item of devices){
            if (item.checked){
                saveToLocal(item.id, item.checked)
            }
        }

        for (let person of people) {
            if (person.value !== ""){
                console.log(person.id + ": " +  person.value)
                saveToLocal(person.id, person.value)
            }

        }
    }




    location.href='../Video/video.html'


})



function saveToLocal(key, value) {
    localStorage.setItem(key, value)
}

//TODO infobutton
//TODO Text

