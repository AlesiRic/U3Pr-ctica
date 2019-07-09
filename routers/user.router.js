const router = require('express').Router();

module.exports = (wagner) => {
    
    const userCtrl = wagner.invoke((User) => 
        require('../controllers/user.controller')(User));

    router.post('/registrar/', (req, res) =>
        userCtrl.registrarUsuario(req,res));

    router.get('/',(req,res)=>
        userCtrl.findAll(req,res));

    router.get('/login/:email/:password',(req,res)=>
        userCtrl.login(req,res));

    router.delete('/:id',(req,res)=>
        userCtrl.deletByI(req,res));
    router.put('/registrar/:id',(req,res)=>
        userCtrl.validado(req,res));

    

    return router;
}