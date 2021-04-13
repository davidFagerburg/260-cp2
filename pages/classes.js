fetchEndpoint('/api/classes').then(json => {
    for (let i = 0; i < json.count; i++) {
        fetchEndpoint(json.results[i].url).then(classInfo => document.getElementById('content').appendChild(getClassDiv(classInfo)));
    }
});


function getClassDiv(classInfo) {
    const root = document.createElement('div');
    root.classList.add('w-50', 'p-0', 'my-3');
    const card = document.createElement('div');
    card.classList.add('card', 'shadow', 'm-3', 'h-100');
    const header = document.createElement('h3');
    header.innerText = `${classInfo.name}: 1-${classInfo.hit_die} HP/level`;
    header.classList.add('card-header', 'sbg', 'text-light');
    root.appendChild(card);
    card.appendChild(header);

    const profHeader = htag(4, 'Proficiencies', 'ml-1');
    card.appendChild(profHeader);

    const proficiencies = list();
    for (let i = 0; i < min(classInfo.proficiencies.length, 6); i++) {
        let prof = li(classInfo.proficiencies[i].name);
        proficiencies.appendChild(prof);
    }
    card.appendChild(proficiencies);

    const profcHeader = htag(4, `Choose ${classInfo.proficiency_choices[0].choose} of these:`, 'ml-1');
    card.appendChild(profcHeader);

    const profChoices = list();
    for (let i = 0; i < min(classInfo.proficiency_choices[0].from.length, 6); i++) {
        let prof = li(classInfo.proficiency_choices[0].from[i].name);
        profChoices.appendChild(prof);
    }
    card.appendChild(profChoices);

    if (classInfo.starting_equipment.length == 0) {
        return root;
    }

    const equipHeader = htag(4, 'Starting Equipment', 'ml-1');
    card.appendChild(equipHeader);

    const equip = list();
    for (let i = 0; i < min(classInfo.starting_equipment.length, 4); i++) {
        let tool = li(`${classInfo.starting_equipment[i].quantity} ${classInfo.starting_equipment[i].equipment.name}${classInfo.starting_equipment[i].quantity > 1 ? 's' : ''}`);
        equip.appendChild(tool);
    }
    card.appendChild(equip);

    return root;
}

function min(a, b) {
    return a < b ? a : b;
}