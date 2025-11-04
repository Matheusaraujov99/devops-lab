const API_URL = 'http://localhost:3001'; // TROCAR PELA URL DA API NA NUVEM DEPOIS

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            throw new Error('Login inválido. Verifique seu email ou senha.');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        alert('Login realizado com sucesso!');
        window.location.href = 'index.html'; // Redirecionar para o formulário de reservas

    } catch (error) {
        alert(error.message);
    }
});