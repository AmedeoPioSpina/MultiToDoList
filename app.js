const loadLocalSave = () =>{
    if(localStorage.getItem("save1") != null){
        const save1 = localStorage.getItem("save1");
        const body = document.querySelector("body");
        body.innerHTML = save1;
    }
}

const setLocalSave = () =>{
    const htmlBody = document.querySelector("body").innerHTML;
    localStorage.setItem("save1", htmlBody);
}

const createToDoElement = (interfaceTarget, text) => {
    const toDo = document.createElement("div");
    toDo.classList.add("toDo");
    const p = document.createElement("p");
    p.textContent = text;
    interfaceTarget.querySelector("input").value = "";
    toDo.appendChild(p);
    const deleteBtn = document.createElement("button");
    const deleteImgBtn = document.createElement("img");
    deleteBtn.classList.add("deleteBtn");
    deleteImgBtn.src = "./images/icons8-delete.svg";
    deleteBtn.appendChild(deleteImgBtn);
    toDo.appendChild(deleteBtn);
    const toDoListTarget = interfaceTarget.querySelector(".toDoList");
    toDoListTarget.appendChild(toDo);
    setLocalSave();
}

const addToDoElement = (interfaceTarget) => {
    const pText = interfaceTarget.querySelector("input").value;
    createToDoElement(interfaceTarget, pText);
}

const removeToDoElement = (element) => {
    element.remove();
    setLocalSave();
}

const deleteBtnProp = () => {
    deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach( btn => {
        btn.onclick = () => {
            const fatherTarget = btn.closest(".toDo");
            removeToDoElement(fatherTarget);
        };
    });
}

const strikeToDoElement = () => {
    const allP = document.querySelectorAll("p");
    allP.forEach( element => {
        element.addEventListener("click", (e) => {
            let text = element.innerText;
            element.innerHTML = text.strike();
            setLocalSave();
        });
    });
}

const addBtn = document.querySelectorAll(".addBtn");
let deleteBtns = document.querySelectorAll(".deleteBtn");

loadLocalSave();
deleteBtnProp();
strikeToDoElement();

addBtn.forEach(btn =>{
    btn.onclick = (e) => {
        e.preventDefault();
        const interfaceTarget = btn.closest(".toDoListInterface");
        if(interfaceTarget.querySelector("input").value.replaceAll(" ", "").length === 0) return null;
        addToDoElement(interfaceTarget);
        deleteBtnProp();
        strikeToDoElement();
    };
});