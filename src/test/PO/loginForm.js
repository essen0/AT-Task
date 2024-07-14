class loginForm {
    constructor() {
        this.selectors = {
            userNameInput: '//*[@data-test="username"]',
            passwordInput: '//*[@data-test="password"]',
            loginButton: '//*[@data-test="login-button"]',
            error: '//*[@data-test="error"]',
            usernameValue:'//*[@data-test="login-credentials"]',
            passwordValue: '//*[@data-test="login-password"]'
        };
    }
    async openPage() {
        await browser.maximizeWindow();
        await browser.url('https://www.saucedemo.com/');
    }
    async getValue(selectors, numberFromArr){
        const textElement =  await $(selectors)
        const fullText = await textElement.getText()
        const textLines = fullText.split('\n').map(line => line.trim())
        textLines.shift()
        const elementText = textLines[numberFromArr - 1];
        return elementText
    }
    async username(){
        return this.getValue(this.selectors.usernameValue, 1)
    }
    async password(){
        return this.getValue(this.selectors.passwordValue, 1)
    }
    async login(username, password){
        const userNameInput = await $(this.selectors.userNameInput)
        const passwordInput = await $(this.selectors.passwordInput)

        if (typeof username !== 'string') {
            username = String(username)
            console.log(username)
        }
        if (typeof password !== 'string') {
            password = String(password)
            console.log(password)
        }
        await userNameInput.setValue(username)
        await passwordInput.setValue(password)

        await $(this.selectors.loginButton).click()
    }
    async ErrorCheck(){
        if (await $(this.selectors.error).isExisting()) {
            const errorElement = await $(this.selectors.error)
            return await errorElement.getText()
        }
    }
} 

module.exports = new loginForm()