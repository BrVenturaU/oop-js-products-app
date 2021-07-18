'use-strict'
import Product from './models/Product.js';
import ProductUI from './UI/ProductUI.js';

const ready = (onDocumentReadyCallback) => {
    document.addEventListener('DOMContentLoaded', onDocumentReadyCallback);
}

ready(() =>{
    
    const form = document.getElementById("product-form");
    const productList = document.getElementById("product-list");
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const yearInput = document.getElementById("year");


    priceInput.addEventListener("keyup", (e) => {
        if(isNaN(parseFloat(priceInput.value))){
            priceInput.value = "";
            ProductUI.showValidateInputMessage("price", "The price must be a number or decimal.")
        }
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputErrorFieldsId = [];
        const name = nameInput.value;
        const price = priceInput.value;
        const year = yearInput.value;

        if(name == "" || name.length == 0)
            inputErrorFieldsId.push({id:"name", message: "The name is required"});
        
        if(isNaN(parseFloat(price)) || parseFloat(price) <= 0)
            inputErrorFieldsId.push({id:"price", message: "The price is required"});

        if(isNaN(parseInt(year)) || year < 1900)
            inputErrorFieldsId.push({id:"year", message: "The year is required and doesn't be lower than 1900"});

        if(inputErrorFieldsId.length > 0){
            return inputErrorFieldsId.forEach(ie => ProductUI.showValidateInputMessage(ie.id, ie.message));
        }
        const product = new Product(name, price, year);
        ProductUI.addProduct(product);
        ProductUI.showMessage("Product added successfully.", "alert-info");
        form.reset();
    });

    productList.addEventListener('click', (e) =>{
        ProductUI.removeProduct(e.target);
        ProductUI.showMessage("Product removed successfully.", "alert-success");
    });
})
