const recoveryService = require("../services/recoveryService");

async function renderDashboard(req, res) {
  const data = await recoveryService.getDashboard(req.session.user.id);
  res.render("dashboard", { user: req.session.user, data, error: null });
}

async function createDailyLog(req, res) {
  try {
    await recoveryService.addDailyLog({ ...req.body, userId: req.session.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    const data = await recoveryService.getDashboard(req.session.user.id);
    res.status(400).render("dashboard", { user: req.session.user, data, error: error.message });
  }
}

async function createTrigger(req, res) {
  try {
    await recoveryService.addTrigger({ ...req.body, userId: req.session.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    const data = await recoveryService.getDashboard(req.session.user.id);
    res.status(400).render("dashboard", { user: req.session.user, data, error: error.message });
  }
}

async function createEmergencyContact(req, res) {
  try {
    await recoveryService.addEmergencyContact({ ...req.body, userId: req.session.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    const data = await recoveryService.getDashboard(req.session.user.id);
    res.status(400).render("dashboard", { user: req.session.user, data, error: error.message });
  }
}

module.exports = { renderDashboard, createDailyLog, createTrigger, createEmergencyContact };
