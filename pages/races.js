fetchEndpoint('/api/races').then(json => {
    for (let i = 0; i < json.count; i++) {
        fetchEndpoint(json.results[i].url).then(classInfo => document.getElementById('content').appendChild(getRacesDiv(classInfo)));
    }
});

const getRacesDiv = (info) => {
    let rootChildren = [];
    let cardChildren = [];

    cardChildren.push(htag(3, `${info.name}`, 'card-header', 'pgb'));
    let abilbonuses = [];
    for (let i = 0; i < info.ability_bonuses.length; i++) {
        abilbonuses.push(div([htag(5, info.ability_bonuses[i].ability_score.name, 'card-header'), p('+' + info.ability_bonuses[i].bonus)], 'card', 'sbg', 'text-light', 'text-center'));
    }
    cardChildren.push(div(abilbonuses, 'd-flex', 'justify-content-around', 'my-2'));
    cardChildren.push(p(info.age, 'mx-3'));
    cardChildren.push(p(info.language_desc, 'mx-3'));
    cardChildren.push(p(info.alignment, 'mx-3'));

    if (info.starting_proficiencies.length > 0) {
        cardChildren.push(htag(4, 'Starting Proficiencies:', 'ml-1'));
        let startprofs = list();
        for (let i = 0; i < info.starting_proficiencies.length; i++) {
            startprofs.appendChild(li(info.starting_proficiencies[i].name));
        }
        cardChildren.push(startprofs);
    }

    rootChildren.push(div(cardChildren, 'card', 'shadow'))
    return div(rootChildren, 'w-100', 'm-3');
}