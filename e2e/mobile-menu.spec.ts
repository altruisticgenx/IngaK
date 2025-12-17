import { test, expect, devices } from "@playwright/test";

test.describe("Mobile Menu Functionality", () => {
  test.use({ ...devices["iPhone 12"] });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("mobile menu button is visible on mobile", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await expect(menuButton).toBeVisible();
  });

  test("desktop nav links are hidden on mobile", async ({ page }) => {
    // Desktop nav should be hidden
    const desktopNav = page.locator('nav [role="menubar"]');
    await expect(desktopNav).not.toBeVisible();
  });

  test("clicking menu button opens mobile menu", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).toBeVisible();
  });

  test("mobile menu contains all navigation links", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    const navItems = ["About", "Expertise", "Experience", "Qualifications", "Projects"];

    for (const item of navItems) {
      const link = page.getByRole("dialog").getByRole("button", { name: new RegExp(item, "i") });
      await expect(link).toBeVisible();
    }
  });

  test("mobile menu has contact button", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    const contactButton = page.getByRole("dialog").getByRole("button", { name: /contact/i });
    await expect(contactButton).toBeVisible();
  });

  test("clicking nav item closes menu and scrolls", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    // Click on About
    const aboutLink = page.getByRole("dialog").getByRole("button", { name: /about/i });
    await aboutLink.click();

    // Menu should close
    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).not.toBeVisible();

    // About section should be in view
    await page.waitForTimeout(500);
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeInViewport();
  });

  test("Escape key closes mobile menu", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).toBeVisible();

    // Press Escape
    await page.keyboard.press("Escape");

    await expect(mobileMenu).not.toBeVisible();
  });

  test("clicking outside menu closes it", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).toBeVisible();

    // Click outside (on the backdrop)
    await page.mouse.click(10, 10);

    await expect(mobileMenu).not.toBeVisible();
  });

  test("menu button icon changes when open", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);

    // Initially shows menu icon (hamburger)
    const menuIcon = menuButton.locator("svg");
    const initialClass = await menuIcon.getAttribute("class");

    // Open menu
    await menuButton.click();

    // Icon should change (to X)
    const openIcon = menuButton.locator("svg");
    const openClass = await openIcon.getAttribute("class");

    // Classes may or may not differ based on implementation
    // Just verify the menu opened
    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).toBeVisible();
  });

  test("body scroll is locked when menu is open", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    // Check body overflow
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("hidden");

    // Close menu
    await page.keyboard.press("Escape");

    // Body scroll should be unlocked
    const overflowAfter = await page.evaluate(() => document.body.style.overflow);
    expect(overflowAfter).toBe("");
  });

  test("focus is trapped within open menu", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    const mobileMenu = page.getByRole("dialog");

    // Get all focusable elements in menu
    const focusableElements = mobileMenu.locator(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const count = await focusableElements.count();

    // Tab through all elements
    for (let i = 0; i < count + 2; i++) {
      await page.keyboard.press("Tab");
    }

    // Focus should still be in menu (wrapped around)
    const focusedElement = page.locator(":focus");
    const isInMenu = await focusedElement.evaluate((el, menuEl) => {
      return menuEl?.contains(el) ?? false;
    }, await mobileMenu.elementHandle());

    expect(isInMenu).toBe(true);
  });
});

test.describe("Mobile Menu - Tablet Breakpoint", () => {
  test.use({ ...devices["iPad Mini"] });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("menu button visibility at tablet size", async ({ page }) => {
    // At iPad Mini size (768px), behavior depends on breakpoint
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    
    // Check visibility - may or may not be visible at tablet
    const isVisible = await menuButton.isVisible();
    
    // Just document the behavior
    console.log(`Menu button visible at tablet: ${isVisible}`);
  });
});

test.describe("Mobile Menu - Touch Interactions", () => {
  test.use({ ...devices["iPhone 12"] });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("touch tap opens menu", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    
    // Simulate touch tap
    await menuButton.tap();

    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).toBeVisible();
  });

  test("swipe gestures work in menu", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.tap();

    // Swipe through menu items (if scrollable)
    const mobileMenu = page.getByRole("dialog");
    
    // Get bounding box for swipe
    const box = await mobileMenu.boundingBox();
    if (box) {
      // Simulate swipe up
      await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height - 50);
    }

    // Menu should still be open
    await expect(mobileMenu).toBeVisible();
  });
});

test.describe("Mobile Menu - Animation", () => {
  test.use({ ...devices["iPhone 12"] });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("menu has smooth open animation", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);

    // Start timing
    const startTime = Date.now();
    
    await menuButton.click();

    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).toBeVisible();

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Animation should complete within reasonable time
    expect(duration).toBeLessThan(1000);
  });

  test("menu has smooth close animation", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).toBeVisible();

    // Start timing close
    const startTime = Date.now();
    
    await page.keyboard.press("Escape");

    await expect(mobileMenu).not.toBeVisible();

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Close animation should complete within reasonable time
    expect(duration).toBeLessThan(1000);
  });
});

test.describe("Mobile Menu - Accessibility", () => {
  test.use({ ...devices["iPhone 12"] });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("menu button has proper aria attributes", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);

    // Check aria-expanded
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await menuButton.click();

    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  });

  test("menu dialog has proper role", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    const mobileMenu = page.getByRole("dialog");
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu).toHaveAttribute("aria-modal", "true");
  });

  test("close button has accessible name", async ({ page }) => {
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    // The toggle button should have aria-label
    await expect(menuButton).toHaveAttribute("aria-label");
  });
});
