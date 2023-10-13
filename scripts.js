const API = 'https://swapi.dev/api/people/'

function personaje(id,persona) {
    // Obtener una referencia al elemento contenedor de la tabla en el DOM
    const tableContainer = document.getElementById("table-container");

    // Crear una tabla
    const table = document.createElement("table");

    // Crear la cabecera de la tabla
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    // Definir las columnas de la cabecera
    //const headers = ["Codigo","Nombre", "Height", "Mass", "Gender", "Birth Year"];
    const headers = ["Codigo","Nombre"];

    // Crear las celdas de la cabecera
    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // Agregar la fila de cabecera a la cabecera de la tabla
    thead.appendChild(headerRow);

    // Agregar la cabecera a la tabla
    table.appendChild(thead);
    const dataRow = document.createElement("tr");

    // Crear celdas de datos
    const idCell = document.createElement("td");
    idCell.textContent = id;

    const nameCell = document.createElement("td");
    nameCell.textContent = persona.name;

  

    // Agregar celdas de datos a la fila de datos
    dataRow.appendChild(idCell);
    dataRow.appendChild(nameCell);
   

    // Agregar la fila de datos a la tabla
    table.appendChild(dataRow);
    tableContainer.appendChild(table);
}

function obtener_personaje(id) {
    return new Promise((resolve, reject) => {
        fetch(`${API}${id}`)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`))
    })
}

let ids = []
for (let i = 1; i < 80; i++) {
    ids.push(i)
}

let promesas = ids.map(id => obtener_personaje(id))

// Promesas Encadenadas
Promise
    .all(promesas)
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            personaje(i,data[i])
        }
    })