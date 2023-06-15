const {BasketDevice , Brand , Basket } = require('../models/models');

class BasketDeviceController {
    async getBasketDevices(req, res, next) {
        try {
            const basketDevices = await BasketDevice.findAll();
            return res.json(basketDevices);
        } catch (error) {
            next(error);
        }

    }
    async getOneBasketDevice(req, res, next) {
        try {
            const { id } = req.params;
            const one = await BasketDevice.findOne({ where: { deviceId: id } });
            return res.json(one);
        } catch (error) {
            next(error);
        }
    }

    async addDeviceToBasket(req, res, next) {
        try {
            const { deviceId } = req.body;

            const basketDevice = await BasketDevice.create({ deviceId });

            return res.status(201).json(basketDevice);
        } catch (error) {
            next(error);
        }
    }

    async removeDeviceFromBasket(req, res, next) {
        try {
            const { id } = req.params;

            await BasketDevice.destroy({ where: { id } });

            return res.status(200).json({ message: 'Device removed from the basket' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BasketDeviceController();
