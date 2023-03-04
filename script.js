todoMain();
searchFunction();

function todoMain(){
  let inputText,
  addBtn,
  inputDate,
  toDoList = [];

  getElements();
  addListeners();
  loadFromLS();
  addRows();

  function getElements(){
    inputText = document.getElementById("taskText");
    inputDate = document.getElementById("taskDate");
    addBtn = document.getElementById("addButton");
  }

  function addListeners(){
    addBtn.addEventListener("click", addTask, false);
  }

  //Dodawanie nowego taska
  function addTask(){
    let inputValue = inputText.value;
    inputText.value="";
    let dateValue = inputDate.value;
    inputDate.value = "";

    add(inputValue, dateValue);

    toDoList.push({
      id: toDoList.length,
      todo: inputValue,
      date: dateValue
    });
    saveToLS();
  }

  function saveToLS(){
    let toString = JSON.stringify(toDoList);
    localStorage.setItem("toDoList", toString);
  }

  function loadFromLS(){
    let fromString = localStorage.getItem("toDoList");
    toDoList = JSON.parse(fromString);
    if(toDoList == null){
      toDoList = [];
    }
  }

  function addRows(){
    toDoList.forEach(toDoObj => {
      let toDoEntr = toDoObj.todo;
      let dateEntr = toDoObj.date;
      add(toDoEntr,dateEntr);
    })
  }

  function add(inputValue, dateValue, id){
    let table = document.getElementById("todoTable");
    let trElem = document.createElement("tr");
    table.appendChild(trElem);

    // Komórka z taskiem
    let taskElem = document.createElement("td");
    taskElem.innerText = inputValue;
    trElem.appendChild(taskElem);

    // Edytowanie
    taskElem.dataset.id = id;
    taskElem.addEventListener("click", editTask, false);

    // Komórka z datą
    let dateElem = document.createElement("td");
    dateElem.innerText = dateValue;
    trElem.appendChild(dateElem);
    // Komórka z guzikiem usuwania
    let deleteElem = document.createElement("button");
    deleteElem.innerText = "Usun";
    deleteElem.className = "deleteBtn";
    deleteElem.addEventListener("click",deleteItem,false);
    let deleteTd = document.createElement("td");
    deleteTd.appendChild(deleteElem);
    trElem.appendChild(deleteTd);

    //Funkcja usuwania
    function deleteItem(){
      trElem.remove();
    }

    //Funkcja edytowania
    function editTask(event){
      let currentText = event.target.innerText;
      event.target.innerText = "";

      let tempInput = document.createElement("input");
      event.target.appendChild(tempInput);
      tempInput.value = currentText;

      tempInput.addEventListener("change", onChange, false);

      function onChange(event){
        let changedValue = event.target.value;

        toDoList.forEach( toDoTd => {
          if(toDoTd.id == event.target.parentNode.dataset.id){
            toDoTd.todo = changedValue;
          }
        })
        event.target.parentNode.innerText = changedValue;
      }
    }
  }
}

function searchFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("todoTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}