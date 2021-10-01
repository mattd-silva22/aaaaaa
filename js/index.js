hamBtn = document.querySelector("#ham-btn");
navResp = document.querySelector("#nav-resp")


hamBtn.addEventListener("click" , ()=> {
    hamBtn.classList.toggle("active")
    navResp.classList.toggle("active")
})