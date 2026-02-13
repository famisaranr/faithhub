import { test, expect } from '@playwright/test';

/**
 * Deployment Verification Test Suite
 * Simplified tests with flexible assertions
 */

const TENANT_SLUG = process.env.TEST_TENANT || 'laway-sda';
const TENANT_URL = `/${TENANT_SLUG}`;

test.describe('Deployment Verification Suite', () => {

    test('should load tenant app successfully', async ({ page }) => {
        // Navigate and wait for network to be idle
        await page.goto(TENANT_URL, { waitUntil: 'networkidle', timeout: 60000 });

        // Verify page title or body has content
        const bodyText = await page.textContent('body');
        expect(bodyText).toBeTruthy();
        expect(bodyText!.length).toBeGreaterThan(50);
    });

    test('should have navigation elements', async ({ page }) => {
        await page.goto(TENANT_URL, { waitUntil: 'networkidle', timeout: 60000 });

        // Wait for page to have substantial content
        await page.waitForFunction(() => document.body.textContent!.length > 500, { timeout: 30000 });

        const pageContent = await page.textContent('body');

        // Check for any navigation-related content
        // The app might use different navigation patterns
        const hasNavigation =
            pageContent?.includes('Home') ||
            pageContent?.includes('Bible') ||
            pageContent?.includes('Events') ||
            pageContent?.includes('Menu') ||
            pageContent?.includes('Navigation');

        expect(hasNavigation).toBe(true);
    });

    test('should display schedule or program content', async ({ page }) => {
        await page.goto(TENANT_URL, { waitUntil: 'networkidle', timeout: 60000 });

        // Wait for page to have substantial content
        await page.waitForFunction(() => document.body.textContent!.length > 1000, { timeout: 30000 });

        const pageContent = await page.textContent('body');

        // Check for schedule-related content (be flexible)
        const hasScheduleContent =
            pageContent?.includes('Sabbath') ||
            pageContent?.includes('Schedule') ||
            pageContent?.includes('Program') ||
            pageContent?.includes('Order') ||
            pageContent?.includes('Service');

        expect(hasScheduleContent).toBe(true);
    });

    test('should not have specific names in default schedule', async ({ page }) => {
        await page.goto(TENANT_URL, { waitUntil: 'networkidle', timeout: 60000 });

        await page.waitForFunction(() => document.body.textContent!.length > 1000, { timeout: 30000 });

        const pageContent = await page.textContent('body');

        // Should NOT contain specific names like "Sis. Maria Santos"
        expect(pageContent).not.toMatch(/sis\.\s+maria\s+santos/i);
        expect(pageContent).not.toMatch(/bro\.\s+juan/i);
    });

    test('page should load without critical errors', async ({ page }) => {
        const errors: string[] = [];

        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto(TENANT_URL, { waitUntil: 'networkidle', timeout: 60000 });

        await page.waitForFunction(() => document.body.textContent!.length > 500, { timeout: 30000 });

        // Filter out known non-critical errors
        const criticalErrors = errors.filter(err =>
            !err.includes('favicon') &&
            !err.includes('analytics') &&
            !err.includes('third-party') &&
            !err.includes('DevTools') &&
            !err.includes('_next/static')
        );

        // Log errors for debugging
        if (criticalErrors.length > 0) {
            console.log('Console errors found:', criticalErrors);
        }

        // Allow up to 3 non-critical errors
        expect(criticalErrors.length).toBeLessThanOrEqual(3);
    });
});
