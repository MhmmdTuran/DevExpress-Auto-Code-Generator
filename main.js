const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// 'public' klasörünü statik dosyalar için ayarla
app.use(express.static(path.join(__dirname, 'public')));

// Ana rota
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
