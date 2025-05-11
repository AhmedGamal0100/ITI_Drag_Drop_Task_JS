var tasksSectionsOverall = document.querySelectorAll(".tasksSection");
var storage = [tasksSectionsOverall[0].innerHTML, tasksSectionsOverall[1].innerHTML, tasksSectionsOverall[2].innerHTML, tasksSectionsOverall[3].innerHTML];
var input = document.querySelector("#textVal");
var button = document.querySelector(".add-project-btn");
var i = 0;

// Prevent form refresh
document.forms[0].addEventListener("submit", function (e) {
    e.preventDefault()
})

// Check if progress storage contain data?
var containersStorage = JSON.parse(localStorage.getItem("containerStorage"));
if (containersStorage) {
    containersStorage.forEach(element => {
        if (element) {
            switch (containersStorage.indexOf(element)) {
                case 0:
                    tasksSectionsOverall[0].innerHTML = element;
                    break;
                case 1:
                    tasksSectionsOverall[1].innerHTML = element;
                    break;
                case 2:
                    tasksSectionsOverall[2].innerHTML = element;
                    break;
                case 3:
                    tasksSectionsOverall[3].innerHTML = element;
                    break;
            }
        }
    });
    nextIndex()
}

// Get next index in case we have data in local storage
function nextIndex() {
    var list = document.querySelectorAll("li")
    list.forEach(element => {
        if (element.getAttribute("id") > i) {
            i = element.getAttribute("id");
        }
    });
    i++;
}

// Add new element to progress container
button.addEventListener("click", clickableFunction)
function clickableFunction(e) {
    e.stopPropagation();
    tasksSectionsOverall[0].innerHTML += `<li class="swap-element" id="${i}" draggable="true">${input.value}</li>`;
    displayInContainers();
    localStorage.setItem("containerStorage", JSON.stringify(storage));
    i++;
}

// Event delegation to start dragging
tasksSectionsOverall.forEach(container => {
    container.addEventListener("dragstart", eventDelegationFunction)
    function eventDelegationFunction(e) {
        e.stopPropagation();
        e.dataTransfer.setData("text", e.target.id);
    }
})

// drop & dragover events
tasksSectionsOverall.forEach(container => {
    container.addEventListener("drop", dropElementInLocation)
    container.addEventListener("dragover", dragOverInNewLocation)
})

// Set drop in new location
function dropElementInLocation(e) {
    e.stopPropagation();
    var element = document.getElementById(e.dataTransfer.getData("text"));
    e.dataTransfer.getData("text");
    e.target.appendChild(element);
    displayInContainers();
    localStorage.setItem("containerStorage", JSON.stringify(storage));
}

// Accept the drop
function dragOverInNewLocation(e) {
    e.stopPropagation();
    e.preventDefault();
}

// display the data we have in each container
function displayInContainers() {
    for (let i = 0; i < 4; i++) {
        storage[i] = tasksSectionsOverall[i].innerHTML;
    }
}