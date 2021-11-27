(function() {
    let parents = document.querySelectorAll(".var-slider");
    if (!parent)
        return;

    parents.forEach((parent) => {
        let rangeS = parent.querySelectorAll("input[type=range]");
        let numberS = parent.querySelectorAll("input[type=number]");

        rangeS.forEach(function(el) {
            el.oninput = function() {
                let slide1 = parseInt(rangeS[0].value);
                let slide2 = parseInt(rangeS[1].value);

                if (slide1 > slide2) {
                    [slide1, slide2] = [slide2, slide1];
                }

                numberS[0].value = slide1;
                numberS[1].value = slide2;
            }
        });

        numberS.forEach(function(el) {
            el.oninput = function() {
                let number1 = parseInt(numberS[0].value);
                let number2 = parseInt(numberS[1].value);

                if (number1 > number2) {
                    let tmp = number1;
                    numberS[0].value = number2;
                    numberS[1].value = tmp;
                }

                rangeS[0].value = number1;
                rangeS[1].value = number2;
            }
        });
    });
})();