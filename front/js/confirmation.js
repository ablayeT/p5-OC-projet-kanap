const orderId = getOrderId();

console.log(or);
afficherOrderId(orderId);
supprimeToutCach();

function getOrderId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  orderId = parseInt(urlParams("orderId"));
  console.log(orderId);
  return orderId;
}

function afficherOrderId(orderId) {
  const elementOrderId = document.getElementById("orderId");
  elementOrderId.textContent = orderId;
}
function supprimeToutCach() {
  const cache = window.localStorage;
  cache.clear();
}
