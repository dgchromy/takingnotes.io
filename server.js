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

app.post('./api/notes', function(req, res){
    try{
        activeNote = fs.readFileSync('./db/db.json', 'utf8');
        console.log(activeNote);

        activeNote = JSON.parse(activeNote);
        req.body.id = activeNote.length;
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

//deleting the note 

app.delete('.api/notes/:id', function(reg, res) {
    try{ activeNote = fs.readFileSync('./db/db.json', 'utf8');
// parse the data to get an array of objects 
activeNote = JSON.parse(activeNote);
activeNote = activeNote.filter(function(note){
    return note.id != req.params.id;
});
activeNote = JSON.stringify(activeNote);
fs.writeFile('.db/db.json', activeNote, 'utf8', function(err){
    if (err) throw err;

});
res.send(JSON.parse(active));


} catch (err) {
    throw err;
    console.log(err);
}

});

app.delete('./api/notes/:id', function(req, res){
    try{
    activeNote = fs.readFileSync('./db/db.json', 'utf8');
    activeNote = JSON.parse(activeNote);
    activeNote = activeNote.filter(function(note)
    {
    return note.id != req.params.id;

    });
    activeNote = JSON.stringify(activeNote);
    fs.writeFile('./db/db.json', activeNote, 'utf8', function(err){
        if (err) throw err;
    });

        res.send(JSON.parse(activeNote));

    } catch (err){
        throw err;
        console.log(err);
    }
});

app.get('./notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('./api/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'db/db.json'));
});

app.listen(PORT, function(){
    console.log('App Listening on: http://localhost:' + PORT)
})
