// const userID = document.getElementById('user-id');
const task = document.getElementById('task');
const addTask = document.getElementById('addTask');

const todo = document.getElementById('todo');
const pending = document.getElementById('pending');
const completed = document.getElementById('completed');

const userInfo = "random123";

function loadDeleteIcon() {
    const NS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "flex-none w-5 h-5 hover:cursor-pointer");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");

    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", "M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z");
    path.setAttribute("fill", "currentColor");

    svg.appendChild(path);
    return svg;
}

let contentBuilder = (response) => {
    const content = document.createElement('div');
    content.classList.add('flex', 'flex-row', 'justify-center', 'items-center');

    const inputTag = document.createElement('input');
    inputTag.type = "checkbox";
    inputTag.classList.add('flex-none', 'w-4', 'h-4', 'hover:cursor-pointer')
    inputTag.id = `${response.id}`;

    const labelTag = document.createElement('label');
    labelTag.htmlFor = inputTag.id;
    labelTag.classList.add('grow', 'ml-4', 'font-semibold', 'text-lg')
    labelTag.textContent = `${response.title}`;

    const svgTag = loadDeleteIcon();
    svgTag.id = `${response.id}`;

    content.appendChild(inputTag);
    content.appendChild(labelTag);
    content.appendChild(svgTag);

    return content;
}

let deleteProcess = async (todoId) => {
    const reqOptions = {
        method: 'DELETE',
        redirect: 'follow'
    }
    try {
        const url = `https://todo-crudl.deno.dev/${userInfo}/todos/${todoId}`;
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Error: ');
            error.status = ep.status;
            throw error;
        }
        // const response = await ep.json();
    } catch (error) {
        console.error(error.message, error.status);
    }

    todoProcess();
    pendingProcess();
    completedProcess();
}

let readItem = async (todoId) => {
    const reqOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    try {
        const url = `https://todo-crudl.deno.dev/${userInfo}/todos/${todoId}`;
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Error: ');
            error.status = ep.status;
            throw error;
        }
        const response = await ep.json();
        let status = response.status;
        status = (status === 'todo' ? 'pending' : 'completed');
        // return status;
        // (process === 'update' ? updateProcess(todoId, status) : deleteProcess(todoId));
        updateProcess(todoId, status);
    } catch (error) {
        console.error(error.message, error.status);
    }
}

let updateProcess = async (todoId, status) => {
    const reqOptions = {
        method: "PUT",
        body: JSON.stringify({
            status: status
        }),
        redirect: 'follow'
    }
    try {
        const url = `https://todo-crudl.deno.dev/${userInfo}/todos/${todoId}`;
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Error: ');
            error.status = ep.status;
            throw error;
        }

    } catch (error) {
        console.error(error.message, error.status);
    }

    todoProcess();
    pendingProcess();
    completedProcess();
}

let completedProcess = async () => {
    const reqOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    try {
        const url = `https://todo-crudl.deno.dev/${userInfo}/todos`;
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Error: ');
            error.status = ep.status;
            throw error;
        }
        const response = await ep.json();

        completed.innerText = "";
        for (let i = 0; i < response.length; i++) {
            if (response[i].status === "completed") {
                const content = document.createElement('div');
                content.classList.add('flex', 'flex-row', 'justify-center', 'items-center');

                const pTag = document.createElement('p');
                pTag.classList.add('grow', 'ml-4', 'font-semibold', 'text-lg')
                pTag.textContent = `${response[i].title}`;

                const svgTag = loadDeleteIcon();
                svgTag.id = `${response[i].id}`;

                content.appendChild(pTag);
                content.appendChild(svgTag);

                completed.insertAdjacentElement("beforeend", content);
            }
        }
    } catch (error) {
        console.error(error.message, error.status);
    }
    completed.addEventListener('click', (event) => {
        if (event.target.closest('svg')) {
            const id = event.target.closest('svg').id;
            deleteProcess(id)
        }
    })
}

let pendingProcess = async () => {
    const reqOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    try {
        const url = `https://todo-crudl.deno.dev/${userInfo}/todos`;
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Error: ');
            error.status = ep.status;
            throw error;
        }
        const response = await ep.json();

        pending.innerText = "";
        for (let i = 0; i < response.length; i++) {
            if (response[i].status === "pending") {
                let content = contentBuilder(response[i]);
                pending.insertAdjacentElement("beforeend", content);
            }
        }
    } catch (error) {
        console.error(error.message, error.status);
    }
    pending.addEventListener('change', (event) => {
        if (event.target.tagName === 'INPUT') {
            readItem(event.target.id);
        }
    })

    pending.addEventListener('click', (event) => {
        if (event.target.closest('svg')) {
            const id = event.target.closest('svg').id;
            deleteProcess(id)
        }
    })
}

let todoProcess = async () => {

    const reqOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    try {
        const url = `https://todo-crudl.deno.dev/${userInfo}/todos`;
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Error: ');
            error.status = ep.status;
            throw error;
        }
        const response = await ep.json();

        todo.innerText = "";
        for (let i = 0; i < response.length; i++) {
            if (response[i].status === "todo") {
                let content = contentBuilder(response[i]);
                todo.insertAdjacentElement("beforeend", content);
            }
        }
    } catch (error) {
        console.error(error.message, error.status);
    }
    todo.addEventListener('change', (event) => {
        if (event.target.tagName === 'INPUT') {
            readItem(event.target.id);
        }
    })

    todo.addEventListener('click', (event) => {
        if (event.target.closest('svg')) {
            const id = event.target.closest('svg').id;
            deleteProcess(id)
        }
    })
}

let addProcess = async (newTask) => {
    const reqOptions = {
        method: 'POST',
        body: JSON.stringify({
            title: newTask
        }),
        redirect: 'follow'
    }
    try {
        const url = `https://todo-crudl.deno.dev/${userInfo}/todos`;
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Error: ');
            error.status = ep.status;
            throw error;
        }
        // const response = await ep.json();

        todoProcess();
    } catch (error) {
        console.error(error.message, error.status);
    }
}

addTask.addEventListener('click', () => {
    // addProcess(userID.value, task.value);
    addProcess(task.value);
})

todoProcess();
pendingProcess();
completedProcess();