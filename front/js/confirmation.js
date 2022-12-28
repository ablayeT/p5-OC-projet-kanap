const orderId = getOrderId();

displayOrderId(orderId);
supprimeToutCach();

function getOrderId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}

function displayOrderId(orderId) {
  const elementOrderId = document.getElementById("orderId");
  elementOrderId.textContent = orderId;
}
function supprimeToutCach() {
  const cache = window.localStorage;
  cache.clear();
}
