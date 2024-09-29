class ReactiveTable {
    constructor(initialArray = []) {
        // Инициализация массива данных и массивов слушателей
        this._array = initialArray;
        this.listeners = [];
    }

    // Геттер для доступа к массиву
    get array() {
        return this._array;
    }

    // Сеттер для установки нового массива и уведомления слушателей
    set array(newArray) {
        this._array = newArray;
        this.notify();
    }

    // Метод для добавления нового элемента в массив
    addItem(item) {
        this._array.push(item);
        this.notify(); // Уведомляем слушателей о изменении
    }

    // Метод для удаления элемента по индексу
    removeItem(index) {
        this._array.splice(index, 1);
        this.notify(); // Уведомляем слушателей о изменении
    }

    // Метод для редактирования элемента по индексу с новыми значениями
    editItem(index, newValues) {
        // Обновляем элемент массива по заданному индексу, объединяя существующие значения с новыми значениями
        this._array[index] = {...this._array[index], ...newValues};
        this.notify(); // Уведомляем слушателей о изменении
    }

    // Метод для добавления слушателя
    addListener(listener) {
        this.listeners.push(listener);
    }

    // Метод для уведомления всех слушателей о изменении массива
    notify() {
        this.listeners.forEach(listener => listener(this._array));
    }

    // Метод для связывания таблицы с обновлениями массива
    bindTable(tbody) {
        //Добавляем слушателя
        this.addListener((newArray) => {
            tbody.innerHTML = ''; // Очищаем текущие строки таблицы
            newArray.forEach((item, index) => {
                const rowHTML = `
                <tr>
                    ${Object.values(item).map(value => `<td>${value}</td>`).join('')}
                </tr>
                `;
                tbody.insertAdjacentHTML('beforeend', rowHTML); // Добавляем новую строку в таблицу
            });
        });
    }
}
