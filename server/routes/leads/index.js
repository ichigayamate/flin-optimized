const LeadsController = require('../../controllers/leads');
const { authenthication } = require('../../helpers/auth');
const router = require('express').Router();

router.get("/", authenthication, LeadsController.getLeads);
router.post("/", LeadsController.createLeads);

module.exports = router;