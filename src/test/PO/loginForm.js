class loginForm {
    constructor() {
        // Define selectors for elements on the login page
        this.selectors = {
            userNameInput: '//*[@data-test="username"]',
            passwordInput: '//*[@data-test="password"]',
            loginButton: '//*[@data-test="login-button"]',
            error: '//*[@data-test="error"]',
        }
    }
    // Method to open the login page
    async openPage() {
        // Maximize the browser window
        await browser.maximizeWindow()
        // Navigate to the specified URL
        await browser.url('https://www.saucedemo.com/')
    }
    // Method to perform login action
    async login(username, password){
        // Locate username and password input fields
        const userNameInput = await $(this.selectors.userNameInput)
        const passwordInput = await $(this.selectors.passwordInput)

        // Ensure username and password are strings
        if (typeof username !== 'string') {
            username = String(username)
        }
        if (typeof password !== 'string') {
            password = String(password)
        }
        // Enter username and password
        await userNameInput.setValue(username)
        await passwordInput.setValue(password)
        // Click the login button
        await $(this.selectors.loginButton).click()
    }
    // Method to check for error message
    async ErrorCheck(){
        // Check if error element exists
        if (await $(this.selectors.error).isExisting()) {
            const errorElement = await $(this.selectors.error)
            // If error element is displayed, return the error message
            if (await errorElement.isDisplayed()) {
                return await errorElement.getText()
            }
        }
        // Throw error if no error message found
        throw new Error("Something went wrong(ErrorMsgCheck)")
    }
} 

module.exports = new loginForm()