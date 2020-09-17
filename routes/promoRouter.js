const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader("Contact-Type", "text/plain");
    next();
})

.get((req,res,next)=>{
    res.end("Will send you all the promtoions");
})

.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("PUT operation is not supported on /promotions");
})

.post((req,res,next)=>{
    res.end("Will add promotion " + req.body.name + " with details " + req.body.description);
})

.delete((req,res,next)=>{
    res.end("Deleting all the promotions");
});

promoRouter.route('/:promoId')

.all((req,res,next)=>{
    statusCode = 200;
    res.setHeader("Contact-Type", "text/plain");
    next();
})

.get((req,res,next)=>{
    res.end("Will get dish " + req.params.promoId + " for you");
})

.put((req,res,next)=>{
    res.write("Will update " + req.params.promoId + " for you" + '\n');
    res.end("Will update " + req.body.name + " with details " + req.body.description);
})

.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("POST is not supported on /:promoId")
})

.delete((req,res,next)=>{
    res.end("Deleting all promotions for you");
});

module.exports = promoRouter;
