const baseurl = 'https://www.dnd5eapi.co';

function fetchEndpoint(endpoint) {
    return fetch(`${baseurl}${endpoint}`).then(result => result.json());
}

const htag = (size, content, ...classList) => {
    const htag = document.createElement(`h${size}`);
    htag.innerText = content;
    htag.classList.add(...classList);
    return htag;
}

const list = (ordered=false, ...classList) => {
    const thelist = document.createElement(ordered ? 'ol' : 'ul');
    thelist.classList.add(...classList);
    return thelist;
}

const li = (content, ...classList) => {
    const item = document.createElement('li');
    item.innerText = content;
    item.classList.add(...classList);
    return item;
}

const p = (content, ...classList) => {
    const par = document.createElement('p');
    par.innerText = content;
    par.classList.add(...classList);
    return par;
}

const div = (children, ...classList) => {
    const thediv = document.createElement('div');
    thediv.classList.add(...classList);
    for (let i = 0; i < children.length; i++) {
        thediv.appendChild(children[i]);
    }
    return thediv;
}