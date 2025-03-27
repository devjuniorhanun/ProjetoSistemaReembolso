// Pegando os valores de amount
const amount = document.getElementById("amount")

// Manipulando o input amount para receber somente números
amount.oninput = () => {
  // Recebe o valor digitado, e retira as letras, deixando somente os números
  let value = amount.value.replace(/\D/g, "")

  // Transforma o valor inserido em centavos
  value = Number(value) / 100

  // Retorna o valor digitado sem as letras
  amount.value = formatCurrencyBRL(value)
}

// Função para formatar o valor
function formatCurrencyBRL(value) {
  // Formata o valor para moeda brasileira
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  return value
  //return value.replace("R$", "")

}