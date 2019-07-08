const router = require('express').Router();

module.exports = (wagner) => {
    
    const userCtrl = wagner.invoke((Brand) => 
        require('../controllers/brand.controllers')(Brand));

    router.post('/', (req, res) =>
        userCtrl.createBrand(req, res));

    router.get('/',(req,res)=>
        userCtrl.findAll(req,res));
       
    router.delete('/:id',(req,res)=>
        userCtrl.deleteByI(req,res));

    return router;
}