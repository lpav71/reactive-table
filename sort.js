let currentSortColumn = null;
let sortDirection = 0; // 0 - нет, 1 - по возрастанию, -1 - по убыванию

function sortTable(column) {
    // Определяем новое направление сортировки
    let newDirection = 0;

    if (currentSortColumn === column) {
        newDirection = sortDirection === 1 ? -1 : (sortDirection === -1 ? 0 : 1);
    } else {
        newDirection = 1; // по возрастанию
    }

    sortDirection = newDirection;
    currentSortColumn = column;

    // Скрываем все иконки сортировки
    document.querySelectorAll('.sort-icon').forEach(icon => icon.style.display = 'none');

    // Устанавливаем значок для текущей колонки
    const sortIcon = document.getElementById(`sort-${column}`);
    if (sortDirection === 1) {
        sortIcon.innerHTML = '⬆️'; // по возрастанию
        sortIcon.style.display = 'inline';
    } else if (sortDirection === -1) {
        sortIcon.innerHTML = '⬇️'; // по убыванию
        sortIcon.style.display = 'inline';
    }

    // Сортируем массив в классе ReactiveTable
    reactiveTable.sort(column, sortDirection === 1 ? 'asc' : 'desc');
}