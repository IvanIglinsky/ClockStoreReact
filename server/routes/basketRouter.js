const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.addDeviceToBasket)
router.get('/', basketController.getBasketDevices)
router.delete('/:id',basketController.removeDeviceFromBasket)
router.get('/:id',basketController.getOneBasketDevice)

module.exports = router
