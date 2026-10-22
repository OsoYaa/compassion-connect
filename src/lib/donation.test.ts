import { describe, expect, test } from "bun:test";
import { donationDetails } from "./donation";

describe("Donation bank transfer details", () => {
  test("LEK transfers use the supplied IBAN", () => {
    expect(donationDetails.accounts.find((account) => account.currency === "LEK")?.iban).toBe("AL45208110080000108012031801");
  });
  test("EUR transfers use the supplied IBAN", () => {
    expect(donationDetails.accounts.find((account) => account.currency === "EUR")?.iban).toBe("AL18208110080000108012031802");
  });
  test("transfers use the supplied SWIFT", () => {
    expect(donationDetails.swift).toBe("USALALTRXXX");
  });
  test("transfers use the organization's account name", () => {
    expect(donationDetails.accountName).toBe("Brandon Forever 22 Legacy");
  });
  test("transfers use the supplied bank and address", () => {
    expect(donationDetails.bankName).toBe("Intesa Sanpaolo Bank Albania");
    expect(donationDetails.bankAddress).toBe("Rruga Ismail Qemali 24, Tiranë 1001");
  });
  test("organization details match the supplied address", () => {
    expect(donationDetails.organization).toBe("Brandon Forever 22 Legacy");
    expect(donationDetails.organizationAddress).toBe("Rruga “Sulejman Delvina”, Pallati “Alsjon”, Shkalla 1, Ap.5, Tiranë");
  });
});