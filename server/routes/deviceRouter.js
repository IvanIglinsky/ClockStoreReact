const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require ( "../middleware/checkRoleMiddleware" );

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.get('/:name', deviceController.getByName);

router.put("/:id/:rating", checkRole('ADMIN'),deviceController.updateRating)
router.put('/:id', checkRole('ADMIN'),deviceController.updateDevice)
router.delete('/:id',checkRole('ADMIN'), deviceController.deleteDevice)

module.exports = router
