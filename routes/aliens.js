const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')


router.get('/', async(req,res) => {

    try{
        const aliens = await Alien.find()
        res.json(aliens)
    }catch(err){
        res.send('Error' + err)
    }
   
})


router.get('/:id', async(req,res) => {

    try{
        const aliens = await Alien.find(req.params.id)
        res.json(aliens)
    }catch(err){
        res.send('Error' + err)
    }
   
})

router.post("/upload", function(req, res){
    var title = req.body.title;
    var fileObj = req.files.myFile;
    var orgFileName = fileObj.originalname;
    var saveFileName = fileObj.name;
    var obj = {"title":title, "orgFileName":orgFileName, "saveFileName":saveFileName};
    var newData = new DBData(obj);
    newData.save(function(err){
        if(err) res.send(err);
        res.end("ok");
    });
});

router.post('/', async(req,res) => {

    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub,
        houses: req.body.houses
    })

    try{
        const a1 = await alien.save()
        res.json(alien)
    }catch(err){
        res.send('Error' + err)
    }
})


router.patch('/:id',async(req,res)=>{
    try{

        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})



module.exports = router