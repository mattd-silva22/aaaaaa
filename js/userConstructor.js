
// const formId;
// const formEl;
// const nameInputId;
// const orderInputId;

const testBtn = document.querySelector('#testBtn');
testBtn.addEventListener('click', ()=>{
   console.log(getValuesFromForm())
})

createId = ()=> {
    
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

}

getValuesFromForm = (nameInput,orderInput)=> {
    let user = {}

    user = {
        uid: createId(),
        name: 'joao',//nameInput.value,
        order: '23'//orderInput.value,
    }

    return user


}