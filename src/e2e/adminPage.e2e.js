// src/e2e/AdminPage.e2e.js
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

(async function AdminPageTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1️⃣ Go to login page
    await driver.get("http://localhost:5173/login");

    // 2️⃣ Fill login credentials for an Admin user
    await driver.findElement(By.id("email")).sendKeys("admin@example.com");
    await driver.findElement(By.id("password")).sendKeys("Password123*");
    await driver.findElement(By.css("button[type='submit']")).click();

    // 3️⃣ Wait for redirect to AdminPage (adjust path if needed)
    await driver.wait(until.urlContains("/admin"), 5000);

    // 4️⃣ Wait for either admin content OR access denied
    await driver.wait(async () => {
      const adminContent = await driver.findElements(By.css(".admin-content"));
      const denied = await driver.findElements(By.css(".access-denied"));
      return adminContent.length > 0 || denied.length > 0;
    }, 10000);

    // 5️⃣ Check if Access Denied appears
    const accessDenied = await driver.findElements(By.css(".access-denied"));
    if (accessDenied.length > 0) {
      console.log("❌ Access Denied: User is not admin.");
      return;
    }

    // 6️⃣ Verify Header and Navbar are present
    const header = await driver.findElement(By.css("header"));
    const navbar = await driver.findElement(By.css(".admin-content nav"));

    if (header && navbar) {
      console.log("✅ AdminPage rendered correctly with Header and Navbar.");
    }

    // 7️⃣ Optionally, check that content container is present
    const contentContainer = await driver.findElement(By.css(".content-container"));
    if (contentContainer) {
      console.log("✅ Content container is present.");
    }

  } catch (err) {
    console.error("AdminPage E2E test failed ❌", err);
  } finally {
    await driver.quit();
  }
})();

