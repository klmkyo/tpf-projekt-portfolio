#!/usr/bin/env node

import { access, mkdir, readdir } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reportRoot = path.resolve(__dirname, "..");
const outputDir = path.join(reportRoot, "img", "screenshots");

const desktopViewport = { width: 1920, height: 1080 };
const mobileViewport = {
  width: 430,
  height: 932,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};

const defaultBaseUrl =
  process.env.REPORT_SCREENSHOT_BASE_URL ??
  "https://tpf-projekt-portfolio.polished-wave-a33b.workers.dev";

const defaultPhotoProjectIndex = Number.parseInt(
  process.env.REPORT_PHOTO_PROJECT_INDEX ?? "1",
  10,
);

async function pathExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function resolvePlaywrightModule() {
  const requireFromHere = createRequire(import.meta.url);
  const candidateModuleDirs = [
    process.env.PLAYWRIGHT_NODE_MODULES_DIR,
    path.join(process.cwd(), "node_modules"),
    path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules"),
  ].filter(Boolean);

  for (const moduleDir of candidateModuleDirs) {
    const packageJsonPath = path.join(moduleDir, "playwright", "package.json");
    if (!(await pathExists(packageJsonPath))) {
      continue;
    }

    const scopedRequire = createRequire(packageJsonPath);
    return scopedRequire("playwright");
  }

  try {
    return requireFromHere("playwright");
  } catch {
    throw new Error(
      "Cannot resolve Playwright. Install it locally or set PLAYWRIGHT_NODE_MODULES_DIR.",
    );
  }
}

async function discoverChromiumExecutable() {
  if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) {
    return process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  }

  const cacheRoot = path.join(os.homedir(), "Library", "Caches", "ms-playwright");
  if (!(await pathExists(cacheRoot))) {
    return undefined;
  }

  const queue = [cacheRoot];
  const executableNames = new Set(["Google Chrome for Testing", "chrome", "Chromium"]);

  while (queue.length > 0) {
    const currentDir = queue.shift();
    if (!currentDir) {
      continue;
    }

    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const nextPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        queue.push(nextPath);
        continue;
      }

      if (entry.isFile() && executableNames.has(entry.name)) {
        return nextPath;
      }
    }
  }

  return undefined;
}

async function gotoRoute(page, routePath) {
  await page.goto(new URL(routePath, `${defaultBaseUrl}/`).toString(), {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(1800);
}

async function waitForHero(page) {
  await page.waitForSelector("main section h1", { timeout: 20000 });
}

async function scrollPortfolioIntoView(page) {
  await page.waitForSelector("main section:nth-of-type(2)", { timeout: 20000 });
  await page.locator("main section:nth-of-type(2)").evaluate((element) => {
    element.scrollIntoView({ block: "start" });
    window.scrollBy({ top: -24, behavior: "instant" });
  });
  await page.waitForTimeout(700);
}

async function captureViewport(page, fileName) {
  await page.screenshot({
    path: path.join(outputDir, fileName),
    type: "png",
    fullPage: false,
  });
}

async function captureDesktopShots(browserType, launchOptions) {
  const browser = await browserType.launch(launchOptions);
  const context = await browser.newContext({
    viewport: desktopViewport,
    screen: desktopViewport,
    deviceScaleFactor: 1,
    colorScheme: "light",
  });

  const page = await context.newPage();

  await gotoRoute(page, "/");
  await waitForHero(page);
  await captureViewport(page, "home-hero-desktop.png");

  await scrollPortfolioIntoView(page);
  await captureViewport(page, "portfolio-grid-desktop.png");

  const portfolioButtons = page.locator("main section:nth-of-type(2) button");
  const buttonCount = await portfolioButtons.count();
  const projectIndex = Number.isFinite(defaultPhotoProjectIndex)
    ? Math.max(0, Math.min(defaultPhotoProjectIndex, Math.max(buttonCount - 1, 0)))
    : 1;

  await portfolioButtons.nth(projectIndex).click();
  await page.waitForSelector('[role="dialog"] img', { timeout: 15000 });
  await page.waitForTimeout(500);
  await captureViewport(page, "photo-fullscreen-desktop.png");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  await page.locator("main section").first().locator("button").first().click();
  await page.waitForSelector('[role="dialog"] iframe, [role="dialog"] a', { timeout: 15000 });
  await page.waitForTimeout(1800);
  await captureViewport(page, "reel-fullscreen-desktop.png");

  await gotoRoute(page, "/contact");
  await page.waitForSelector("main h1", { timeout: 20000 });
  await captureViewport(page, "contact-desktop.png");

  await gotoRoute(page, "/login");
  await page.waitForSelector("form", { timeout: 20000 });
  await captureViewport(page, "login-desktop.png");

  await context.close();
  await browser.close();
}

async function captureMobileShot(browserType, launchOptions) {
  const browser = await browserType.launch(launchOptions);
  const context = await browser.newContext({
    viewport: {
      width: mobileViewport.width,
      height: mobileViewport.height,
    },
    screen: {
      width: mobileViewport.width,
      height: mobileViewport.height,
    },
    deviceScaleFactor: mobileViewport.deviceScaleFactor,
    isMobile: mobileViewport.isMobile,
    hasTouch: mobileViewport.hasTouch,
    colorScheme: "light",
  });

  const page = await context.newPage();
  await gotoRoute(page, "/");
  await waitForHero(page);

  await page.screenshot({
    path: path.join(outputDir, "home-hero-mobile-portrait.png"),
    type: "png",
    fullPage: false,
  });

  await context.close();
  await browser.close();
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const playwright = await resolvePlaywrightModule();
  const executablePath = await discoverChromiumExecutable();
  const launchOptions = {
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  };

  console.log(`Using base URL: ${defaultBaseUrl}`);
  if (executablePath) {
    console.log(`Using browser executable: ${executablePath}`);
  }

  await captureDesktopShots(playwright.chromium, launchOptions);
  await captureMobileShot(playwright.chromium, launchOptions);

  console.log(`Saved screenshots to ${outputDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
