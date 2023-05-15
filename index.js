const btnAdd = document.getElementById('btnAdd');
const input = document.getElementById('input');
const lists = document.querySelector('ul');
let arrayItem = [];
let id = 0;

btnAdd.addEventListener('click', addItem);

function addItem () {
    if (input.value === '') {
        return;
    }

    let value = input.value;

    let obj = {
        // key value pairs
        id: id,
        value: value
    }

    arrayItem.push(obj);

    localStorage.setItem('items', JSON.stringify(arrayItem));

    display();

    id++;
}

function display() {
    lists.innerHTML = '';

    let data = JSON.parse(localStorage.getItem('items'));

    data.forEach(itemFn)
}

lists.addEventListener('click', (e) => {
    let element = e.target;

    if (element.textContent === 'edit') {
        let parentId = element.parentElement.id;

        let data = JSON.parse(localStorage.getItem('items'));

        let value = data.filter(item => item.id === parseInt(parentId));

        input.value = value[0].value;

        // re-initialize
        value = data.filter(item => item.id !== parseInt(parentId));

        localStorage.setItem('items', JSON.stringify(value));

        display();

        console.log(value);
    }
});

function itemFn(item) {
    //destrucring
    const { value, id } = item;

    lists.innerHTML += `<li id='${id}'>${value} <a style='margin-right: 10px' href='#'>edit</a><a href='#'>delete</a></li>`
}

display();

//localStorage.setItem('posts', JSON.stringify([{ post: 'post' }, { posts: 'posts' }]))
//let posts = JSON.parse(localStorage.getItem('posts'));