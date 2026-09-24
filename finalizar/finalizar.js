document.getElementById("checkout-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const payment = document.querySelector('input[name="payment"]:checked');

  if (address && city && state && payment) {
    document.getElementById("checkout-form").classList.add("hidden");
    document.getElementById("confirmation-message").classList.remove("hidden");
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});
