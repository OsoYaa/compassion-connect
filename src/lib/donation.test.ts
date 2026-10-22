import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { donationDetails } from "./donation";

describe("Donation bank transfer details", () => {
  test("LEK transfers use the supplied IBAN", () => {
    assert.equal(donationDetails.accounts.find((account) => account.currency === "LEK")?.iban, "AL45208110080000108012031801");
  });
  test("EUR transfers use the supplied IBAN", () => {
    assert.equal(donationDetails.accounts.find((account) => account.currency === "EUR")?.iban, "AL18208110080000108012031802");
  });
  test("transfers use the supplied SWIFT", () => {
    assert.equal(donationDetails.swift, "USALALTRXXX");
  });
  test("transfers use the organization's account name", () => {
    assert.equal(donationDetails.accountName, "Brandon Forever 22 Legacy");
  });
  test("transfers use the supplied bank and address", () => {
    assert.equal(donationDetails.bankName, "Intesa Sanpaolo Bank Albania");
    assert.equal(donationDetails.bankAddress, "Rruga Ismail Qemali 24, Tiranë 1001");
  });
  test("organization details match the supplied address", () => {
    assert.equal(donationDetails.organization, "Brandon Forever 22 Legacy");
    assert.equal(donationDetails.organizationAddress, "Rruga “Sulejman Delvina”, Pallati “Alsjon”, Shkalla 1, Ap.5, Tiranë");
  });
});