const login = require('../PO/loginForm')

describe("Use cases to test https://www.saucedemo.com/", () => {
    //Data Provider
    const loginData = [
        { username: '', password: '', errorMsg: 'Epic sadface: Username is required' },
        { username: 'standard_user', password: '', errorMsg: 'Epic sadface: Password is required' },
        { username: 'standard_user', password: 'secret_sauce', successMsg: 'Swag Labs' }
    ]
    // Iterating through each test case from loginData
    loginData.forEach(({ username, password, errorMsg, successMsg }) => {
        it(`Given ${username} and ${password}, when attempting to login, then it should ${errorMsg ? 'display error message: ' + errorMsg : 'navigate to dashboard and display title: ' + successMsg}`, async() => {
            // Open the login page
            await login.openPage()
            // Perform login attempt
            await login.login(username, password)
            
            // Check for error message if provided
            if (errorMsg) {
                let error = await login.ErrorCheck()
                await expect(error).toEqual(errorMsg)
            } else if (successMsg) {
                // Check for success message (title verification)
                const title = await browser.getTitle()
                await expect(title).toEqual(successMsg)
            }
        })
    })
})