


const nameInput = document.querySelector("#nameInput");
const orderInput = document.querySelector("#orderInput") ;

const tableEl = document.querySelector("#client-table");

const addBtn = document.querySelector('#add-btn');
const clientCounterEl = document.querySelector("#pessoas-value")
addBtn.addEventListener('click', (event)=>{
   onSubmit(event);
})



onSubmit = (event)=> {

    event.preventDefault();
    clientData = getValuesFromForm(event);
    console.log(clientData);
    renderClientTable();
    updateCounters();
}

createId = ()=> {
    
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

}

calcPrice = (value)=> {
    return parseFloat(parseInt(value) * 0.5)
}

getValuesFromForm = (event)=> {
   
    let user = {}

    if( nameInput.value.trim() == "" | orderInput.value.trim() == "") {
        alert("istu no possible! favor não deixe campo em branco")
        return
    }

    user = {
        uid: createId(),
        name: nameInput.value,
        order: orderInput.value,
        totalPrice: calcPrice(orderInput.value)
    };

    nameInput.value = "";
    orderInput.value = "";

    clientList.push(user);
    return clientList;

}




renderClientTable = ()=> {

    tableEl.innerHTML = "";

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

updateCounters = ()=> {
    updateClientCounter(clientList)
    updateOrderCounter(clientList)
    updateMoneyCounter(clientList)
}

updateClientCounter = (list)=>{
    let clientCounter = list.length
    clientCounterEl.innerHTML = clientCounter
    
}

updateOrderCounter = (list)=>{
    let orderList = []

    list.map( (item)=>{

        orderList.push = parseInt(item.order);
    })

    console.log(orderList)
    
}

updateMoneyCounter = (list)=>{
    let MoneyList = []

    list.map( (item)=>{

        MoneyList.push = parseInt(item.totaPrice);
    })

    console.log(MoneyList)
    
}


const testClient = {
    uid: createId(),
    name: "Matheus Barretto",
    order: "10",
    totalPrice: parseFloat( 10 * 0.5)
}

const testClient2 = {
    uid: createId(),
    name: "João das Neves",
    order: "7",
    totalPrice: parseFloat( 7 * 0.5)
}

var clientList = [testClient, testClient2 ];

updateCounters();
renderClientTable();