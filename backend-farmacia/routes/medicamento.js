//Creacion de rutas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {getMedicamentos,crearMedicamento,actualizarMedicamento, borrarMedicamento} = require('../controllers/medicamentos');

const router = Router();

//Ruta del get
router.get('/', getMedicamentos);

//Ruta del post
router.post('/', [
            check('nombre', 'Este campo es obligatorio').not().isEmpty(),
            check('laboratorio', 'Este campo es obligatorio').not().isEmpty(),
            validarCampos, 
        ],
        crearMedicamento

);

//Ruta del put
router.put('/:id', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('laboratorio', 'El rol es obligatorio').not().isEmpty(),
    validarCampos, 
],
actualizarMedicamento
);

//Ruta del delete
router.delete('/:id',
borrarMedicamento
);

module.exports = router;