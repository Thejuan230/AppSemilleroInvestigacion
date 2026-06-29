const recoveryModel = require("../models/recoveryModel");

function validateRiskLevel(riskLevel) {
  const value = Number(riskLevel);
  if (Number.isNaN(value) || value < 1 || value > 10) {
    throw new Error("El nivel de riesgo debe estar entre 1 y 10");
  }
  return value;
}

async function addDailyLog(payload) {
  if (!payload.logDate || !payload.mood) throw new Error("Fecha y estado emocional son obligatorios");
  const riskLevel = validateRiskLevel(payload.riskLevel);
  const abstinenceDayCount = Number(payload.abstinenceDayCount);
  if (Number.isNaN(abstinenceDayCount) || abstinenceDayCount < 0) {
    throw new Error("Los dias de abstinencia deben ser un numero valido");
  }

  return recoveryModel.createDailyLog({
    ...payload,
    riskLevel,
    abstinenceDayCount,
    hadRelapse: payload.hadRelapse === "on" || payload.hadRelapse === true,
  });
}

async function addTrigger(payload) {
  if (!payload.description || !payload.copingStrategy) {
    throw new Error("Debes registrar desencadenante y estrategia de afrontamiento");
  }
  const intensity = validateRiskLevel(payload.intensity);
  return recoveryModel.createTrigger({ ...payload, intensity });
}

async function addEmergencyContact(payload) {
  if (!payload.contactName || !payload.phone) throw new Error("Nombre y telefono son obligatorios");
  return recoveryModel.createEmergencyContact(payload);
}

async function getDashboard(userId) {
  const [dailyLogs, triggers, emergencyContacts, stats] = await Promise.all([
    recoveryModel.listDailyLogsByUser(userId),
    recoveryModel.listTriggersByUser(userId),
    recoveryModel.listEmergencyContactsByUser(userId),
    recoveryModel.getStatsByUser(userId),
  ]);

  return { dailyLogs, triggers, emergencyContacts, stats };
}

module.exports = { addDailyLog, addTrigger, addEmergencyContact, getDashboard, validateRiskLevel };
