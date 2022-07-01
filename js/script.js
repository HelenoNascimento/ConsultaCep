const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addessInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const reginInput = document.querySelector("#region");

const formInputs = document.querySelectorAll("[data-input]");
const fadeElement = document.querySelector("#fade");
const closeButton = document.querySelector("#close-message");

const chageThemeBtn = document.querySelector("#change-theme");


// validate CEP input

cepInput.addEventListener("keypress", (e)=>{
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    // allow only numbers
    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});

// Get address event
cepInput.addEventListener("keyup",(e)=>{
    const inputValue = e.target.value;

    //check if we have the correct length
    if(inputValue.length ===8){
        getAddress(inputValue);
    }
});

// Get customer address from API

const getAddress = async (cep) =>{
    toggleLoader();
    cepInput.blur();
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    //show error and reset form
    if(data.erro == "true"){
        if(!addessInput.hasAttribute("disabled")){
            togleDisabled();
        }
        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP invalido, tente novamente")
        return;
    }
    if(addessInput.value ===""){
        togleDisabled();
    }
 
    addessInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    reginInput.value = data.uf;
    toggleLoader();
};

//add or remove disable atribute
const togleDisabled = () =>{
    if(reginInput.hasAttribute("disabled")){
        formInputs.forEach((input)=>{
            input.removeAttribute("disabled");
        })
    }else{
        formInputs.forEach((input)=>{
            input.setAttribute("disabled","disabled");
        })
    }
}

// Show or hide loader

const toggleLoader = () =>{

    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
}

//show or hide message

const toggleMessage = (msg) =>{
    const messageElement = document.querySelector("#message")
    const messageElementText = document.querySelector("#message p ");

    messageElementText.innerText = msg;
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
}

// close message modal
closeButton.addEventListener("click",()=>toggleMessage());

//save address

addressForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    toggleLoader();
    setTimeout(() =>{
        toggleLoader();
        toggleMessage("Endereço salvo com sucesso!");
        addressForm.reset();
        togleDisabled();
    },1500)
})




// parte do tema
chageThemeBtn.addEventListener("change", function(){
    togleLightMode();

    //save or remove light mode
    localStorage.removeItem("light");

    if(document.body.classList.contains("light")){
        localStorage.setItem("light",1);
    }
})

//load light or dark mode
function loadTheme(){
    const lightMode = localStorage.getItem("light");

    if(lightMode){
        togleLightMode();
    }
}
loadTheme();
function togleLightMode(){
    document.body.classList.toggle("light");
}
//togleLightMode();