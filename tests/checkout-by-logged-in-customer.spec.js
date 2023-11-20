// @ts-check
const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test('Checkout with one concrete product', async ({ page }) => {

  // Login as a spencor.hopkin@spryker.com
  await page.goto('/en/login');
  await page.fill('#loginForm_email', 'spencor.hopkin@spryker.com');
  await page.fill('#loginForm_password', 'change123');
  await page.click('form[name=loginForm] .form__action.button.button--success');
  await expect(new URL(page.url()).pathname).toBe('/en/customer/overview');

  // Create new cart to avoid conflicts with other tests
  await page.goto('/en/multi-cart/create');
  await page.fill('#quoteForm_name', `[e2e-scenario] Cart#${new Date().getTime()}${Math.floor(Math.random() * 900 + 100)}`);
  await page.click('form[name=quoteForm] .form__action.button.button--success');

  // Add a product to my cart
  await page.goto('/en/hp-slate-10-pro-ee-169');
  await page.click('button:has-text("Add to Cart")');

  // Start the checkout process
  await expect(new URL(page.url()).pathname).toBe('/en/cart');
  await page.waitForSelector('text=HP Slate 10 Pro EE', { timeout: 5000 });
  await page.click('a:has-text("Checkout")');

  // Fill out the address form
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/address');
  await page.selectOption('.select__select.js-address__form-select-shippingAddress', '0');
  await page.fill('#addressesForm_shippingAddress_first_name', 'Harry');
  await page.fill('#addressesForm_shippingAddress_last_name', 'Klein');
  await page.fill('#addressesForm_shippingAddress_address1', 'Julie-Wolfthorn-Str');
  await page.fill('#addressesForm_shippingAddress_address2', '1');
  await page.fill('#addressesForm_shippingAddress_zip_code', '10235');
  await page.fill('#addressesForm_shippingAddress_city', 'Berlin');
  await page.check('#addressesForm_billingSameAsShipping', { force: true });
  await page.click('button:text("Next")');

  // Select a shipment method
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/shipment');
  await page.click('#shipmentCollectionForm_shipmentGroups_0_shipment_shipmentSelection_0', { force: true });
  await page.click('button:text("Next")');

  // Select a payment method
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/payment');
  await page.click('#paymentForm_paymentSelection_dummyPaymentInvoice', { force: true });
  await page.fill('#paymentForm_dummyPaymentInvoice_date_of_birth', '01.01.2000');
  await page.click('button:text("Go to Summary")');

  // Finalize checkout
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/summary');
  await page.evaluate(() => document.querySelector('.form__action.button.button--success.js-summary__submit-button').scrollIntoView());
  await page.check('[name="acceptTermsAndConditions"]', { force: true });
  await page.evaluate(() => document.querySelector('.form__action.button.button--success.js-summary__submit-button').disabled = false);
  await page.click('button:text("Submit your order")');
});

test('should checkout with two concrete products', async ({ page }) => {

  // Login as a spencor.hopkin@spryker.com
  await page.goto('/en/login');
  await page.fill('#loginForm_email', 'spencor.hopkin@spryker.com');
  await page.fill('#loginForm_password', 'change123');
  await page.click('form[name=loginForm] .form__action.button.button--success');
  await expect(new URL(page.url()).pathname).toBe('/en/customer/overview');

  // Create new cart to avoid conflicts with other tests
  await page.goto('/en/multi-cart/create');
  await page.fill('#quoteForm_name', `[e2e-scenario] Cart#${new Date().getTime()}${Math.floor(Math.random() * 900 + 100)}`);
  await page.click('form[name=quoteForm] .form__action.button.button--success');

  // Add two products to my cart
  await page.goto('/en/hp-slate-10-pro-ee-169');
  await page.click('button:has-text("Add to Cart")');
  await page.goto('/en/acer-iconia-b1-850-156');
  await page.click('button:has-text("Add to Cart")');

  // Start the checkout process
  await expect(new URL(page.url()).pathname).toBe('/en/cart');
  await page.waitForSelector('text=HP Slate 10 Pro EE', { timeout: 5000 });
  await page.waitForSelector('text=Acer Iconia B1-850', { timeout: 5000 });
  await page.click('a:has-text("Checkout")');

  // Fill out the address form
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/address');
  await page.selectOption('.select__select.js-address__form-select-shippingAddress', '0');
  await page.fill('#addressesForm_shippingAddress_first_name', 'Harry');
  await page.fill('#addressesForm_shippingAddress_last_name', 'Klein');
  await page.fill('#addressesForm_shippingAddress_address1', 'Julie-Wolfthorn-Str');
  await page.fill('#addressesForm_shippingAddress_address2', '1');
  await page.fill('#addressesForm_shippingAddress_zip_code', '10235');
  await page.fill('#addressesForm_shippingAddress_city', 'Berlin');
  await page.check('#addressesForm_billingSameAsShipping', { force: true });
  await page.click('button:text("Next")');

  // Select a shipment method
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/shipment');
  await page.click('#shipmentCollectionForm_shipmentGroups_0_shipment_shipmentSelection_0', { force: true });
  await page.click('button:text("Next")');

  // Select a payment method
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/payment');
  await page.click('#paymentForm_paymentSelection_dummyPaymentInvoice', { force: true });
  await page.fill('#paymentForm_dummyPaymentInvoice_date_of_birth', '01.01.2000');
  await page.click('button:text("Go to Summary")');

  // Finalize checkout
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/summary');
  await page.evaluate(() => document.querySelector('.form__action.button.button--success.js-summary__submit-button').scrollIntoView());
  await page.check('[name="acceptTermsAndConditions"]', { force: true });
  await page.evaluate(() => document.querySelector('.form__action.button.button--success.js-summary__submit-button').disabled = false);
  await page.click('button:text("Submit your order")');
});
