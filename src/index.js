document.addEventListener("DOMContentLoaded", function() {
    function fetchCategories() {

        let random = Math.floor(Math.random() * 10000)
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
            let cells = Array.from(cellsData)
            cells.forEach(cell => cell.setAttribute('category-id', data[i].id))

        }
        
        //Fetch data on cell click
        let cellHTML = document.querySelectorAll('.cell');
        let cellQ = Array.from(cellHTML)

        for (let cell of cellQ) {
            cell.addEventListener('click', () => {

                let value = cell.getAttribute('value')
                let category = cell.getAttribute('category-id')

                fetch(`https://jservice.io//api/clues?value=${value}&category=${category}`)
                .then(response => response.json())
                .then(clue => renderClue(clue[0]))

                function renderClue(clue) {


                    //Getting question and answer
                    const question = clue.question
                    const clueAnswer = clue.answer
                    
                    //Add values
                    const h3 = document.querySelector('#questionPopUp h3')
                    h3.innerText = question

                    
                    //Open Modal
                    const modal = document.querySelector("#questionPopUp");
                    modal.style.display = "block";


                    //Submit Form
                    const questionForm = document.getElementById('questionForm')
                    questionForm.addEventListener('submit', (e) => {

                        e.preventDefault()
                        questionForm.style.display = "none";

                        const userAnswer = e.target.answer.value
                        const closeBox = document.querySelector('.close')
                        closeBox.style.display = 'block';
                        // When the user clicks on <span> (x), close the modal
                        closeBox.onclick = function() {
                        modal.style.display = "none";
                        cell.classList.add('disabled');
                        }

                        if (userAnswer === clueAnswer) {
                            const h4 = document.createElement('h4');
                            h4.innerText = 'CORRECT!'
                            h4.style.color = 'green'
                            h3.appendChild(h4)
                        }
                        else {
                            const h4 = document.createElement('h4');
                            h4.innerText = 'INCORRECT!'
                            h4.style.color = 'red'
                            h3.appendChild(h4)

                            const h5 = document.createElement('h5');
                            h5.innerText = clueAnswer
                            h4.appendChild(h5);
                   


                        }


                    })
                    



                }


            })

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



// //Adding Modal

// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }



// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }


