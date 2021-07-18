import ProductService from "../services/ProductService.js";

class ProductUI{
    addProduct(product){
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = /*html*/ `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product:</strong> ${product.name} 
                    <strong>Price:</strong> $${product.price} 
                    <strong>Year:</strong> ${product.year}
                    <button class="btn btn-danger" name="delete-product">Delete</button>
                </div>
            </div>
        `;
        
        productList.appendChild(element);
    }

    removeProduct(element, elementCollection){
        if(element.name ===  'delete-product'){
            const elementToRemove = element.parentElement.parentElement.parentElement;
            const indexOfElement = elementCollection.indexOf(elementToRemove);
            let products = ProductService.getProducts();
            products.splice(indexOfElement, 1);
            ProductService.storeAfterDelete(products);
            elementToRemove.remove();
            this.showMessage("Product removed successfully.", "alert-success");
        }
            
    }

    showMessage(message, cssClass){
        const alert = this.createAlert(message, cssClass);
        const container = document.querySelector('.container');
        const app = document.querySelector("#app");
        container.insertBefore(alert, app);
        this.disposeElement(alert);
    }

    createAlert(message, cssClass){
        const alert = document.createElement('div');
        alert.className = `alert ${cssClass} alert-dismissible fade show mt-3`;
        alert.innerText = message;
        alert.innerHTML += /*html*/ `
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `
        return alert;
    }

    disposeElement(element, msTime=3000){
        setTimeout(() => {
            element.remove();
        }, msTime);
    }

    showValidateInputMessage(inputId, message){
        const input = document.getElementById(inputId);
        const alert = this.createAlert(message, "alert-danger");
        input.parentElement.appendChild(alert);
        this.disposeElement(alert, 5000);
    }
}

export default new ProductUI();