(function () {
    const book01 = {
        name: "Le grand livre de Javascript",
        ref: "301",
        price: 20
    }
    const book02 = {
        name: "HTML encore plus vite",
        ref: "355",
        price: 12
    }
    const book03 = {
        name: "Windows NT 4.0",
        ref: "343",
        price: 15
    }
    const book04 = {
        name: "Le Kit Ressource Technique NT",
        ref: "422",
        price: 13
    }
    const book05 = {
        name: "Formation Java",
        ref: "404",
        price: 50
    }
    const book06 = {
        name: "Commencer àcréer son site Web",
        ref: "500",
        price: 17
    }

    const inputs = document.querySelectorAll('input[list="books"]');

    const quantities = document.querySelectorAll('input[type="quantity"]');
    const total = document.getElementById('total');
    total.value = 0;

    let options = document.querySelectorAll('option');
    var blockRemoved = [];

    let removeBtns = document.querySelectorAll('button[name="removeBtn"]');
    let addBtn = document.querySelector('button[name="addBtn"]');

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            switch (input.value) {
                case "Le grand livre de Javascript":
                    input.parentNode.children[2].value = book01.ref;
                    input.parentNode.children[4].value = book01.price;
                    options[0].remove();
                    break;
                case "HTML encore plus vite":
                    input.parentNode.children[2].value = book02.ref;
                    input.parentNode.children[4].value = book02.price;
                    options[1].remove();
                    break;
                case "Windows NT 4.0":
                    input.parentNode.children[2].value = book03.ref;
                    input.parentNode.children[4].value = book03.price;
                    options[2].remove();
                    break;
                case "Le Kit Ressource Technique NT":
                    input.parentNode.children[2].value = book04.ref;
                    input.parentNode.children[4].value = book04.price;
                    options[3].remove();
                    break;
                case "Formation Java":
                    input.parentNode.children[2].value = book05.ref;
                    input.parentNode.children[4].value = book05.price;
                    options[4].remove();
                    break;
                case "Commencer à créer son site Web":
                    input.parentNode.children[2].value = book06.ref;
                    input.parentNode.children[4].value = book06.price;
                    options[5].remove();
                    break;
                default:
                    break;
            }
        })
    })
    quantities.forEach(quantity => {
        quantity.addEventListener('change', () => {
            if (quantity.value < 0) {
                alert("Vous ne pouvez pas saisir de quantité négative !");
                return 0;
            }
            switch (quantity.parentNode.children[0].value) {
                case "Le grand livre de Javascript":
                    quantity.parentNode.children[5].value = book01.price * quantity.value;
                    break;
                case "HTML encore plus vite":
                    quantity.parentNode.children[5].value = book02.price * quantity.value;
                    break;
                case "Windows NT 4.0":
                    quantity.parentNode.children[5].value = book03.price * quantity.value;
                    break;
                case "Le Kit Ressource Technique NT":
                    quantity.parentNode.children[5].value = book04.price * quantity.value;
                    break;
                case "Formation Java":
                    quantity.parentNode.children[5].value = book05.price * quantity.value;
                    break;
                case "Commencer à créer son site Web":
                    quantity.parentNode.children[5].value = book06.price * quantity.value;
                    break;
                default:
                    break;
            }
            total.value = parseInt(total.value) + parseInt(quantity.parentNode.children[5].value);
        })
    })

    removeBtns.forEach(removeBtn => {
        removeBtn.addEventListener('click', () => {            
            if (removeBtn.parentNode.children[3].value !== "") {               
                switch (removeBtn.parentNode.children[0].value) {
                    case "Le grand livre de Javascript":
                        total.value = parseInt(total.value) - parseInt(book01.price * removeBtn.parentNode.children[3].value);
                        break;
                    case "HTML encore plus vite":
                        total.value = parseInt(total.value) - book02.price * removeBtn.parentNode.children[3].value;
                        break;
                    case "Windows NT 4.0":
                        total.value = parseInt(total.value) - book03.price * removeBtn.parentNode.children[3].value;
                        break;
                    case "Le Kit Ressource Technique NT":
                        total.value = parseInt(total.value) - book04.price * removeBtn.parentNode.children[3].value;
                        break;
                    case "Formation Java":
                        total.value = parseInt(total.value) - book05.price * removeBtn.parentNode.children[3].value;
                        break;
                    case "Commencer à créer son site Web":
                        total.value = parseInt(total.value) - book06.price * removeBtn.parentNode.children[3].value;
                        break;
                    default:
                        break;
                }
            }
            blockRemoved.push(removeBtn.parentNode.innerHTML);
            removeBtn.parentNode.remove();
        })
    })

    addBtn.addEventListener('click', () => {
        if (blockRemoved.length !== 0) {
            let newLine = document.createElement("div");
            newLine.className = "row justify-content-around p-2";
            newLine.innerHTML = blockRemoved[0];
            blockRemoved = blockRemoved.slice(1);
            let position = addBtn.parentNode.parentNode.children.length - 2;
            addBtn.parentNode.parentNode.children[position].parentNode.insertBefore(newLine, addBtn.parentNode.parentNode.children[position]);
        }
    })
})();