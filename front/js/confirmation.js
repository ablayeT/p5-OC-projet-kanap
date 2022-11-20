const orderId = getOrderId();
afficherOrderId();
supprimeToutCach();
function getOrderId() {
  var url = new URL(window.location.href);
  var orderId = url.searchParams.get("orderId");
  return url;
}

function afficherOrderId(orderId) {
  const elementOrderId = document.getElementById("#orderId");
  elementOrderId.textContent = orderId;
}
function supprimeToutCach() {
  const cache = window.localStorage;
  cache.clear();
}
