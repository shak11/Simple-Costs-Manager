// Nir Chen - 303341721
// Shmuel Maor - 206828360

async function getNewIndex() {
    let i = 0;
    if (localStorage.getItem('costID')) {
        i = localStorage.getItem('costID');
    }
    return i;
}

async function createCost(description, sum, category, date) {
    let i = await getNewIndex();
    try {
        const data = {description: description, sum: sum, category: category, date: date};
        const dataString = JSON.stringify(data);
        await localStorage.setItem('cost' + i, dataString);
        alert('cost added!');
    } catch (error) {
        console.error(error);
    }
    i++;
    await localStorage.setItem('costID', i);
}

async function getReport() {
    //empty table element
    let table = "<table border = 1> <tr> <td> Date </td> <td> Description </td> <td> Category </td> <td> Sum </td> </tr>";
    //get all costs
    let keys = await Object.keys(localStorage)
    keys = keys.filter(x => {
        return x != 'costID'
    })
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const json = await localStorage.getItem(key);
        const jsonObject = JSON.parse(json);

        const searchDate = document.getElementById('searchDateText').value;
        const obYear = jsonObject.date.split("-")[0];
        const obMonth = jsonObject.date.split("-")[1];

        const searchYear = searchDate.split("-")[0];
        const searchMonth = searchDate.split("-")[1];

        if (obYear === searchYear && obMonth === searchMonth) {
            table += "<tr>";
            table += "<td>" + jsonObject.date + "</td>";
            table += "<td>" + jsonObject.description + "</td>";
            table += "<td>" + jsonObject.category + "</td>";
            table += "<td>" + jsonObject.sum + "</td>";
            table += "</tr>";
        }
    }
    table += "</table>";
    document.getElementById('tablediv').innerHTML = table;
}

