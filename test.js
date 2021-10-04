class UserController {
    constructor(formId, tableId, formEditId) {
        this._formEl = document.getElementById(formId)
        this._tableEl = document.getElementById(tableId)
        this._formEditEl = document.getElementById(formEditId)
        this._userTeste;
        this._numIdCont = 0
        this._userList
        this.onSubmit()
        this.onUserUpdate()
        this.onEditCancel()
        

        
    }


    saveSessionStore() {

        sessionStorage.setItem("user" , JSON.stringify(this._userList))
    }

    onSubmit(){

        this._formEl.addEventListener("submit", event => {

            event.preventDefault();
            let formIdCreate = [...this._formEl.elements];
            let submitBtn = this._formEl.querySelector("[type='submit")
            let userData = this.getValues(formIdCreate);
            if(!userData) {
                return false
            }
            submitBtn.disabled = true
            this.getPhoto().then(
            /* 1º func de then caso POSITIVO*/
            (content) => {

                    userData.userPhoto = content

                    this.addLine(userData);
                    this.updateUserCounter() 
                    this._formEl.reset()
                    submitBtn.disabled = false
                   
                },

                /* 2º func de then caso ERRO*/
                (e) => {

                    console.error(e)
                }

            )
            })
    }


    onEditCancel() {

        let cancelBtn = this._formEditEl.querySelector('.btn-edit-cancel');
        cancelBtn.addEventListener('click' , e=>{

            
            e.preventDefault();
            document.querySelector('#form-edit').classList.toggle('disable-form')
            this._formEditEl.reset()
            document.querySelector('#form-register').classList.toggle('disable-form')
            


        })

       
    }

    onUserUpdate() {
        this._formEditEl.addEventListener("submit", e=>{
            e.preventDefault();
            let submitBtn = this._formEditEl.querySelector("[type='submit")
            submitBtn.disabled = true
            let formIdUpdate= [...this._formEditEl.elements];
            let userDataUpdate= this.getValues(formIdUpdate)
            
            
            let index = this._formEditEl.dataset.trIndex;

            let tr = this._tableEl.rows[index];
            tr.dataset.user = JSON.stringify(userDataUpdate);

            tr.innerHTML =   `
            <tr>
                <td><img src=${userDataUpdate.userPhoto} alt="User Image" class="img-circle img-sm"></td>
                <td>${userDataUpdate.userName}</td>
                <td>${userDataUpdate.userEmail}</td>
                <td>${userDataUpdate.userAdmin}</td>
                <td>${userDataUpdate.userRegisterDate}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat edit-btn">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat delete-btn">Excluir</button>
                </td>
            </tr>
            `
           
            
            


            alert('salvando')
            this._formEditEl.reset()
            this.updateUserCounter()
            this._formEl.reset()
            document.querySelector('#form-register').classList.toggle('disable-form')
            submitBtn.disabled = false
            
           
        })
        
    }


    updateUserCounter() {

        let adminNum = 0;
        let userNum = 0;
        let userListTemp = [];
       
        [...this._tableEl.children].forEach(tr=>{

            userNum++;

            let user = JSON.parse(tr.dataset.user)
            
            
            if(user._userAdmin == "Admin") adminNum++;

            userListTemp.push(user)

            
            this.userList = userListTemp



        })

        document.querySelector('#user-number-field').innerHTML = userNum;
        document.querySelector('#admin-number-field').innerHTML = adminNum;
        this.saveSessionStore()

        



    }

    getPhoto(){
        return new Promise((resolve, reject)=> {

            let fileReader = new FileReader();

            let elements = [...this._formEl.elements].filter(item => {

                if (item.name === 'photo') {
                    return item;
                }

            });

            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result)
                

            };

            fileReader.onerror = (e) => {

                reject(e)
            }
            

            if(file) {
            fileReader.readAsDataURL(file);
            } else {
                resolve("dist/img/noavatar.jpg")
            }


        })
        
       
        
    }


    getValues(form) {

        let user = {};
        let isFormValid = true;
        
        
        form.forEach( field=>{

            if (['name','email','password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error')
                isFormValid = false

            }
            if (field.name === "gender") {
    
                if (field.checked) {
                    user[field.name] = field.value
                }
    
            } else {
    
                user[field.name] = field.value
    
            }
    
            if(field.name === "admin") {
                if(field.checked) {
                    user[field.name] = "Admin"
                } else {
                    user[field.name] = "User"
                }
            }

            
            
        })

        if (!isFormValid) {
            return false
        }

        let clock = new Timer;
        let regiDate = clock.displayFullDate
        
        return new User(user.name, user.gender, user.birth,user.country,user.email,user.password,user.photo,user.admin, regiDate);
        
    }


    
    addLine(dataUser) {

        let tr = document.createElement('tr'); 
        
        
        
        tr.dataset.user = JSON.stringify(dataUser)
        
        let newDataUser = JSON.parse(tr.dataset.user);
            console.log(newDataUser);
            
       
        tr.innerHTML =   `
            <tr>
                <td><img src=${dataUser.userPhoto} alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.userName}</td>
                <td>${dataUser.userEmail}</td>
                <td>${dataUser.userAdmin}</td>
                <td>${dataUser.userRegisterDate}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat edit-btn">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat delete-btn">Excluir</button>
                </td>
            </tr>
        `

        this.addEventsTr(tr, newDataUser)


        this._tableEl.append(tr) 

    }

    addEventsTr(tr, newDataUser) {

        tr.querySelector('.delete-btn').addEventListener('click', e=>{
            let x = confirm("deseja remover o usuario: " + dataUser.userName + ' ? ')
            if(x == true) {
                tr.parentNode.removeChild(tr)
                this.updateUserCounter()
                alert('usuario removido')
            }
            

            
            

        })

        tr.querySelector('.edit-btn').addEventListener('click', e=> {

            let form = this._formEditEl;
            document.querySelector('#form-register').classList.toggle('disable-form')
            

            form.dataset.trIndex = tr.sectionRowIndex;
            alert('editar usuario')

            for (let name in newDataUser) {
                let nameFix = name.replace("_user", "").toLowerCase() // converte EX: _userName -> name
  
                let field = this._formEditEl.querySelector("[name=" + nameFix + "]");

                if (field) {

                    switch (field.type) {
                        case 'file':
                            continue;
                            break;
                        case 'radio':
                            field = this._formEditEl.querySelector("[name=" + nameFix + "][value=" + newDataUser[name] + "]");
                            field.checked = true;
                        break;
                        case 'checkbox':
                            if(newDataUser[name] == "Admin")
                            field.checked = true;
                        break;

                        default:
                            field.value = newDataUser[name];

                    }

                    if (field.type === "file") continue;

                    field.value = newDataUser[name];
                }


            }
            console.log(newDataUser)
            document.querySelector('#form-edit').classList.toggle('disable-form')
        })

    }

    getValuesEdit(dataUser) {

        dataUser.forEach(value =>{
            
        })
    }
    

    set userList(value) {
        this._userList = value
    }

    
}