const http = require('http');
const path = require('path');
const status=require('http-status');

let _brand;

const createBrand = (req, res) => {
    const brand = req.body;



    _brand.create(brand)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Marca creada correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}


const findAll=(req,res)=>{
    _brand.find()
        .then((data)=>{
            if(data.length==0){
                res.status(status.NO_CONTENT);
                res.json({msg:"No se encontraron marcas"});
            }else{
                res.status(status.OK);
                res.json({msg:"Éxito!!",data:data});
            }
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:"Error"});
        });
}

const deleteByI=(req,res)=>{
    const {id}=req.params;
    _brand.findByIdAndRemove({_id:id})
        .then((data)=>{        
            res.status(status.OK);
            res.json({msg:"Éxito!!",data:data});
        })
        .catch((err)=>{
            res.status(status.BAD_REQUEST);
            res.json({msg:err});
        });

}


module.exports = (Brand) => {
    _brand = Brand;
    return({
        createBrand,
        findAll,
        deleteByI
    });
}
