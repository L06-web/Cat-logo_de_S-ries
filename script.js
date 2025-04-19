const serieInput = document.getElementById('serie-input');
const temporadaInput = document.getElementById('temporada-input');
const statusRadios = document.getElementsByName('status');

const addBtn = document.getElementById('add-btn');

const seriesList = document.getElementById('series-list');

const updateContainer = document.getElementById('update-container');
const updateSerieInput = document.getElementById('update-serie-input');
const updateTemporadaInput = document.getElementById('update-temporada-input');
const updateStatusRadios = document.getElementsByName('update-status');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

let editingRow = null;

function getSelectedStatus(radios) {
    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

function addSerie() {
    const serie = serieInput.value.trim();
    const temporada = temporadaInput.value.trim();
    const status = getSelectedStatus(statusRadios);

    if (!serie || !temporada || !status) {
        alert("Preencha todos os campos!");
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${serie}</td>
        <td>${temporada}</td>
        <td>${status}</td>
        <td>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        </td>
    `;

    row.querySelector('.edit-btn').addEventListener('click', () => editSerie(row));
    row.querySelector('.delete-btn').addEventListener('click', () => deleteSerie(row));

    seriesList.appendChild(row);

    serieInput.value = '';
    temporadaInput.value = '';
    statusRadios.forEach(r => r.checked = false);
}

function editSerie(row) {
    const [serieCell, temporadaCell, statusCell] = row.children;

    updateSerieInput.value = serieCell.textContent;
    updateTemporadaInput.value = temporadaCell.textContent;

    updateStatusRadios.forEach(r => {
        r.checked = r.value === statusCell.textContent;
    });

    editingRow = row;
    updateContainer.style.display = 'block';
}

function saveUpdate() {
    if (!editingRow) return;

    const serie = updateSerieInput.value.trim();
    const temporada = updateTemporadaInput.value.trim();
    const status = getSelectedStatus(updateStatusRadios);

    if (!serie || !temporada || !status) {
        alert("Preencha todos os campos para atualizar!");
        return;
    }

    editingRow.children[0].textContent = serie;
    editingRow.children[1].textContent = temporada;
    editingRow.children[2].textContent = status;

    editingRow = null;
    updateContainer.style.display = 'none';
}

function cancelUpdate() {
    editingRow = null;
    updateContainer.style.display = 'none';
}

function deleteSerie(row) {
    if (confirm("Tem certeza que deseja excluir esta série?")) {
        row.remove();
    }
}

addBtn.addEventListener('click', addSerie);
saveBtn.addEventListener('click', saveUpdate);
cancelBtn.addEventListener('click', cancelUpdate);
