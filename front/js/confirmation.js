const orderId = getOrderId();

displayOrderId(orderId);
cleanAllFromCach();

function getOrderId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}

function displayOrderId(orderId) {
  const elementOrderId = document.getElementById("orderId");
  elementOrderId.textContent = orderId;
}
function cleanAllFromCach() {
  const cach = window.localStorage;
  cach.clear();
}
