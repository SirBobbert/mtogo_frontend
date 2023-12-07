const { Builder, By, until } = require('selenium-webdriver');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function runTest() {
  // Set up the WebDriver
  const driver = new Builder().forBrowser('chrome').build();

  try {
    // Navigate to your application
    await driver.get('http://localhost:3000');

    // Perform login actions
    await driver.findElement(By.id('emailInput')).sendKeys('test@test.dk');
    await sleep(2000); // 2-second delay
    await driver.findElement(By.id('passwordInput')).sendKeys('1234');
    await sleep(2000); // 2-second delay
    await driver.findElement(By.id('submitLogin')).click(); // Click the login button

    // Wait for the dashboard to load
    await driver.wait(until.elementLocated(By.className('row-cols-md-3')), 5000);

    // Assuming the restaurant link has a class name 'card-title'
    const restaurantLink = await driver.findElement(By.className('card-title'));

    // Click on the first restaurant link
    await sleep(5000); // 5-second delay
    await restaurantLink.click();

    // Wait for the restaurant details page to load
    await driver.wait(until.urlContains('/restaurants/1'), 5000);

    // Assuming the "Add to Cart" button has an id 'addToCartButton'
    const addToCartButton = await driver.findElement(By.id('addToCartButton'));

    // Check if the "Add to Cart" button is present
    if (addToCartButton) {
      console.log('Found the "Add to Cart" button');
      // Click on the "Add to Cart" button and introduce a 5-second delay
      await addToCartButton.click();
      await sleep(5000);

      console.log('Clicked the "Add to Cart" button');
    } else {
      console.error('Could not find the "Add to Cart" button');
    }

    // Assuming the "Checkout" button has a class name 'btn-success'
    const checkoutButton = await driver.findElement(By.className('btn-success'));

    // Check if the "Checkout" button is present
    if (checkoutButton) {
      console.log('Found the "Checkout" button');
      // Click on the "Checkout" button and introduce a 5-second delay
      await checkoutButton.click();
      await sleep(5000);

      console.log('Clicked the "Checkout" button');
    } else {
      console.error('Could not find the "Checkout" button');
    }

    // Assert that you are still on the restaurant details page
    const currentUrl = await driver.getCurrentUrl();
    console.log('Current URL:', currentUrl);
  } finally {
    // Close the browser window
    await driver.quit();
  }
}

runTest();
