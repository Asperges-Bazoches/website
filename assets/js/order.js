var aspb = document.getElementById("aspb")
var aspv = document.getElementById("aspv")
var fraise = document.getElementById("fraise")

computeBill = function(){
  let price
  price =  aspb.value*8
  price += aspv.value*8
  price += fraise.value*8
  document.getElementById("price").innerText = price
}

for (elem of [aspb, aspv, fraise]) {
  elem.addEventListener('change', computeBill)
}

computeBill()
