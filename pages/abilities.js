fetchEndpoint('/api/ability-scores').then(json => {
    for (let i = 0; i < json.count; i++) {
        fetchEndpoint(json.results[i].url).then(classInfo => document.getElementById('content').appendChild(getAbilitiesDiv(classInfo)));
    }
});

const getAbilitiesDiv = (info) => {
    let rootChildren = [];
    let cardChildren = [];

    cardChildren.push(htag(3, `${info.full_name} (${info.name})`, 'card-header', 'sbg', 'text-light'));
    cardChildren.push(p(info.desc[0], 'mx-3'));
    cardChildren.push(p(info.desc[1], 'mx-3'));
    cardChildren.push(htag(4, 'Related Skills:', 'ml-1'));
    const ul = list();
    for (let i = 0; i < info.skills.length; i++) {
        ul.appendChild(li(info.skills[i].name));
    }
    if (info.skills.length === 0) {
        ul.appendChild(li('Is drinking a skill?'));
    }
    cardChildren.push(ul);

    rootChildren.push(div(cardChildren, 'card', 'shadow', 'w-100', 'h-100'))
    return div(rootChildren, 'w-50', 'p-3');
}