const Lead = require("../models/leads");
const { generateResponse } = require("../utils/response");

class LeadsController {
  static async getLeads(req, res) {
    const leadsData = await Lead.find({}, { _id: 1, name: 1, phoneNumber: 1, email: 1, loanType: 1, createdAt: 1 });
    generateResponse(res, leadsData);
  }

  static async createLeads(req, res) {
    const {name, phoneNumber, email, loanType} = req.body;
    const newData = await Lead.create({name, phoneNumber, email, loanType});
    newData.__v = undefined;
    generateResponse(res, newData, 201, "Lead created successfully");
  }
}

module.exports = LeadsController