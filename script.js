// calling inputs
let budgetInput = document.querySelector('.budgetInput');
let expenseInput = document.querySelector('.expenseInput');
let expenseAmountInput = document.querySelector('.expenseAmountInput');

// calling buttons of inputs
let budgetBtn = document.querySelector('.budgetBtn');
let expenseBtn = document.querySelector('.expenseBtn');

// calling calcuating div
let budget = document.querySelector('.budget');
let expense = document.querySelector('.expense');
let balance = document.querySelector('.balance');
let expenseList = document.querySelector('.expenseList');

// for alert 
let budgetAlert = document.querySelector('.budgetAlert');
budgetAlert.style.textAlign = 'center'

let expenseAlert = document.querySelector('.expenseAlert');
expenseAlert.style.textAlign = 'center';

let listAlert = document.querySelector('.listAlert');
listAlert.style.textAlign = 'center';

// for expense table
const expenseListHead = document.querySelector('.expenseListHead');
const expenseBody = document.querySelector('.expenseBody');
expenseBody.style.width = '100%';
expenseListHead.style.color = 'white';
expenseListHead.style.fontSize = '1.1rem';
expenseListHead.style.padding = '2rem';
expenseBody.style.fontWeight = 'bold';



budgetBtn.addEventListener('click', () => {

    if (budgetInput.value == '') {
        budgetAlert.innerHTML = `<div class="alert alert-danger" role="alert">
            Value cannot empty
          </div>`;
        setTimeout(() => {
            budgetAlert.innerHTML = '';
        }, 2000);
        budgetInput.value = '';
    }

    else if (budgetInput.value < 0) {
        budgetAlert.innerHTML = `<div class="alert alert-danger" role="alert">
        Value cannot negative
      </div>`;
        setTimeout(() => {
            budgetAlert.innerHTML = '';
        }, 2000);
        budgetInput.value = '';
    }

    else {
        budget.textContent = parseInt(budgetInput.value);
        balance.textContent = parseInt(budgetInput.value);
        if (balance.innerText == '0') {
            balance.parentElement.style.color = 'red';
        }
        else {
            balance.parentElement.style.color = 'green';
        }
        budgetInput.value = '';
    }
});

expenseBtn.addEventListener('click', () => {
    if (expenseAmountInput.value == '' || expenseInput.value == '') {
        expenseAlert.innerHTML = `<div class="alert alert-danger" role="alert">
        Value cannot empty
      </div>`;
        setTimeout(() => {
            expenseAlert.innerHTML = '';
        }, 2000);
    }
    else if (expenseAmountInput.value < 0) {
        expenseAlert.innerHTML = `<div class="alert alert-danger" role="alert">
        Value cannot negative
      </div>`;
        setTimeout(() => {
            expenseAlert.innerHTML = '';
        }, 2000);
    }
    else {
        expense.textContent = parseInt(expenseAmountInput.value) + parseInt(expense.textContent);
        balance.textContent = parseInt(budget.textContent) - parseInt(expense.textContent);

        if (balance.innerText == '0' || balance.innerText < '0') {
            balance.parentElement.style.color = 'red';
        }
        else {
            balance.parentElement.style.color = 'green';
        }
        expenseList.style.visibility = 'visible';

        showExpenseTable();

        expenseAmountInput.value = '';
        expenseInput.value = '';
    }

});


function showExpenseTable() {

    const newRow = document.createElement('tr');
    newRow.classList.add('newRowTr');


    const newExpenseName = document.createElement('td');
    newExpenseName.classList.add('newExpenseNameTd');
    newExpenseName.innerHTML = expenseInput.value;
    newRow.appendChild(newExpenseName);

    const newExpenseAmount = document.createElement('td');
    newExpenseAmount.classList.add('newExpenseAmountTd');
    newExpenseAmount.innerHTML = expenseAmountInput.value;
    newRow.appendChild(newExpenseAmount);

    // adding editing and deleting button
    const newEdit = document.createElement('td');
    newEdit.innerHTML = `<i class="fas fa-pen" onclick="editing(this)"></i>`;
    newEdit.style.color = 'darkblue';
    newEdit.style.cursor = 'pointer';
    newRow.appendChild(newEdit);

    const newDelete = document.createElement('td');
    newDelete.innerHTML = `<i class="fas fa-trash" onclick="deleting(this)"></i>`;
    newDelete.style.color = 'red';
    newDelete.style.cursor = 'pointer';
    newRow.appendChild(newDelete);

    expenseBody.appendChild(newRow);
}


// for editing

function editing(e) {
    expenseInput.value= e.parentElement.previousSibling.previousSibling.textContent;
    expenseAmountInput.value= e.parentElement.previousSibling.textContent;
    e.parentElement.parentElement.remove();
    expense.textContent = parseInt(expense.textContent) - parseInt(e.parentElement.previousSibling.textContent);
    balance.textContent = parseInt(balance.textContent) + parseInt(e.parentElement.previousSibling.textContent);
    listAlert.innerHTML = `<div class="alert alert-primary" role="alert">
    Moved to editor...
  </div>`;
    setTimeout(() => {
        listAlert.innerHTML = '';
    }, 2000);
}



// for deleteing
function deleting(e) {
    e.parentElement.parentElement.remove();
    listAlert.innerHTML = `<div class="alert alert-warning" role="alert">
    History Deleted...
  </div>`;
    setTimeout(() => {
        listAlert.innerHTML = '';
    }, 2000);
}


