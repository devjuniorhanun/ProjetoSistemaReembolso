// Selecionando os elementos do forumlário.
// Pegando os dados do formulários
const form = document.querySelector("form")
// Pegando os valores de amount
const amount = document.getElementById("amount")
// Nome da despesa
const expense = document.getElementById("expense")
// Nome da Categoria da despeda
const category = document.getElementById("category")

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

// Captura o evento de Submit do formulário para obter os valores
form.onsubmit = (event) => {
  // Desativando a submissão do formulário
  event.preventDefault()

  // Criando uma nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  // Adiciona uma nova despesa 
  expenseAdd(newExpense)
}
