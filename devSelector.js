const devices = document.getElementsByClassName('devSelector')
const button = document.querySelector('#devSubmit')
const people = document.getElementsByClassName('peopSelector')




button.addEventListener('click', data =>{

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

    location.href='index.html'


})



function saveToLocal(key, value) {
    localStorage.setItem(key, value)
}

