document.addEventListener("DOMContentLoaded", function() {
    function fetchCategories() {

        let random = Math.floor(Math.random() * 1000)
        let randomAddress = `https://jservice.io//api/categories?count=6&offset=53`

        fetch(randomAddress)
        .then(response => response.json())
        .then(data => renderCategories(data))
    }

    fetchCategories()

    function renderCategories(data) {


        //Adds category ID to cells
        const columns = Array.from(document.getElementsByClassName('question-column'))
       
        for (let i = 0;  i <= 5;  i++){ //loop through 6 times (for each category and row)

            cellsData = columns[i].getElementsByClassName('cell')
            let cells = Array.from(cellsData)
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

    //Add theme music
    var audio = new Audio('./assets/Jeopardy_Intro.mp3');
    document.addEventListener('click', () => audio.play() )

    //Fetch data on cell click
    let cellHTML = document.querySelectorAll('.cell');
    let cellQ = Array.from(cellHTML)
    let score = 0;
    let scoreSpan = document.querySelector('.score-count')
    scoreSpan.innerText = score
    let turns = 30

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
                const clueAnswer = clue.answer.replace(/[^\w\s!?]/g,'')
                clueAnswer.replace('<i>','')
                clueAnswer.replace('</i>','')

                
                //Add values
                const h3 = document.querySelector('#questionPopUp h3')
                const h4 = document.createElement('h4');
                const h5 = document.createElement('h5');
                h3.innerText = question

                
                //Open Modal
                const modal = document.querySelector("#questionPopUp");
                modal.style.display = "block";


                //Submit Form
                const questionForm = document.getElementById('questionForm')
                const closeBox = document.querySelector('.close')
                const modalContent = document.querySelector('.modal-content')


                questionForm.addEventListener('submit', function renderAnswer (e) {
                    
                    e.preventDefault()                    

                    questionForm.style.display = "none";
                    const userAnswer = e.target.answer.value

                    //subtracts turn
                    turns--

                    closeBox.style.display = 'block';
                    
                    if (userAnswer.toLowerCase() === clueAnswer.toLowerCase()) {
                        
                        h4.innerText = 'CORRECT!'
                        h4.style.color = 'green'
                        modalContent.appendChild(h4)

                        score = score + Number.parseInt(value)
                        scoreSpan.innerText = score

                    }
                    else {
                        
                        h4.innerText = 'INCORRECT!'
                        h4.style.color = 'red'
                        modalContent.appendChild(h4)
        
                        h5.innerText = clueAnswer
                        modalContent.appendChild(h5);
            

                    }



                if (turns > 0) {                    

                    closeBox.addEventListener('click', () =>  {

                        questionForm.style.display = 'block';
                        h4.remove()
                        h5.remove()
                        modal.style.display = "none";
                        cell.classList.add('disabled');
                        closeBox.style.display = 'none';

                    }) 
                    
                }
                else {


                    finishBtn = document.createElement('button')
                    finishBtn.setAttribute('type', 'button')
                    finishBtn.textContent = 'Finish Game!'
                    finishBtn.className = 'finish-btn'
                    modalContent.appendChild(finishBtn)

                    finishBtn.addEventListener('click', () => {

                        h3.textContent = `Final Score: ${score}`
                        h4.remove()
                        h5.remove()
                        finishBtn.remove()

                        newGame = document.createElement('button')
                        newGame.setAttribute('type', 'button')
                        newGame.textContent = 'Play Again?'
                        newGame.className = 'newGame-btn'
                        modalContent.appendChild(newGame)
                        
                        newGame.addEventListener('click', () => {

                            document.location.reload(true)

                        } )



                    })
                    



                }



                    questionForm.reset()


                }, {once: true} )



                

            }


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

