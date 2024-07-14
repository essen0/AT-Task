const login = require('../PO/loginForm')

describe("Use case to test https://www.saucedemo.com/", async() =>{
    
    it("Use Case - 1 : Test Login form with empty credentials", async() =>{
        await login.openPage()
        await login.login('','')
        let error =  await login.ErrorCheck()
        await expect(error).toEqual("Epic sadface: Username is required")
    })
    it("Use Case - 2 : Test Login form with credentials by passing Username", async() =>{
        await login.openPage()
        const username = await login.username()
        await login.login(username,'')
        let error =  await login.ErrorCheck()
        await expect(error).toEqual("Epic sadface: Password is required")
    })
    it("Use Case - 3 : Test Login form with credentials by passing Username & Password", async() =>{
        await login.openPage()
        const username = await login.username()
        const password = await login.password()
        await login.login(username, password)
        await browser.pause(2000);
        const title = await browser.getTitle()
        console.log(title);
    })
})