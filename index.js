const taskContainer = document.querySelector(".task__container");

let globalStore = [];


const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id}>
                <div class="card">
                    <div class="card-header d-flex justify-content-end gap-2">
                        <button type="button" class="btn btn-outline-success">
                            <i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this , arguments)">
                            <i class="fas fa-trash"id=${taskData.id} onclick="deleteCard.apply(this , arguments)"></i>
                        </button>
                    </div>
                    <img src=${taskData.imageUrl} class="card-img-top" alt="...">


                    <div class="card-body">
                      <h5 class="card-title">${taskData.taskTitle}</h5>
                      <p class="card-text">${taskData.taskDescription}</p>
                      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                    </div>
                    <div class="card-footer text-muted">
                        <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
                    </div>
                  </div>
            </div>
`;

const loadInitialCardData = () => {
    // Localstorage to get tasky card data
    const getCardData = localStorage.getItem("tasky");

    // Convert from string To normal object
    const {cards} = JSON.parse(getCardData);

    // loop over those array of task object to create HTML card, 
    cards.map((cardObject) => {

        // Injected it to Dom
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

        // Update our global store
        globalStore.push(cardObject);
    })
    
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,  // Every second unique number for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
    

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);

    // Provide Object to String --> Stringify

    localStorage.setItem("tasky" , JSON.stringify({cards:globalStore}));

};

const deleteCard = (event) => {
    event = window.event;
    //  ID
    const targetId = event.target.id;
    const tagname = event.target.tagName; // BUTTON

    // Match the id of the element with the id inside the globalstore
    // If match found remove it
    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetId);

    localStorage.setItem("tasky" , JSON.stringify({cards:globalStore}));

    //  We have updated array of cards
    // Contact Parent

    if(tagname === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
    

};
// Close the model after save ->1-line

// Parent Object
// Browser --> Window
// DOM --->  Document

// Issues to be fixed

// Page refresh will cause the data to be deleted ---> Local Storage

// API --> Application Programing Interface

// Localstorage is --> Application
// Access application --> Programing
// Interface as a middle man

// Localstorage --> With some method --> JavaScript


// Features
// Delete the card
// Edit the card
//  Open the card