class newTable extends ReactiveTable {
    bindTable(tbody) {
        this.addListener((newArray) => {
            tbody.innerHTML = '';
            newArray.forEach((item, index) => {
                const rowHTML = `
                <tr>
                    ${Object.values(item).map(value => `<td>${value}</td>`).join('')}
                    <td>
                        <button onclick="editName(${index})">Изменить имя</button>&nbsp; 
                        <button onclick="editAge(${index})">Изменить возраст</button>&nbsp;
                        <button onclick="deleteRow(${index})">Удалить</button>
                    </td>
                </tr>
                `;
                tbody.insertAdjacentHTML('beforeend', rowHTML);
            });
        });
    }
}

const reactiveTable = new newTable();

// Привязываем таблицу к массиву
const tbody = document.getElementById('table-body');
reactiveTable.bindTable(tbody);

let inputData = [
    {name: 'Петр', age: 28},
    {name: 'Мария', age: 35},
    {name: 'Иван', age: 33},
    {name: 'Анна', age: 25},
];

//Заполнение таблицы из входного массива
reactiveTable.array = inputData;

// Обработчик для удаления элемента
deleteRow = function (index) {
    reactiveTable.removeItem(index); // Удаляем элемент из массива
}

// Обработчик для изменения имени
editName = function (index) {
    const item = reactiveTable.array[index]; //Получаем текущую запись
    const newName = prompt("Введите новое имя:", item.name);
    if (newName !== null) {
        // Обновить элемент
        reactiveTable.editItem(index, {name: newName}); //Обновляем текущую запись
    }
}

// Обработчик для изменения возраста
editAge = function (index) {
    const item = reactiveTable.array[index]; //Получаем текущую запись
    const newAge = prompt("Введите новый возраст:", item.age);
    if (newAge !== null) {
        // Обновить элемент
        reactiveTable.editItem(index, {age: newAge}); //Обновляем текущую запись
    }
}

// Обработчик для добавления элемента
addItem = function () {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    if (name && !isNaN(age)) {
        reactiveTable.addItem({name, age}); //Добавляем новую запись
        // Очищаем поля ввода
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
    }
}