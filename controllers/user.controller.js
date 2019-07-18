const http = require('http');
const path = require('path');
const status = require('http-status');
const _config = require('../_config');
const jwt = require('jsonwebtoken')

var _user;

const createUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then((data) => {
            res.status(200);
            res.json({ msg: "Usuario creado correctamente", data: data });
        })
        .catch((err) => {
            res.status(400);
            res.json({ msg: "Error!!!!", data: err });
        })
}


const findAll = (req, res) => {
    _user.find()
        .then((data) => {
            if (data.length == 0) {
                res.status(status.NO_CONTENT);
                res.json({ msg: "No se encontraron usuarios" });
            } else {
                res.status(status.OK);
                res.json({ msg: "Éxito!!", data: data });
            }
        })
        .catch((err) => {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "Error" });
        });
}

const deleteByI = (req, res) => {
    const { id } = req.params;

    _user.findByIdAndRemove({ _id: id })
        .then((data) => {
            res.status(status.OK);
            res.json({ msg: "Éxito!!", data: data });
        })
        .catch((err) => {
            res.status(status.BAD_REQUEST);
            res.json({ msg: err });
        });

}

const login = (req, res) => {
    const { email, password } = req.params;
    let query = { email: email, password: password };
    _user.findOne(query, "-password")
        .then((user) => {
            if (user) {
                const token = jwt.sign({ email: email }, _config.SECRETJWT);
                res.status(status.OK);
                res.json({
                    msg: "Acceso exitoso",
                    data: {
                        user: user,
                        token: token
                    }
                });


            } else {
                res.status(status.NOT_FOUND);
                res.json({ msg: "Error!! No se encontro" });
            }
        }).catch((err) => {
            res.status(status.NOT_FOUND);
            res.json({ msg: "Error", err: err });
        });
}

const registrarUsuario = (req, res) => {

    var user = req.body;
    user["validated"] = false;

    var correo = user["email"];

    _user.create(user)
        .then((data) => {
            id=data._id;
            const sendmail = require("../email/sendmail");
            const env = {
                to: correo,
                subject: "Confirmacion",
                text: `Confirmar usuario`,
                html: `<a method="put" href="http://localhost:3000/api/v1/usuarios/registrar/${id}">Haz clic para registrarte</a>`
            }
            sendmail.send(env);
            res.status(200);
            res.json({ msg: "Usuario creado correctamente", data: data });
        })
        .catch((err) => {
            res.status(400);
            res.json({ msg: "Error!!!!", data: err });
        })
}

const validado=(req,res)=>{
    const {id}=req.params;
    const param={_id:id};
    _user.findByIdAndUpdate(param,{$set:{validated:true}})
    .then((data)=>{
        res.status(status.OK);
        res.json({msg:"usuario activado"})
    }).catch((err)=>{
        res.status(400);
        res.json({msg:"Usuario no activado"})
    })
}

module.exports = (User) => {
    _user = User;
    return ({
        createUser,
        findAll,
        deleteByI,
        login,
        registrarUsuario,
        validado
    });
}
