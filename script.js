let Validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');
        Validator.clearErros();
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = Validator.checkInput(input);
            if (check !== true) {
                send = false;
                Validator.showErrorMessage(input, check);
            }
        }
        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');

                switch (rDetails[0]) {
                    case 'required':
                        if (input.value === '') {
                            return 'Campo obrigatório!';
                        }
                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'O Campo deve ter uma quantidade de caracteres minimos de ' + rDetails[1];
                        }
                        break;
                    case 'email':
                        if (input.value !== '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase()))
                                return 'Digite um Email valido'
                        }
                        break;
                }
            }
        }
        return true;
    },
    showErrorMessage: (input, error) => {
        input.style.borderColor = '#FF0000'
        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErros: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }
        let errorElements = document.querySelectorAll('.error')
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove()
        }
    }

}
let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.handleSubmit);