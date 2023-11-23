// @ts-check
const { test, expect } = require('@playwright/test');

test('Checkout with one concrete product', async ({ page }) => {

  // Add a product to my cart
  await page.goto('/en/hp-slate-10-pro-ee-169');
  await page.click('button:has-text("Add to Cart")');

  // Start the checkout process
  await expect(new URL(page.url()).pathname).toBe('/en/cart');
  await page.waitForSelector('text=HP Slate 10 Pro EE', { timeout: 5000 });
  await page.click('a:has-text("Checkout")');

  // Fill out guest checkout form
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/customer');
  await page.click('#guest', { force: true });
  await page.fill('#guestForm_customer_first_name', 'Harry');
  await page.fill('#guestForm_customer_last_name', 'Klein');
  await page.fill('#guestForm_customer_email', 'harry.klein@spryker.com');
  await page.click('#guestForm_customer_accept_terms', { force: true });
  await page.click('button:text("Submit")');

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

  await page.waitForSelector('text=Your order has been placed successfully!');
});

test('should checkout with two concrete products', async ({ page }) => {

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

  // Fill out guest checkout form
  await expect(new URL(page.url()).pathname).toBe('/en/checkout/customer');
  await page.click('#guest', { force: true });
  await page.fill('#guestForm_customer_first_name', 'Harry');
  await page.fill('#guestForm_customer_last_name', 'Klein');
  await page.fill('#guestForm_customer_email', 'harry.klein@spryker.com');
  await page.click('#guestForm_customer_accept_terms', { force: true });
  await page.click('button:text("Submit")');

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

  await page.waitForSelector('text=Your order has been placed successfully!');
});
