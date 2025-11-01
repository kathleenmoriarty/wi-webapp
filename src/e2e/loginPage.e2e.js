import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";// ensures chromedriver path is set

(async function loginPageTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Navigate to the login page
    await driver.get("http://localhost:5173/login");

    // 2. Wait until the email input is visible
    const emailInput = await driver.wait(
      until.elementLocated(By.id("email")),
      5000
    );

    const passwordInput = await driver.findElement(By.id("password"));
    const loginButton = await driver.findElement(By.css("button[type='submit']"));

    // 3. Fill in email and password
    await emailInput.sendKeys("admin@example.com");
    await passwordInput.sendKeys("Password123*");

    // 4. Click login
    await loginButton.click();

    // 5. Wait for navigation based on role (example: redirect to /admin)
    await driver.wait(until.urlContains("/admin"), 5000);

    console.log("Login E2E test passed ✅");
  } catch (err) {
    console.error("Login E2E test failed ❌", err);
  } finally {
    await driver.quit();
  }
})();
