// Selecionando os elementos do forumlário.
// Pegando os dados do formulários
const form = document.querySelector("form")
// Pegando os valores de amount
const amount = document.getElementById("amount")
// Nome da despesa
const expense = document.getElementById("expense")
// Nome da Categoria da despeda
const category = document.getElementById("category")
// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
// Pega a quantidade de despesas
const expenseQuantity = document.querySelector("aside header p span")
// Pegga o valor total das despesas
const expenseTotal = document.querySelector("aside header h2")

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

// Função para adicionar uma nova despesa
function expenseAdd(newExpense) {
  try {
    // Cri o elemento para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li")
    // Passa a classe css no li
    expenseItem.classList.add("expense")
    // Cria o ícon da categoria.
    const expenseIcon = document.createElement("img")
    // Seta os atributos src e alt
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adicionando nome e categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor das despesas.
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "./img/remove.svg")
    removeIcon.setAttribute("alt", "Remover Despesa")

    // Adicionado as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)


    // Adiciona o item na lista
    expenseList.append(expenseItem)
  } catch (error) {
    alert("Não foi possível atualizar a lista de Despesas.")
    console.log(error)
  }
  // Atualiza as quantidades de despesas
  updateTotals()
  // Reseta o formulário
  formClean()
}

// Função para Atualizar os totais.
function updateTotals() {
  try {
    // Recuperando todos os itens (li) da Lista (ul)
    const items = expenseList.children
    // Atualiza a quantidade de itens da lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"}`

    // Variável para calcular o total das despesas
    let total = 0

    // Percorre cada item (li) da kusta (ul)
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      // Remove caracteres não numéricos e substitui a vírgula pelo ponto.
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      // Converter o valor para float
      value = parseFloat(value)

      // Verifica se é um número válido
      if (isNaN(value)) {
        return alert("Não foi possível calcular o total. O valor não parecer ser um número")
      }
      // Increamenta o valor total
      total += Number(value)
    }

    // Cria a span para adicionar o R$ formatado.
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteúdo do elemento.
    expenseTotal.innerHTML = ""

    // Exibe o total das despesas
    expenseTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")

  }
}



// Função para limpar o formulário
function formClean() {
  // Reseta o formulário
  expense.value = ""
  category.value = ""
  amount.value = ""

  // Seta o focus no expense
  expense.focus()
}