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

    removeProduct(element){
        if(element.name ===  'delete-product'){
            element.parentElement.parentElement.parentElement.remove();
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