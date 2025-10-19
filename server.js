const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('public')); // Serve arquivos da pasta 'public'

// Rota padrão para servir index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });
    if (username === 'admin' && password === '1234') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});