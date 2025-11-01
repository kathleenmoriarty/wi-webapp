// src/e2e/WIUploadForm.e2e.js
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import path from "path";

async function login(driver) {
  await driver.get("http://localhost:5173/login");

  await driver.findElement(By.id("email")).sendKeys("editor@example.com");
  await driver.findElement(By.id("password")).sendKeys("Password123*");
  await driver.findElement(By.css("button[type='submit']")).click();

  // Wait for redirect to admin page
  await driver.wait(until.urlContains("/editor"), 10000);
  // Wait for a visible element on admin page to ensure page is ready
  await driver.wait(
    until.elementLocated(By.css("nav, .dashboard, h1")), // adjust selector to something always present
    10000
  );
}

(async function WIUploadFormTest() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1️⃣ Login first
    await login(driver);

    // 2️⃣ Navigate to upload page and wait until form is visible
    const uploadLink = await driver.wait(
        until.elementLocated(By.linkText("Upload New")), // adjust if it’s a button or menu item
        10000
      );
      await uploadLink.click();

    const titleInput = await driver.wait(until.elementLocated(By.id("title")), 10000);
    const productInput = await driver.findElement(By.id("product"));
    const revisionInput = await driver.findElement(By.id("revision"));
    const effectiveDateInput = await driver.findElement(By.id("effectiveDate"));
    const fileInput = await driver.findElement(By.id("file"));
    const saveDraftBtn = await driver.findElement(By.xpath("//button[text()='Save Draft']"));
    const submitBtn = await driver.findElement(By.xpath("//button[text()='Submit']"));

    // 3️⃣ Fill the form
    await titleInput.sendKeys("Test WI Title");
    await productInput.sendKeys("Test Product");
    await revisionInput.sendKeys("A1");
    await effectiveDateInput.sendKeys("2025-11-01");

    // 4️⃣ Upload a file
    const filePath = path.resolve("./src/e2e/test-file.pdf"); // ensure this file exists
    await fileInput.sendKeys(filePath);

    // 5️⃣ Save draft
    await saveDraftBtn.click();
    await driver.wait(until.elementLocated(By.xpath("//p[text()='Success!']")), 10000);
    console.log("Save Draft succeeded ✅");

    // 6️⃣ Clear & submit form
    await titleInput.clear();
    await titleInput.sendKeys("Test WI Submit");
    await submitBtn.click();
    await driver.wait(until.elementLocated(By.xpath("//p[text()='Success!']")), 10000);
    console.log("Submit succeeded ✅");

  } catch (err) {
    console.error("WIUploadForm E2E test failed ❌", err);
  } finally {
    await driver.quit();
  }
})();
