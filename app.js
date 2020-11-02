const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/AlienDBex'
const bodyParser = require("body-parser")
const upload = require('express-fileupload')

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())
  
app.use(upload())

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/index.html')
})
app.post('/', (req, res)=>{
    if(req.files){
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)

        file.mv('./uploads/' + filename, function(err){
            if(err){
                res.send(err)
            }else{
                res.send("File Uploaded")
            }
        })
    }
})



app.use(bodyParser.urlencoded({ extended: true }));
const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)

app.listen(9000, () => {
    console.log('Server started')
})