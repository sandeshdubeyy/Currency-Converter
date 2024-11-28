const dropList = document.querySelectorAll(".droplist select");
const fromList = document.querySelector(".from select");
const toList = document.querySelector(".to select");
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_code) {
    let selected;

    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "INR" ? "selected" : "";
    }

    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change",e=>{
    loadFlag(e.target);
  });
}

const exchangeIcon=document.querySelector(".droplist .icon");
exchangeIcon.addEventListener("click",()=>{
    let tempcode=fromList.value;
    fromList.value=toList.value;
    toList.value=tempcode;
    loadFlag(fromList);
    loadFlag(toList);
    getExchangeRate();
})

let loadFlag = (element)=>{
    for(code in country_code){
        if(code==element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src=`https://flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }
}

let getExchangeRate = () => {
  exchangeRateTxt = document.querySelector(".exchangerate");
  const amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  exchangeRateTxt.innerText = "Getting exchange rate.....";
  let url = `https://v6.exchangerate-api.com/v6/1f468081a6399e2bbe169efa/latest/${fromList.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toList.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromList.value} = ${totalExchangeRate} ${toList.value}`;
    }).catch(()=>{
        exchangeRateTxt.innerText = "Something Went Wrong...";
    })
};

getButton.addEventListener("load", () => {
    getExchangeRate();
  });
  

getButton.addEventListener("click", e => {
  e.preventDefault();
  getExchangeRate();
});
