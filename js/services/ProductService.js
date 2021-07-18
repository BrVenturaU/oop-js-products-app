class ProductService{
    #localKey;
    constructor(){
        this.#localKey = 'products';
    }
    getProducts(){
        let products = JSON.parse(localStorage.getItem(this.#localKey));
        return products ?? [];
    }

    storeProduct(product){
        const products = this.getProducts();
        products.push(product);
        localStorage.setItem(this.#localKey, JSON.stringify(products));
    }

    storeAfterDelete(products){
        localStorage.setItem(this.#localKey, JSON.stringify(products));
    }
}

export default new ProductService();