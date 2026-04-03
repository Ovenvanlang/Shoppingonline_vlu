require("../utils/MongooseUtil");
const Models = require("./Models");

const CustomerDAO = {
  // ================= SELECT BY USERNAME OR EMAIL =================
  async selectByUsernameOrEmail(username, email) {
    const query = { $or: [{ username: username }, { email: email }] };
    return await Models.Customer.findOne(query);
  },

  // ================= INSERT =================
  async insert(customer) {
    const mongoose = require("mongoose");
    customer._id = new mongoose.Types.ObjectId();
    return await Models.Customer.create(customer);
  },

  // ================= ACTIVE / DEACTIVE =================
  async active(_id, token, active) {
    const query = { _id: _id, token: token };
    const newvalues = { active: active };

    return await Models.Customer.findOneAndUpdate(query, newvalues, {
      new: true,
    });
  },

  // ================= LOGIN =================
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    return await Models.Customer.findOne(query);
  },

  // ================= UPDATE =================
  async update(customer) {
    const newvalues = {
      username: customer.username,
      password: customer.password,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
    };

    return await Models.Customer.findByIdAndUpdate(
      customer._id,
      newvalues,
      { new: true }
    );
  },

  // ================= SELECT ALL =================
  async selectAll() {
    return await Models.Customer.find({}).exec();
  },

  // ================= SELECT BY ID =================
  async selectByID(_id) {
    return await Models.Customer.findById(_id).exec();
  },
};

module.exports = CustomerDAO;