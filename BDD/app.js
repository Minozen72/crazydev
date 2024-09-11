const express = require('express');
const connectDB = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

let db;

connectDB().then(database => {
    db = database;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.get('/data', async (req, res) => {
    try {
        const collection = db.collection('metier'); // Utilisation de la collection 'metier'
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/data/search', async (req, res) => {
    const { securite, confort, creativite } = req.query; // Récupérer les critères depuis les paramètres de requête
    try {
        const collection = db.collection('metier'); // Utilisation de la collection 'metier'
        const data = await collection.findOne({
            securite: parseInt(securite), // Convertir en entier
            confort: parseInt(confort),     // Convertir en entier
            creativite: parseInt(creativite) // Convertir en entier
        });
        
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Objet non trouvé');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/data', async (req, res) => {
    try {
        const collection = db.collection('metier'); // Utilisation de la collection 'metier'
        const metier = {
            nom: req.body.nom,
            description: req.body.description,
            securite: req.body.securite,
            confort: req.body.confort,
            creativite: req.body.creativite
        };
        const result = await collection.insertOne(metier);
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});
