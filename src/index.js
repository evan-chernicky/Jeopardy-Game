document.addEventListener("DOMContentLoaded", function() {
    function fetchCategories() {
        fetch('https://jservice.io//api/categories?count=6&offset=58')
        .then(response => response.json())
        .then(data => renderCategories(data))
    }
    console.log()
    fetchCategories();

    function renderCategories(data) {
        data.forEach(categoryData => {
            const categoryRow = document.getElementById('categoryRow')
            const cell = document.createElement('div')
            cell.className = 'cell'
            cell.innerText = categoryData.title
            categoryRow.appendChild(cell)
        })
    }
})