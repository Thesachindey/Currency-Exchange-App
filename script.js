// Currency Exchange API
const base_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#fromBtn");
const fromCurr = document.querySelector("#from ")
const toCurr = document.querySelector("#to ")
const msg =document.querySelector(".msg");




//section for: Country Option & it's Flag
for (const select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "BDT") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}

// section for:flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


// Update Exchange Rate---> & API
const updateExchangeRate= async ()=>{

    let amount = document.getElementById("inputA");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";

    }

    // Update URL structure
    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rete = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount= amtVal*rete;
    console.log(response)

    msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;

    
}

//section for: from btn
btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //from ayr sokol kaj privent hoby 
    updateExchangeRate();
});

//first time document lode ---> Update
window.addEventListener("load", () => {
    updateExchangeRate();
});