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
        await browser.url('https://www.saucedemo.com')
    }
    // Clear the input field by selecting all text and deleting it
    async clearInput(selector) {
        const input = await $(selector)
        await input.click()
        await browser.keys(['Control', 'a'])
        await browser.keys('Backspace')
    }
    // Set a value in the input field
    async setValue(selector, value) {
        const input = await $(selector)
        await input.setValue(value)
    }
    // Fill in username and password fields
    async login(username, password) {
        await this.setValue(this.selectors.userNameInput, username)
        await this.setValue(this.selectors.passwordInput, password)
    }
    // Clear both input fields and attempt login
    async clearAllBeforeLogin(username, password) {
        await this.login(username, password)
        await this.clearInput(this.selectors.userNameInput)
        await this.clearInput(this.selectors.passwordInput)
        await $(this.selectors.loginButton).click()
    }
    // Clear the password field and attempt login
    async clearPasswordBeforeLogin(username, password) {
        await this.login(username, password)
        await this.clearInput(this.selectors.passwordInput)
        await $(this.selectors.loginButton).click()
    }
    // Enter username and password and click the login button
    async enteringAllCredentials(username, password){
        await this.login(username, password)
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
        throw new Error("Something went wrong (ErrorMsgCheck)")
    }
} 

module.exports = new loginForm()