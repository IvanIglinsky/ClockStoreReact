const {Brand  } = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const deletedRowCount = await Brand.destroy({ where: { id } });
            if (deletedRowCount === 0) {
                return next(ApiError.badRequest('Бренд не знайдено'));
            }
            return res.json({ message: 'Бренд успішно видалено' });
        } catch (error) {
            next(error);
        }
    }
    async getByName(req, res,next) {
        const { name } = req.params;
        const type = await Brand.findOne({ where: { name } });
        if (!type) {
            return next(ApiError.badRequest('Бренд не знайдено'));
        }
        return res.json(type);

    }
    async update(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const [updatedRowCount, updatedBrands] = await Brand.update(
                { name },
                { where: { id }, returning: true }
            );
            if (updatedRowCount === 0) {
                throw ApiError.notFound('Бренд не знайдено');
            }
            return res.json(updatedBrands[0]);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new BrandController()
