import { Op } from 'sequelize';

class SuperService {
  constructor(model) {
    this.model = model;
  }

  async create(body) {
    return await this.model.create(body);
  }

  async findAll(value) {
    return await this.model.findAll({ where: value }); 
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findOne(value) {
    return await this.model.findOne({ where: value });
  }

  async findAllPopulatedData(model, path) {
    return await this.model.findAll({ include: { model, as: path }});
  }
  
  async findAllValuePopulatedData(model, path, condition) {
    return await this.model.findAll({ 
      where: condition, 
      include: [{ model, as: path }]});
  }

  async findPopulatedDataWithID(id, otherModel, path) {
    return await this.model.findByPk(id, { include: { model: otherModel, as: path }});
  }
  
  async findAllPopulatedDataWithField(value, otherModel, path) {
    return await this.model.findAll({ 
      where: value, 
      include: { 
        model: otherModel, 
        as: path 
      }
    });
  }

  async findAllPopulatedDataWithInnerField(otherModel, condition, path) {
    return await this.model.findAll({ 
      where: condition, 
        include: [{
            model: otherModel, 
            as: path,
            where: {
              trash: {
                [Op.or]: [false, null],
              }
            },
            required: false,
        }], 
    });
  }
  
  async findPopulatedDataWithIDAndInnerField(id, otherModel, path) {
    return await this.model.findByPk(id, { 
      where: {
        trash: false,
      }, 
        include: [{
            model: otherModel, 
            as: path,
            where: {
              trash: {
                [Op.or]: [false, null],
              }
            },
            required: false,
        }], 
    });
  }

  async findOneByAndTwoFieldNames(field1, field2) {
    const finalCondition = { [Op.and]: [field1, field2] };
    return await this.model.findOne({ where: finalCondition });
  }
  
  async findOneByOrTwoFieldNames(field1, field2) {
    const finalCondition = { [Op.or]: [field1, field2] };
    return await this.model.findOne({ where: finalCondition });
  }

  async findAllByOneFieldName(value, selectField = "createdAt") {
    return await this.model.findAll({ where: value, attributes: { exclude: [selectField] } });
  }

  async findAllByTwoFieldNames(field1, field2,  filed3, options = {}) {
    const finalCondition = { [Op.and]: [field1, field2, filed3] };
    const queryOptions = { where: finalCondition, ...options };
    return await this.model.findAll(queryOptions);
  }

  async updateById(id, body) {
    return await this.model.update(body, { where: { id } });
  }

  async updateOne(value, body) {
    return await this.model.update(body, { where: value });
  }

  async updateMany(body, value) {
    return await this.model.update(body, { where: value });
  }

  async deleteById(id) {
    return await this.model.destroy({ where: { id } });
  }

  async deleteMany(value) {
    return await this.model.destroy({ where: value });
  }

  async countDocuments() {
    return await this.model.count();
  }

  async findLatest(condition, orderBy = 'createdAt') {
    return this.model.findAll({
      where: condition,
      order: [[orderBy, 'DESC']]
    });
  }
  
}

export default SuperService;