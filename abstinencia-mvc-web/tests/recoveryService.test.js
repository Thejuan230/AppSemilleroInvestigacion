const recoveryService = require("../src/services/recoveryService");

describe("recoveryService", () => {
  test("validateRiskLevel acepta valores entre 1 y 10", () => {
    expect(recoveryService.validateRiskLevel(1)).toBe(1);
    expect(recoveryService.validateRiskLevel(10)).toBe(10);
  });

  test("validateRiskLevel rechaza valores fuera de rango", () => {
    expect(() => recoveryService.validateRiskLevel(0)).toThrow("El nivel de riesgo");
    expect(() => recoveryService.validateRiskLevel(11)).toThrow("El nivel de riesgo");
  });
});
