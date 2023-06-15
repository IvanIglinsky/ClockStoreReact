const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo , Type , Brand } = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
    async updateRating(req, res) {
        const { id } = req.params;
        const { rating } = req.body;

            const device = await Device.findByPk(id);
            if (!device) {
                throw new ApiError(404, 'Товар не знайдено');
            }

            device.rating = rating;
            await device.save();
            return res.json(device);

    }
    async updateDevice(req, res, next) {
        try {
            const { id } = req.params;
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.findByPk(id);
            if (!device) {
                throw new ApiError(404, 'Товар не знайдено');
            }


            if (name) device.name = name;
            if (price) device.price = price;
            if (brandId) device.brandId = brandId;
            if (typeId) device.typeId = typeId;
            if (fileName) device.img = fileName;

            await device.save();

            if (info) {
                info = JSON.parse(info);
                await DeviceInfo.destroy({ where: { deviceId: id } });

                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: id
                    })
                );
            }

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteDevice(req, res, next) {
        try {
            const { id } = req.params;

            const device = await Device.findByPk(id);
            if (!device) {
                throw new ApiError(404, 'Device not found');
            }
            await DeviceInfo.destroy({ where: { deviceId: id } });
            await device.destroy();
            return res.json({ message: 'Товар успішно видалено' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getByName(req, res, next) {
        const { name } = req.query;
        const device = await Device.findOne({ where: { name: name } });

        if (!device) {
            return next(ApiError.badRequest('Товар не знайдено'));
        }

        return res.json({ count: 1, rows: [device] });
    }

}

module.exports = new DeviceController()
