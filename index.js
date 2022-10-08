
// Initialize values as an object
let inputs = {}
// Save object values to app memory
let memory = {
    // Proposed structure: Object of arrays representing topical input groups
    //[group]:[{
    //suggestions
    //}]
    headers: {
        family: [],
        friends: [],
        coworkers: [],
        military: [],
    },
    // Structure to hold input values
    // .toLocaleString localizes date
    form_of_name: [
        () => 'select form of name',
        () => `${inputs.firstLastName}`,
        () => `${inputs.gender == "male" ? "Mr." : "Mrs."} ${inputs.firstLastName}`,
        () => `${inputs.firstLastName}'s`,
    ],
    cause_of_death: [
        () => 'select cause of death',
        () => 'died after a long illness',
        () => 'died after a brief illness',
        () => 'died unexpectedly',
        () => `lost ${inputs.gender} battle with cancer`

    ],
    first_sentence: [
        () => `select first sentence`,
        () => `, loving ${inputs.roles && inputs.roles.join(", ")},`,

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
        () => 'select day of death',
        (age) => `at age ${age}.`
    ],
    /*Caring and roles: Need to make them visible. That will fix spacing problem in Hobbies table.*/
    roles: {
        male: ['husband', 'brother', 'father', 'friend', 'uncle', 'grandfother', 'son'],
        female: ['wife', 'sister', 'mother', 'friend', 'aunt', 'grandmother', 'daughter']
    },
    hobbies: ['antiquing', 'astronomy', 'baking', 'beekeeping', 'birdwatching', 'blogging', 'camping', 'cooking', 'sewing', 'quilting', 'needlework', 'knitting', 'dancing', 'dining out', 'entertaining', 'gardening', 'genealogy', 'hiking', 'running', 'decorating', 'investing', 'meditation', 'painting', 'photography', 'pottery', 'rapping', 'reading', 'scrapbooking', 'singing', 'spelunking', 'storytelling', 'woodworking'],
    advice: ['Did your loved one have any distinctive physical characteristics, such as hair color or height? If so, add that detail here.', 'What did your loved one keep in his/her/their pockets?', 'advice 1','advice 2']
}; 
if (typeof window !== "undefined")
{
    // browser code
}
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
    item.classList.add('hobby')
    item.append(input, label)

    hobbiesContainer.append(item)
}

)
function checkedHandler(e)
{
    //    debugger
    let { value, name, checked } = e.target
    if (!(name in inputs))
    {
        inputs[name] = []
    }
    if (checked)
    {
        inputs[name].push(value)
        if (value == "reading")
        {
        adviceRender ("What kinds of books did your loved one enjoy? What was their favorite book? Add those details here.")
    }
    } else
    {
        let index = inputs[name].indexOf(value)
        inputs[name].splice(index, 1)
    }
    generateObituary(name, value)
    // console.log({value,name,checked})
}
let template = ``;

function generateObituary(name, value)
{
    //debugger
    function resetDiv(select, key)
    {
        select.innerHTML = memory[key][1](

        )
    }
    function resetSelected(select, selector, key)
    {
        if (!select)
        {
            let div = document.querySelector(`span${selector}`);
            if (div)
            {
                let newSelect = document.createElement('select');
                div.parentNode.replaceChild(newSelect, div)
                newSelect.setAttribute("id", div.getAttribute('id'));
                newSelect.setAttribute("name", div.getAttribute('name'))
                select = newSelect
            } else
            {
                return
            }
        }
        // debugger
        select.classList.remove("d-none")
        select.innerHTML = ''
        memory[key].forEach((example) =>
        {
            let option = document.createElement("option");
            option.innerText = example(value);
            select.appendChild(option);
        });
    }
    let select = document.querySelector(`select[name='${name}']`);

    resetSelected(select, `[name='${name}']`, name);

    if (name === 'roles')
    {
        let first_sentence_div = document.querySelector(`div#first_sentence`);
        resetDiv(first_sentence_div, 'first_sentence')
    }

    if (name == 'gender' || name == 'firstLastName')
    {
        let form_of_name = document.querySelector(`select[name="form_of_name"]`);
        resetSelected(form_of_name, `[name="form_of_name"]`, 'form_of_name');
    }
    if (name === 'gender')
    {
        let cause_of_death = document.querySelector(`select[name="cause_of_death"]`);
        resetSelected(cause_of_death, `[name="cause_of_death"]`, 'cause_of_death');
    }
    addSelectGenerator()

    if (name == 'hobbies' || name == 'gender' && inputs.hobbies)
    {
        let hobbies_template = document.querySelector(`#hobbies_template`);
        hobbies_template.innerHTML = (inputs.gender == "male" ? "He" : "She") + " enjoyed " + listSeparator(inputs.hobbies) + '.';
        console.log(inputs)
    }
}

document.querySelectorAll("input:not([type='checkbox']").forEach((input) =>
{
    function eventHandler(e)
    {
        let { name, value, type } = e.target;

        inputs[name] = value;


        if (name == 'DOD')
        {
            if (new Date(value).getTime() > new Date().getTime())
            {
                e.target.value = '';
                alert('Invalid date of death!')
            }
            // else
            // {
            //     document.querySelector(`#${name}`).innerText = new Date(value).toLocaleDateString()
            // }
        }
        console.log({ inputs, name, value })

        if ('gender' === name)
        {
            let fieldset_roles = document.querySelector(`fieldset[id='roles']`);
            fieldset_roles.innerHTML = '<legend>roles</legend>'
            fieldset_roles.style.display = 'block';
            memory.roles[value].forEach(item =>
            {
                let input = document.createElement('input');
                input.type = 'checkbox';
                input.value = item;
                input.name = 'roles'
                input.addEventListener('change', checkedHandler)
                let label = document.createElement('label');
                label.innerText = item;
                let container = document.createElement('div')
                container.classList.add('container')
                container.append(input, label)
                fieldset_roles.append(container)
            })

        }

        if (name === 'age' && + value < 0)
        {
            input.value = 0
            alert('Invalid! Age must be > 0.')
        }

        generateObituary(name, value)
        //todo understand why it switch all not specific one
    }
    // input.addEventListener('change', eventHandler);
    input.addEventListener('input', eventHandler);
});


function generateInput(props)
{
    let state = ''
    let input = document.createElement('input')
    input.onchange = function ()
    {
        state = this.value
    }
    let btn = document.createElement('button')
    btn.onclick = function ()
    {
        //action to replace
    }
}
function addSelectGenerator()
{
    let list = document.querySelectorAll('.container select');
    console.log({ list })
    list.forEach(select =>
    {
        select.onchange = function (e)
        {
            console.log('working', e.target.name, select.name);
            let div = document.createElement('span')
            div.innerText = e.target.value;
            div.setAttribute("id", select.id);
            div.setAttribute("name", e.target.name)
            select.parentNode.replaceChild(div, select)
        }
    })
}

addSelectGenerator()
if (typeof window !== "undefined")
{
    // browser code
}

function listSeparator(array)
{
    let copy = [...array]
    //console.log(array)
    let last = copy.pop()
    return copy.join(', ') + (copy.length > 1 ? ',' : '') + (copy.length ? ' and ' : ' ') + last
}
// immediately indicated function expression
(
    function ()
    {
        let randomAdvice = Math.floor(Math.random() * memory.advice.length)
        adviceRender(memory.advice[randomAdvice])
    }
)()


function adviceRender(advice)
{
    let btn = document.createElement("button")
    btn.innerText="Apply"
    let hints = document.querySelector(".hints")
    hints.innerHTML = advice
    hints.append(btn)
}