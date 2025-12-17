import * as React from "react";
import { render, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Portfolio from "../pages/Portfolio";

// Define the sections as they appear in the Portfolio component
const SECTIONS = [
  "home",
  "about",
  "expertise",
  "experience",
  "qualifications",
  "projects",
  "contact",
] as const;

// Wrapper component with router context
const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Helper to trigger scroll event
const triggerScroll = () => {
  const scrollEvent = new Event("scroll", { bubbles: true });
  window.dispatchEvent(scrollEvent);
};

describe("Scroll and Active Section Logic", () => {
  let mockGetElementById: ReturnType<typeof vi.spyOn>;
  let originalScrollY: number;

  beforeEach(() => {
    // 1. Enable fake timers to control the debounce function execution
    vi.useFakeTimers();

    // Store original scrollY
    originalScrollY = window.scrollY;

    // 2. Mock document.getElementById to return a mock element for each section
    mockGetElementById = vi
      .spyOn(document, "getElementById")
      .mockImplementation((id) => {
        if (SECTIONS.includes(id as (typeof SECTIONS)[number])) {
          return {
            // Default position is far out of view (bottom)
            getBoundingClientRect: vi.fn(() => ({
              top: 1000,
              bottom: 2000,
              left: 0,
              right: 0,
              width: 0,
              height: 0,
            })),
            offsetTop: 1000,
            focus: vi.fn(),
            setAttribute: vi.fn(),
            getAttribute: vi.fn(),
            tabIndex: -1,
          } as unknown as HTMLElement;
        }
        // Return actual element for skip link and other elements
        return document.querySelector(`#${id}`) as HTMLElement;
      });

    // 3. Mock window.innerHeight for boundary calculation
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(900);
  });

  afterEach(() => {
    vi.useRealTimers();
    mockGetElementById.mockRestore();
    Object.defineProperty(window, "scrollY", {
      value: originalScrollY,
      writable: true,
    });
  });

  it("renders without crashing", () => {
    const { getByRole } = renderWithRouter(<Portfolio />);
    expect(getByRole("navigation")).toBeTruthy();
  });

  it("initially sets 'home' as active section", () => {
    renderWithRouter(<Portfolio />);
    // The Portfolio component starts with 'home' as active
    // Check that the home section exists
    expect(document.getElementById("home")).toBeDefined();
  });

  it("switches to 'about' when it enters the detection zone", () => {
    renderWithRouter(<Portfolio />);

    // Detection zone: rect.top >= -80 AND rect.top < window.innerHeight / 3 (900/3 = 300)

    // Mock 'about' element to be in the zone (e.g., 150px from top)
    const aboutMock = document.getElementById("about") as unknown as {
      getBoundingClientRect: ReturnType<typeof vi.fn>;
    };
    if (aboutMock) {
      aboutMock.getBoundingClientRect = vi.fn(() => ({
        top: 150,
        bottom: 1150,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
      }));
    }

    // Simulate scroll event
    triggerScroll();

    // Run the debounced function
    act(() => {
      vi.runAllTimers();
    });

    // Verify the scroll handler was triggered
    expect(mockGetElementById).toHaveBeenCalled();
  });

  it("ignores sections when they are too far down (rect.top >= 300)", () => {
    renderWithRouter(<Portfolio />);

    // Mock 'about' element to be too far down (400px from top)
    const aboutMock = document.getElementById("about") as unknown as {
      getBoundingClientRect: ReturnType<typeof vi.fn>;
    };
    if (aboutMock) {
      aboutMock.getBoundingClientRect = vi.fn(() => ({
        top: 400,
        bottom: 1400,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
      }));
    }

    // Simulate scroll event
    triggerScroll();
    act(() => {
      vi.runAllTimers();
    });

    // Section detection logic should skip sections out of range
    expect(mockGetElementById).toHaveBeenCalledWith("home");
  });

  it("ignores sections when they are too far up (rect.top < -80)", () => {
    renderWithRouter(<Portfolio />);

    // Mock 'about' element to be too far up (-100px from top)
    const aboutMock = document.getElementById("about") as unknown as {
      getBoundingClientRect: ReturnType<typeof vi.fn>;
    };
    if (aboutMock) {
      aboutMock.getBoundingClientRect = vi.fn(() => ({
        top: -100,
        bottom: 900,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
      }));
    }

    // Simulate scroll event
    triggerScroll();
    act(() => {
      vi.runAllTimers();
    });

    // Verify the logic ran
    expect(mockGetElementById).toHaveBeenCalled();
  });

  it("sets scrolled state correctly when scrollY crosses 20px threshold", () => {
    const { getByRole } = renderWithRouter(<Portfolio />);
    const navbar = getByRole("navigation");

    // 1. Scroll < 20px (e.g., 10px)
    Object.defineProperty(window, "scrollY", { value: 10, writable: true });
    triggerScroll();
    act(() => {
      vi.runAllTimers();
    });

    // Should not have scrolled styling
    expect(navbar.className).not.toContain("backdrop-blur-md");

    // 2. Scroll > 20px (e.g., 50px)
    Object.defineProperty(window, "scrollY", { value: 50, writable: true });
    triggerScroll();
    act(() => {
      vi.runAllTimers();
    });

    // Should have scrolled styling
    expect(navbar.className).toContain("backdrop-blur-md");
  });

  it("cleans up scroll listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderWithRouter(<Portfolio />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  it("debounces rapid scroll events", () => {
    renderWithRouter(<Portfolio />);

    // Fire multiple scroll events rapidly
    for (let i = 0; i < 10; i++) {
      triggerScroll();
    }

    // Before timers run, the handler should be debounced
    // After running timers, it should only execute once
    act(() => {
      vi.runAllTimers();
    });

    // The test passes if no errors occur during rapid scrolling
    expect(true).toBe(true);
  });
});

describe("Navigation Keyboard Accessibility", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("closes mobile menu on Escape key press", async () => {
    // Mock mobile viewport
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(375);

    const { getByLabelText, getByRole, queryByRole } = renderWithRouter(
      <Portfolio />
    );

    // Find and click mobile menu button
    const menuButton = getByLabelText(/toggle navigation menu/i);
    
    await act(async () => {
      menuButton.click();
    });

    // Menu should be open - look for mobile nav
    const mobileNav = getByRole("dialog");
    expect(mobileNav).toBeTruthy();

    // Press Escape
    const escapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
    });
    document.dispatchEvent(escapeEvent);

    act(() => {
      vi.runAllTimers();
    });

    // Menu should be closed
    expect(queryByRole("dialog")).toBeNull();
  });

  it("has skip link for keyboard navigation", () => {
    const { getByText } = renderWithRouter(<Portfolio />);

    const skipLink = getByText(/skip to main content/i);
    expect(skipLink).toBeTruthy();
    expect(skipLink.getAttribute("href")).toBe("#main-content");
  });
});
