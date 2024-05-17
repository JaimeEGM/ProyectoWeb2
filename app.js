/**
 Importar csv
**/
function crearTabla(data) {
    const todasFilas = data.split(/\r?\n|\r/);
    let tabla = '<table>';
    for (let fila = 0; fila < todasFilas.length; fila++) {
        tabla += '<tr>';
        const celdasFila = todasFilas[fila].split(',');
        for (let rowCell = 0; rowCell < celdasFila.length; rowCell++) {
            tabla += '<td>';
            if (fila === 0) {
                tabla += '<strong>'; 
            }
            tabla += celdasFila[rowCell];
            if (fila === 0) {
                tabla += '</strong>';
            }
            tabla += '</td>';
        }
        tabla += '</tr>';
    } 
    tabla += '</table>';
    document.querySelector('#tablares').innerHTML = tabla;
}

function mostrarContenidoCSV(data) {
    document.getElementById('csv-edit').value = data;
}

function leerArchivo2(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        mostrarContenidoCSV(e.target.result); // Mostrar el contenido del CSV 
        crearTabla(e.target.result); // Crear y mostrar la tabla
    };
    // Leemos el contenido del archivo seleccionado
    reader.readAsText(file);
}

/**
  Leer y mostrar el contenido luego luego
**/  
function mostrarContenido(contenido) {
    const elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

function leerArchivo(e) {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const lector = new FileReader();
    lector.onload = function(e) {
        const contenido = e.target.result;
        mostrarContenido(contenido); // Mostrar contenido 
        mostrarContenidoCSV(contenido); // Mostrar contenido en el área de gestión de archivos
    };
    lector.readAsText(archivo);
}

document.querySelector('#archivo1').addEventListener('change', leerArchivo, false);

/**
Botón y función para agregar datos al CSV
 **/
function agregarDatosAlCSV() {
    const nuevosDatos = document.getElementById('nuevos-datos').value;
    const csvContent = document.getElementById('csv-edit').value;
    const nuevoCSV = csvContent + '\n' + nuevosDatos;
    document.getElementById('csv-edit').value = nuevoCSV;
}

function eliminarDatosDelCSV() {
    const datosAEliminar = document.getElementById('datos-a-eliminar').value;
    let csvContent = document.getElementById('csv-edit').value;
    const lineas = csvContent.split('\n');
    const nuevasLineas = lineas.filter(linea => !linea.includes(datosAEliminar));
    csvContent = nuevasLineas.join('\n');
    document.getElementById('csv-edit').value = csvContent;
}

document.getElementById('agregar-datos').addEventListener('click', agregarDatosAlCSV);
document.getElementById('eliminar-datos').addEventListener('click', eliminarDatosDelCSV);
