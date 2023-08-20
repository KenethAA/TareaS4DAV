const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Medicamento = require('../models/medicamento');


//GET - MOSTRAR
const getMedicamentos = async(req, res) =>{

    const medicamentos = await Medicamento.find({}, 'nombre laboratorio vencimiento img precio cantidad ');

    res.status(200).json({
        ok:true,
        medicamentos
    })
}

//POST - CREATE
const crearMedicamento = async(req, res = response) =>{

    const {nombre,laboratorio,vencimiento,img,precio,cantidad } = req.body

    try {

     const medicamento = new Medicamento( req.body );

     //Guardar usuario con la contraseña encriptada
     await medicamento.save();
     res.status(200).json({
         ok:true,
         medicamento
      });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos!!!'
        })
    }
}

//PUT - ACTUALIZAR
const actualizarMedicamento = async (req, res = response) =>{
    
    const mid = req.params.id;

    try {

        const medicamentoDB = await Medicamento.findById( mid );

        if(!medicamentoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id del medicamenti No EXISTE!!!!!'
            });
        }

        //Actualizar
        const { nombre,laboratorio,vencimiento,img,precio,cantidad , ...campos} = req.body;
       
        campos.nombre = nombre;
        campos.laboratorio= laboratorio;
        campos.vencimiento= vencimiento;
        campos.img = img;
        campos.precio = precio;
        campos.cantidad=cantidad;

        const medicamentoActualizado = await Medicamento.findByIdAndUpdate( mid, campos, { new: true });

        res.json({
            ok: true,
            medicamento: medicamentoActualizado
        });


    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        })
    }
}

//DELETE - Borrar
const borrarMedicamento = async(req, res = response) =>{
    const mid = req.params.id
    
    try {

        const medicamentoDB = await Medicamento.findById(mid);

        if(!medicamentoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id del medicamento No EXISTE!!!!!'
            });
        }

        await Medicamento.findByIdAndDelete(mid);

        res.json({
            ok: true,
            msg: 'Medicamento Eliminado correctamente!!!'
        });
}catch(error){

    console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar registro!!!'
        })
    }
}

module.exports = {
    getMedicamentos,
    crearMedicamento,
    actualizarMedicamento,
    borrarMedicamento
}