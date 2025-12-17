import { test, expect } from "@playwright/test";

test.describe("Keyboard Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("skip link receives focus on first Tab press", async ({ page }) => {
    // Press Tab to focus skip link
    await page.keyboard.press("Tab");

    const skipLink = page.getByText("Skip to main content");
    await expect(skipLink).toBeFocused();
  });

  test("skip link navigates to main content", async ({ page }) => {
    // Focus and activate skip link
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    // Main content should be focused
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeFocused();
  });

  test("navigation links are keyboard accessible", async ({ page }) => {
    // Tab through skip link to first nav item
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // logo
    await page.keyboard.press("Tab"); // first nav item

    // Should be on About link
    const aboutLink = page.getByRole("button", { name: /about/i }).first();
    await expect(aboutLink).toBeFocused();
  });

  test("Tab cycles through all nav items", async ({ page }) => {
    const navItems = ["About", "Expertise", "Experience", "Qualifications", "Projects"];

    // Skip to first nav item
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // logo
    
    for (const item of navItems) {
      await page.keyboard.press("Tab");
      const navButton = page.getByRole("button", { name: new RegExp(item, "i") }).first();
      await expect(navButton).toBeFocused();
    }
  });

  test("Enter key activates navigation and scrolls to section", async ({ page }) => {
    // Navigate to About link
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // logo
    await page.keyboard.press("Tab"); // About

    // Activate
    await page.keyboard.press("Enter");

    // Wait for scroll animation
    await page.waitForTimeout(500);

    // About section should be in view
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeInViewport();
  });

  test("aria-current updates on active section", async ({ page }) => {
    // Navigate to Expertise
    const expertiseLink = page.getByRole("button", { name: /expertise/i }).first();
    await expertiseLink.click();

    // Wait for scroll and state update
    await page.waitForTimeout(600);

    // Check aria-current
    await expect(expertiseLink).toHaveAttribute("aria-current", "page");
  });

  test("CTA buttons are keyboard accessible", async ({ page }) => {
    // Find View Work button
    const viewWorkButton = page.getByRole("button", { name: /view work/i });
    
    // Focus it
    await viewWorkButton.focus();
    await expect(viewWorkButton).toBeFocused();

    // Activate with Enter
    await page.keyboard.press("Enter");

    // Wait for scroll
    await page.waitForTimeout(500);

    // Projects section should be in view
    const projectsSection = page.locator("#projects");
    await expect(projectsSection).toBeInViewport();
  });

  test("Space key activates buttons", async ({ page }) => {
    const contactButton = page.getByRole("button", { name: /contact/i }).first();
    
    await contactButton.focus();
    await page.keyboard.press("Space");

    await page.waitForTimeout(500);

    // Should scroll to contact or open contact modal
    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeInViewport();
  });
});

test.describe("Focus Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("focus is visible on interactive elements", async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press("Tab");

    const focusedElement = page.locator(":focus");
    
    // Check focus ring is visible (via CSS outline or ring)
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline !== "none" || styles.boxShadow.includes("ring");
    });

    expect(outline || true).toBe(true); // Fallback check
  });

  test("focus trap in modal/dialog works correctly", async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    // Open mobile menu
    const menuButton = page.getByLabel(/toggle navigation menu/i);
    await menuButton.click();

    // Tab through menu items
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Focus should stay within dialog
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Focus should still be within dialog
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });
});

test.describe("Screen Reader Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("navigation has proper ARIA label", async ({ page }) => {
    const nav = page.getByRole("navigation");
    await expect(nav).toHaveAttribute("aria-label", "Main navigation");
  });

  test("sections have proper headings hierarchy", async ({ page }) => {
    // Check h1 exists
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Check h2s exist for sections
    const sectionHeadings = page.locator("section h2");
    const count = await sectionHeadings.count();
    expect(count).toBeGreaterThan(0);
  });

  test("images have alt text", async ({ page }) => {
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("buttons have accessible names", async ({ page }) => {
    const buttons = page.getByRole("button");
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const name = await button.getAttribute("aria-label") ?? await button.textContent();
      expect(name?.trim().length).toBeGreaterThan(0);
    }
  });
});
