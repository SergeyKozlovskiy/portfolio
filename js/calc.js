' use strict ';
const start = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    inputAll = document.querySelectorAll('input[type = text]'),
    btnPlus1 = document.querySelector('.income_add'),
    btnPlus2 = document.querySelector('.expenses_add'),
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    budgetDay = document.querySelector('.budget_day-value'),
    budgetMonth = document.querySelector('.budget_month-value'),
    expensesMonth = document.querySelector('.expenses_month-value'),
    additionalIncome = document.querySelector('.additional_income-value'),
    additionalExpenses = document.querySelector('.additional_expenses-value'),
    incomePeriod = document.querySelector('.income_period-value'),
    targetMonth = document.querySelector('.target_month-value'),
    salary = document.querySelector('.salary-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    incomeTitle = document.querySelector('.income-title'),
    incT = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTittle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    noWhiteSpace = document.querySelectorAll('.no_whitespace');

class AppData {
    constructor() {
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.accumulatedMonth = 0;
        this.targetMonth = 0;
        this.statusIncome = '';
    }
    start() {
        if (salary.value === '') {
            start.setAttribute('disable', '');
            return;
        } else {
            start.removeAttribute('disable', '');
        }
        noWhiteSpace.forEach(el => {
            let a = el.value.replace(/\s/g, '');
            el.value = a;
        });
        this.budget = +salary.value;
        this.getIncome();
        this.getExpenses();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.getTargetMonth();
        this.get(additionalExpensesItem, this.addExpenses);
        this.get(additionalIncomeItem, this.addIncome);
        this.getCancel();
        this.showResult();
    }
    //считает Дневной бюджет, Доход за месяц
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    showResult() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = Math.ceil(this.targetMonth);
        incomePeriod.value = this.calcPeriod();
    }
    //Собирает данные с Обязательных расходов, зписывает в массив  expenses
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }
    get(elem, obj) {
        const _this = this;
        if (typeof elem.value === 'string') {
            elem = elem.value.split(',');
            elem.forEach(function (item) {
                item = item.trim();
                if (item !== '') {
                    obj.push(item);
                }
            });
        } else {
            elem.forEach(function (item) {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    obj.push(itemValue);
                }
            });
        }
    }
    //Собирает данные с Дополнительных доходов, зписывает в массив  income,суммирует доходы, записывает в incomeMonth
    getIncome() {
        incomeItem.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        });
    }
    //Суммирует расходы, записывает в expensesMonth
    getExpensesMonth() {
        for (let key in this.expenses) {
            if (typeof this.expenses[key] === 'number') {
                this.expensesMonth += this.expenses[key];
            }
        }
    }
    //Срок Достижения цели
    getTargetMonth() {
        this.targetMonth = targetAmount.value / appData.budgetMonth;
    }
    // Рассчет Накопления за период
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    getCancel() {
        let data = document.querySelector('.data');
        let dataChildren = data.querySelectorAll('*');
        for (let i = 0; i < dataChildren.length; i++) {
            if (salary.value === '') {
                dataChildren[i].setAttribute('disabled', '');
            }
        }
        start.style.display = 'none';
        cancel.style.display = 'block';
    }
    // Перезагрузка
    reset() {
        periodSelect.value = 1;
        let data = document.querySelector('.data');
        let dataChildren = data.querySelectorAll('*');

        for (let i = 0; i < dataChildren.length; i++) {
            if (salary.value === '') {
                dataChildren[i].removeAttribute('disabled');
            }
        }
        inputAll.forEach((item) => {
            item.value = '';
        });
        start.style.display = 'block';
        cancel.style.display = 'none';
    }
    //Отслеживание периода расчета, запуск всех Listener
    EventListeners() {
        start.addEventListener('click', appData.start.bind(appData));
        cancel.addEventListener('click', appData.reset);

        btnPlus1.addEventListener('click', function () {
            appData.addBlock(incomeItem, btnPlus1, '.income-items');
        });
        btnPlus2.addEventListener('click', function () {
            appData.addBlock(expensesItems, btnPlus2, '.expenses-items');
        });
        periodSelect.oninput = function () {
            periodAmount.innerHTML = periodSelect.value;
            incomePeriod.value = appData.calcPeriod();
        };
    }
    //Получение данных о вкладе
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value;
        }
    }
    addBlock(items, plus, elemName) {
        let cloneEl = items[0].cloneNode(true);
        cloneEl.children[0].value = '';
        cloneEl.children[1].value = '';
        items[0].parentNode.insertBefore(cloneEl, plus);
        items = document.querySelectorAll(elemName);
        if (items.length === 3) {
            plus.style.display = 'none';
        }
    }
}
//Функция для депозита
depositCheck.addEventListener('change', function () {
    if (depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        appData.deposit = 'true';
        depositBank.addEventListener('change', function () {
            let selectIndex = this.options[this.selectedIndex].value;
            if (selectIndex === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }
        });
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        appData.deposit = 'false';
    }
});

let appData = new AppData();
appData.EventListeners();
appData.getExpenses.apply(appData);