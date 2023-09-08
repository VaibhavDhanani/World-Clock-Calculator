let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('input[type=button]');
let string = "";
let arr = Array.from(buttons);
let calc = document.getElementsByClassName('calculator');
console.log(calc[0]);

arr.forEach(button => {

    button.addEventListener('click', (e) => {

        try {
            if (e.target.value == '=') {
                string = eval(string);
                input.value = string;
            }
            else if (e.target.value == 'sin'){
                let a = (input.value)*3.14/180 ;
                string = Math.sin(a).toFixed(2);
                input.value = string ;
            }
            else if (e.target.value == 'cos'){
                let a = (input.value)*3.14/180 ;
                string = Math.cos(a).toFixed(2);
                input.value = string ;
            }
            else if (e.target.value == 'tan'){
                let a = (input.value)*3.14/180 ;
                string = Math.tan(a).toFixed(2);
                input.value = string ;
            }
            else if (e.target.name == 'cube'){
                let a = input.value;
                string = Math.pow(a,1/3).toFixed(2);
                input.value = string ;
            }
            else if (e.target.name == 'sqrt'){
                let a = input.value;
                string = Math.pow(a,1/2).toFixed(2);
                input.value = string ;
            }
            else if (e.target.value == 'AC') {
                string = "";
                input.value = string;
            }
            else if (e.target.value == 'DE') {
                string = string.substring(0, string.length - 1);
                input.value = string;
            }
            else {
                string += e.target.value;
                input.value = string;
            }
        } catch (e) {
            if (e instanceof SyntaxError) {
                string = "ERROR!";
                input.value = string;

            }
        }
    });


});



