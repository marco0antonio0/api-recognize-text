const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const NameFilter = require('./filter.service');

const app = express();
const port = 3000;

const priorityNames = [
    "Marco Antonio", "Thiago Tomé", "Diosne Marlon", "Mateus Cunha", "Caique Pinto",
    "Carlos Victor", "José Ribeiro", "Maria Luiza", "Yuri Afonso Costa", "Gabriel Maia",
    "Jean Dias", "Alex Fernandes", "Igor Alexsandro", "Iago Dantas", "Matheus Barbosa",
    "Rellan Monteiro", "Felipe", "João Emannuel", "Jackeline", "Henrique Jeremias", "Pablo Henrique"
];
// Configuração do Multer para armazenamento de arquivos de imagem
const storage = multer.memoryStorage(); // Armazena os arquivos na memória
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota POST para receber e processar a imagem
app.post('/api/recognize-text', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    Tesseract.recognize(
        req.file.buffer,
        'eng',
        {
            logger: m => console.log(m)
        }
    ).then(result => {
        var text = result.data.text
        const filter = new NameFilter(priorityNames);
        const pessoas_presentes = filter.filterPriorityNames(text);
        res.json({ text: pessoas_presentes });
    }).catch(error => {
        res.status(500).json({ error: 'Failed to process image.' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





