class InventoryPage {
    constructor(){
        this.selectors = {
            burgerButton: '//*[@id="react-burger-menu-btn"]',
            burgerNav: '//nav[@class="bm-item-list"]',
            inventoryList: '//*[@data-test="inventory-list"]',
            footerCopuRight: '//*[@data-test="footer-copy"]',
        }
    }
    
}

module.exports = new InventoryPage()