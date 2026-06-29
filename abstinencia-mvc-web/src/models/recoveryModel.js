const db = require("./db");

function createDailyLog(log) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO daily_logs(user_id, log_date, mood, risk_level, notes, abstinence_day_count, had_relapse)
       VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [
        log.userId,
        log.logDate,
        log.mood,
        log.riskLevel,
        log.notes || "",
        log.abstinenceDayCount,
        log.hadRelapse ? 1 : 0,
      ],
      function onInsert(err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, ...log });
      }
    );
  });
}

function listDailyLogsByUser(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM daily_logs WHERE user_id = ? ORDER BY log_date DESC LIMIT 30",
      [userId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

function createTrigger(trigger) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO triggers(user_id, description, coping_strategy, intensity)
       VALUES(?, ?, ?, ?)`,
      [trigger.userId, trigger.description, trigger.copingStrategy, trigger.intensity],
      function onInsert(err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, ...trigger });
      }
    );
  });
}

function listTriggersByUser(userId) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM triggers WHERE user_id = ? ORDER BY created_at DESC", [userId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function createEmergencyContact(contact) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO emergency_contacts(user_id, contact_name, phone, relationship)
       VALUES(?, ?, ?, ?)`,
      [contact.userId, contact.contactName, contact.phone, contact.relationship || ""],
      function onInsert(err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, ...contact });
      }
    );
  });
}

function listEmergencyContactsByUser(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM emergency_contacts WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

function getStatsByUser(userId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT
         COUNT(*) AS total_logs,
         COALESCE(MAX(abstinence_day_count), 0) AS max_abstinence_days,
         COALESCE(SUM(had_relapse), 0) AS relapses
       FROM daily_logs
       WHERE user_id = ?`,
      [userId],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
}

module.exports = {
  createDailyLog,
  listDailyLogsByUser,
  createTrigger,
  listTriggersByUser,
  createEmergencyContact,
  listEmergencyContactsByUser,
  getStatsByUser,
};
