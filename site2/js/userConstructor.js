
// const formId;
// const formEl;
const nameInput = document.querySelector("#nameInput");
const orderInput = document.querySelector("#orderInput") ;


const tableEl = document.querySelector("#client-table");

var clientList = [];

const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', (event)=>{
   onSubmit(event);
})

onSubmit = (event)=> {

    event.preventDefault();
    clientData = getValuesFromForm(event);
    console.log(clientData);
    renderClientTable();
}

createId = ()=> {
    
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

}

getValuesFromForm = (event)=> {

    
    let user = {}

    if( nameInput.value.trim() == "" | orderInput.value.trim() == "") {
        alert("istu no pode! favor não deixar campo em branco")
    }
    user = {
        uid: createId(),
        name: nameInput.value,
        order: orderInput.value,
        totalPrice: parseFloat(parseInt(orderInput.value) * 0.5)
    }

    nameInput.value = "";

    orderInput.value = "";

    clientList.push(user);

    return clientList;


}


renderClientTable = ()=> {





    clientList.map( item=> {
        let divEl = document.createElement('div');
        divEl.classList.add("client-table-line");
        divEl.innerHTML = `
        
        <div>
            <h1>${item.name}</h1>
            <div class="client-value">
                <p>Total paes: ${item.order} </p>
                <p>Total a pagar: ${item.totalPrice}</p>
            </div>
        </div>
        
        `;
        tableEl.append(divEl);

    })



}