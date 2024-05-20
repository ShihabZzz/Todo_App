// const userID = document.getElementById('user-id');
const task = document.getElementById('task');
const addTask = document.getElementById('addTask');

const todo = document.getElementById('todo');
const pending = document.getElementById('pending');
const completed = document.getElementById('completed');

const userInfo = "random123";

let deleteProcess = async (todoId) => {
    const url = `https://todo-crudl.deno.dev/${userInfo}/todos/${todoId}`;

    const reqOptions = {
        method: "DELETE",
    }
    const delEp = await fetch(url, reqOptions);

    todoProcess();
    pendingProcess();
    completedProcess();
}

let updateProcess = async (todoId) => {
    const url = `https://todo-crudl.deno.dev/${userInfo}/todos/${todoId}`;
    const ep = await fetch(url);
    const res = await ep.json();

    let status = res.status;
    (status === "todo" ? status = "pending" : status = "completed");

    const reqOptions = {
        method: "PUT",
        body: JSON.stringify({
            status: status
        })
    }

    const upEp = await fetch(url, reqOptions);
    console.log(await upEp.json());

    todoProcess();
    pendingProcess();
    completedProcess();
}

let completedProcess = async () => {
    const url = `https://todo-crudl.deno.dev/${userInfo}/todos`;
    const ep = await fetch(url);
    const res = await ep.json();

    completed.innerText = "";

    for (let i = 0; i < res.length; i++) {
        if (res[i].status === "completed") {
            
            const content = document.createElement('div');
            content.classList.add("flex", "justify-between", "mt-4");

            const divTag = document.createElement('div');
            divTag.classList.add("flex", "gap-4")

            const pTag = document.createElement('p');
            pTag.id = `${res[i].id}`;
            pTag.textContent = `${res[i].title}`;

            divTag.appendChild(pTag);

            const imgTag = document.createElement('img');
            imgTag.src = "./assets/close.svg";
            imgTag.id = `${res[i].id}`;

            content.appendChild(divTag);
            content.appendChild(imgTag);

            completed.insertAdjacentElement("beforeend", content);
        }
    }
    completed.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            deleteProcess(e.target.id);
        }
    })
}

let pendingProcess = async () => {
    const url = `https://todo-crudl.deno.dev/${userInfo}/todos`;
    const ep = await fetch(url);
    const res = await ep.json();

    pending.innerText = "";

    for (let i = 0; i < res.length; i++) {
        if (res[i].status === "pending") {

            const content = document.createElement('div');
            content.classList.add("flex", "justify-between", "mt-4");

            const divTag = document.createElement('div');
            divTag.classList.add("flex", "gap-4")

            const inputTag = document.createElement('input');
            inputTag.type = "checkbox";
            inputTag.id = `${res[i].id}`;

            const labelTag = document.createElement('label');
            labelTag.htmlFor = inputTag.id;
            labelTag.textContent = `${res[i].title}`;

            divTag.appendChild(inputTag);
            divTag.appendChild(labelTag);

            const imgTag = document.createElement('img');
            imgTag.src = "./assets/close.svg";
            imgTag.id = `${res[i].id}`;

            content.appendChild(divTag);
            content.appendChild(imgTag);

            pending.insertAdjacentElement("beforeend", content);
        }
    }
    pending.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT') {
            updateProcess(e.target.id);
        }
    })

    pending.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            deleteProcess(e.target.id);
        }
    })
}

let todoProcess = async () => {
    const url = `https://todo-crudl.deno.dev/${userInfo}/todos`;
    const ep = await fetch(url);
    const res = await ep.json();

    todo.innerText = "";

    for (let i = 0; i < res.length; i++) {
        if (res[i].status === "todo") {

            const content = document.createElement('div');
            content.classList.add("flex", "justify-between", "mt-4");

            const divTag = document.createElement('div');
            divTag.classList.add("flex", "gap-4")

            const inputTag = document.createElement('input');
            inputTag.type = "checkbox";
            inputTag.id = `${res[i].id}`;

            const labelTag = document.createElement('label');
            labelTag.htmlFor = inputTag.id;
            labelTag.textContent = `${res[i].title}`;

            divTag.appendChild(inputTag);
            divTag.appendChild(labelTag);

            const imgTag = document.createElement('img');
            imgTag.src = "./assets/close.svg";
            imgTag.id = `${res[i].id}`;

            content.appendChild(divTag);
            content.appendChild(imgTag);

            todo.insertAdjacentElement("beforeend", content);
        }
    }
    todo.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT') {
            updateProcess(e.target.id);
        }
    })

    todo.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            deleteProcess(e.target.id);
        }
    })
}

let addProcess = async (newTask) => {
    const url = `https://todo-crudl.deno.dev/${userInfo}/todos`
    const reqOptions = {
        method: "POST",
        body: JSON.stringify({
            title: newTask
        })
    }
    const ep = await fetch(url, reqOptions);
    const res = await ep.json();

    console.log(res);
    todoProcess();
}

addTask.addEventListener('click', () => {
    // addProcess(userID.value, task.value);
    addProcess(task.value);
})

todoProcess();
pendingProcess();
completedProcess();