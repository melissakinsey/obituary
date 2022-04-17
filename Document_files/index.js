let inputs = {}

let memory = {
    //[group]:[{
    //suggestions
    //}]
    headers: {
        family: [],
        friends: [],
        coworkers: [],
        military: [],
    },

    first_sentence: [
        () => `On ${new Date(inputs.DOD).toLocaleDateString()}, ${inputs.firstLastName}, loving ${inputs.roles}, passed away at the age of ${inputs.age}.`,
        (firstLastName) => `${firstLastName}`,
        (firstLastName) => `${firstLastName}`,
    ],
    death: [
        `<form>
                <input type="radio" name="fav_language" value="sudden">
                <label for="sudden">died unexpectedly</label><br>
                <input type="radio" name="fav_language" value="illness ">
                <label for="illness">died after a long illness</label><br>
                <input type="radio" id="died" name="fav_language" value="died">
                <label for="died">died</label>
            </form>`,
    ],
    age: [
        (age) => `on July 6, 2020 at age ${age}`,
        (age) => `on July 6, 2020 at the age of ${age}`,
        (age) => `at the age of ${age}`,
    ],
   /*Caring and roles: Need to make them visible. That will fix spacing problem in Hobbies table.*/
    caring: {
        male: ['husband', 'brother', 'father', 'friend', 'uncle', 'grandfother'],
        female: ['wife', 'sister', 'mother', 'friend', 'aunt', 'grandmother']
    },
    roles: {
        male: ['father', 'son', 'husband', 'brother'],
        female: ['mother', 'daughter', 'wife', 'sister']
    },
    hobbies: ['antiquing', 'astronomy', 'baking','beekeeping', 'birdwatching', 'blogging', 'camping', 'collecting stamps', 'cooking', 'cross-stitching', 'dancing', 'dining out', 'entertaining', 'gardening', 'genealogy', 'hiking', 'horseback riding', 'decorating', 'investing', 'jewelry making', 'knitting', 'meditation', 'painting', 'photography', 'pottery', 'rapping', 'reading', 'scrapbooking', 'singing', 'spelunking', 'storytelling', 'joke telling', 'woodworking', 'quilting']
};

let hobbiesContainer = document.querySelector('#hobbies .grid')
memory.hobbies.forEach(hobby =>
{
    let item = document.createElement('div')
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.value = hobby;
    input.name = 'hobbies'
    input.addEventListener('change', checkedHandler)

    let label = document.createElement('label');
    label.innerText = hobby;

    item.append(input, label)

    hobbiesContainer.append(item)
}

)
function checkedHandler (e)
{
    let { value, name, checked } = e.target
    if (!(name in inputs))
    {
        inputs[name] = []
    }
    if (checked)
    {
        inputs[name].push(value)
    } else
    {
        let index = inputs[name].indexOf(value)
        inputs[name].splice(index, 1)
    }
    ///console.log({value,name,checked})
}
let template = ``;

function generateObituary() { }

document.querySelectorAll("input").forEach((input) =>
{
    input.onchange = function (e)
    {
        let { name, value,type } = e.target;
        if (type !== 'checkbox')
        {
            inputs[name] = value;
        } 

        console.log(inputs)
        let select = document.querySelector(`select[name='${name}']`);
        if (select)
        {
            memory[name].forEach((example) =>
            {
                let option = document.createElement("option");
                option.innerText = example(value);
                select.appendChild(option);
            });
        }
        if (name === 'gender')
        {

            let fieldset_caring = document.querySelector(`fieldset[id='caring']`);
            fieldset_caring.innerHTML = '<legend>caring</legend>'
            fieldset_caring.style.display = 'none';
            memory.caring[value].forEach(item =>
            {
                let input = document.createElement('input');
                input.type = 'checkbox';
                input.value = item;
                input.name='caring'
                input.addEventListener('change', checkedHandler)
                let label = document.createElement('label');
                label.innerText = item;

                fieldset_caring.append(input, label)
            })
            let fieldset_roles = document.querySelector(`fieldset[id='roles']`);
            fieldset_roles.innerHTML = '<legend>roles</legend>'
            fieldset_roles.style.display = 'none';
            memory.roles[value].forEach(item =>
            {
                let input = document.createElement('input');
                input.type = 'checkbox';
                input.value = item;
                input.name='roles'
                input.addEventListener('change', checkedHandler)
                let label = document.createElement('label');
                label.innerText = item;

                fieldset_roles.append(input, label)
            })
        }

        let first_sentence_select = document.querySelector(`select#first_sentence`);
        if (first_sentence_select)
        {
            first_sentence_select.innerHTML=''
            memory['first_sentence'].forEach((example) =>
            {
                let option = document.createElement("option");
                option.innerText = example();
                first_sentence_select.appendChild(option);
            });
        }
    };
});
