const inputNameEL = document.querySelector("#name-input");
const inputEmailEL = document.querySelector("#email-input");
const inputMsgEL = document.querySelector("#msg-input");
const submitBtnEL = document.querySelector("#submit-btn")

let addEvents = ()=> {
    submitBtnEL.addEventListener( "click" , ()=>{
        handleSendContact().then( res => console.log(res))
    })
}

let clearInputFields = ()=> {
    inputNameEL.value = ""
    inputEmailEL.value = ""
    inputMsgEL.value = ""
}

let handleSendContact = async()=> {

    if(!inputMsgEL.value.trim()  || !inputEmailEL.value.trim() || !inputNameEL.value.trim()) {
        alert("Preencher todos os campos de contato")
        return
    }
    
    let userData = {
        name: inputNameEL.value,
        email: inputEmailEL.value,
        msg: inputMsgEL.value
    }

    clearInputFields()
    console.log(userData)
    await fetch("/teste2" , {
        method: 'POST',
        clientData: userData
    })

    


}

addEvents()