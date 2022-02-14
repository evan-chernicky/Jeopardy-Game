document.addEventListener("DOMContentLoaded", function() {
    function fetchCategories() {

        let random = Math.floor(Math.random() * (10000 - 0 + 1)) + 0;
        let randomAddress = `https://jservice.io//api/categories?count=6&offset=${random}`

        fetch(randomAddress)
        .then(response => response.json())
        .then(data => renderCategories(data))
    }

    fetchCategories()

    function renderCategories(data) {


        //Adds category ID to cells
        const columnsData = document.getElementsByClassName('question-column')
        const columns = Array.from(columnsData)
       
        for (let i = 0;  i <= 5;  i++){ //loop through 6 times (for each category and row)

            cellsData = columns[i].getElementsByClassName('cell')
            cells = Array.from(cellsData)
            cells.forEach(cell => cell.setAttribute('category-id', data[i].id))

        }
        

        //Adds categories to category row
        data.forEach(categoryData => {

            const categoryRow = document.getElementById('categoryRow')
            const cell = document.createElement('div')
            cell.className = 'cell'
            cell.innerText = categoryData.title
            categoryRow.appendChild(cell)

        })

    }

})


