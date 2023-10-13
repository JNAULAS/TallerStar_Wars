const API = 'https://swapi.dev/api/people/'




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
        const tableContainer = document.getElementById("table-container");
        const table = document.createElement("table");
        table.style.border = "1px solid black";
        // Crear la cabecera de la tabla
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // Definir las columnas de la cabecera
        const headers = ["Codigo", "Nombre"];
        // Crear las celdas de la cabecera
        headers.forEach(headerText => {
            const headerCell = document.createElement("th");
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
            headerCell.style.border = "1px solid black";
        });

        // Agregar la fila de cabecera a la cabecera de la tabla
        thead.appendChild(headerRow);

        // Agregar la cabecera a la tabla
        table.appendChild(thead);

        for (let i = 0; i < data.length; i++) {
            //personaje(i, data[i])
            const dataRow = document.createElement("tr");

            // Crear celdas de datos
            const idCell = document.createElement("td");
            idCell.textContent = i;
            const nameCell = document.createElement("td");
            nameCell.textContent = data[i].name;

            // Agregar celdas de datos a la fila de datos
            dataRow.appendChild(idCell);
            dataRow.style.border = "1px solid black";
            dataRow.appendChild(nameCell);
            dataRow.style.border = "1px solid black";
            // Agregar la fila de datos a la tabla
            table.appendChild(dataRow);
            
        }
        // Agregar la tabla al contenedor
        tableContainer.appendChild(table);

    })