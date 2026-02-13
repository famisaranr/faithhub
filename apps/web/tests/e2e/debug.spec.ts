import { test } from '@playwright/test';

const TENANT_SLUG = process.env.TEST_TENANT || 'laway-sda';
const TENANT_URL = `/${TENANT_SLUG}`;

test('DEBUG: capture page content', async ({ page }) => {
    await page.goto(TENANT_URL, { waitUntil: 'networkidle', timeout: 60000 });

    // Wait for page to load
    await page.waitForFunction(() => document.body.textContent!.length > 500, { timeout: 30000 });

    // Get full page text
    const bodyText = await page.textContent('body');

    // Save to file for inspection
    const fs = require('fs');
    const path = require('path');

    const outputPath = path.join(__dirname, '../../playwright-debug-output.txt');
    fs.writeFileSync(outputPath, bodyText || 'NO CONTENT', 'utf-8');

    console.log('Page content saved to:', outputPath);
    console.log('Content length:', bodyText?.length);
    console.log('First 500 chars:', bodyText?.substring(0, 500));
});
