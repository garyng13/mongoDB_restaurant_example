const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader("Contact-Type", "text/plain");
    next();
})

.get((req,res,next)=>{
    res.end("Will send you all the leaders");
})

.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("PUT operation is not supported on /leaders");
})

.post((req,res,next)=>{
    res.end("Will add leader " + req.body.name + " with details " + req.body.description);
})

.delete((req,res,next)=>{
    res.end("Deleting all the leaders");
});

leaderRouter.route('/:leaderId')

.all((req,res,next)=>{
    statusCode = 200;
    res.setHeader("Contact-Type", "text/plain");
    next();
})

.get((req,res,next)=>{
    res.end("Will get leader " + req.params.leaderId + " for you");
})

.put((req,res,next)=>{
    res.write("Will update " + req.params.leaderId + " for you" + '\n');
    res.end("Will update " + req.body.name + " with details " + req.body.description);
})

.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("POST is not supported on /:leaderId")
})

.delete((req,res,next)=>{
    res.end('Deleting leader: ' + req.params.leaderId);

});

module.exports = leaderRouter;

