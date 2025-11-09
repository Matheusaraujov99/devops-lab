const API_URL = 'http://localhost:3001'; 
let AUTH_TOKEN = localStorage.getItem('token');

if (!AUTH_TOKEN) {
    alert("Você precisa estar logado para acessar o sistema.");
    window.location.href = 'login.html';
}

const reservaForm = document.getElementById('reserva-form');
const laboratorioSelect = document.getElementById('laboratorio-select');

async function loadLaboratorioOptions() {
    try {
        const response = await fetch(`${API_URL}/labs`, {
            headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
        });
        
        if (!response.ok) {
            throw new Error('Erro ao carregar laboratórios');
        }

        const laboratorios = await response.json();

        laboratorios.forEach(lab => {
            const option = document.createElement('option');
            option.value = lab.id;
            option.textContent = lab.nome;
            laboratorioSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Falha ao carregar opções de laboratórios:", error);
        alert("Não foi possível carregar a lista de laboratórios. Verifique a API e o token.");
    }
}
async function handleReservaSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const laboratorioId = laboratorioSelect.value;
    const dataReserva = document.getElementById('data-reserva').value;
    const horario = document.getElementById('horario-reserva').value;

    if (!laboratorioId) {
        alert("Por favor, selecione um laboratório.");
        return;
    }

    const payload = {
        userEmail: email,
        laboratorioId: parseInt(laboratorioId),
        dataReserva: dataReserva,
        horaInicio: horario,
    };

    try {
        const response = await fetch(`${API_URL}/agendamentos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao realizar agendamento.');
        }

        alert('Agendamento realizado com sucesso!');
        reservaForm.reset();

    } catch (error) {
        console.error("Erro no agendamento:", error);
        alert(`Erro ao agendar: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLaboratorioOptions();
    reservaForm.addEventListener('submit', handleReservaSubmit);
});