const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require ( "../middleware/checkRoleMiddleware" );

router.post('/', checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id', brandController.delete)
router.patch('/:id', checkRole('ADMIN'),brandController.update)
router.get('/:name',brandController.getByName)

module.exports = router
