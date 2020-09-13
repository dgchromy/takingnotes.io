const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;

let activeNote = {};
//body parsing, static, middleware route 
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
//api call response

app.get('/api/notes', function(err, res) {
   try {
    activeNote = fs.readFileSync('db/db.json', 'utf8');
    console.log('is this working');
    activeNote = JSON.parse(activeNote);

   } catch (err) {
       console.log('\n error (in app.get.catch):');
       console.log(err);
   }
   res.json(activeNote);
});

app.post('/api/notes', function(req, res){
    try{
        activeNote = fs.readFileSync('./db/db.json', 'utf8');
        console.log(activeNote);

        activeNote = JSON.parse(activeNote);
        Req.body.id = activeNote.length;
        activeNote.push(req.body);
        activeNote = JSON.stringify(activeNote);
        fs.writeFile('./db/db.json', activeNote, 'utf8', function(err){
            if (err) throw err;
        });
        res.json(JSON.parse(activeNote));

    } catch (err) {
        throw err;
        console.error(err);
    }
});