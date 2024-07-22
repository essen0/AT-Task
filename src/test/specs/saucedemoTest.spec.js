const loginForm = require('../PO/loginForm')
const loginData = require('../Data/LoginData'); 


describe("Use cases to test https://www.saucedemo.com/", () => {  
    // Iterating through each test case from loginData
    loginData.forEach(({ username, password, errorMsg, successMsg }) => {
        it(` Given ${username} and ${password}, when attempting to login, then it should ${errorMsg ? 'display error message: ' + errorMsg : 'navigate to dashboard and display title: ' + successMsg}`, async() => {
            // Open the login page
            await loginForm.openPage()
            // Perform login attempt
            if (errorMsg) {
                // Check if the error is related to the username being required
                if (errorMsg === 'Epic sadface: Username is required') {
                    // Perform the task of filling both fields, clearing them, and verifying they are cleared
                    await loginForm.clearAllBeforeLogin(username, password);
                } else if (errorMsg === 'Epic sadface: Password is required') {
                    // Check if the error is related to the password being required
                    await loginForm.clearPasswordBeforeLogin(username, password);
                }
                // Check for the error message on the page
                let error = await loginForm.ErrorCheck();
                 // Verify that the actual error message matches the expected error message
                await expect(error).toEqual(errorMsg);
            } else if (successMsg) {
                // If a success message is expected, perform the login with credentials
                await loginForm.enteringAllCredentials(username, password);
                const title = await browser.getTitle();
                // Verify that the page title matches the expected success message
                await expect(title).toEqual(successMsg);
            }
        })
    })
})