const { Type  } = require('../models/models');
const  ApiError  = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({ name });
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }
    async getByName(req, res,next) {
        const { name } = req.params;
            const type = await Type.findOne({ where: { name } });
            if (!type) {
                return next(ApiError.badRequest('Тип не знайдено'));
            }
            return res.json(type);

    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const deletedRowCount = await Type.destroy({ where: { id } });
            if (deletedRowCount === 0) {
                return next(ApiError.badRequest('Тип не знайдено'));
            }
            return res.json({ message: 'Тип успішно видалено' });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const [updatedRowCount, updatedTypes] = await Type.update(
                { name },
                { where: { id }, returning: true }
            );
            if (updatedRowCount === 0) {
                return next(ApiError.badRequest('Тип не знайдено'));
            }
            return res.json(updatedTypes[0]);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TypeController();
