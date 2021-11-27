const dropdown = document.getElementById("brand");
const searchBrandDropdown = document.getElementById("searchBrand")

if (dropdown !== null) {
    dropdown.addEventListener("change", function() {
        let selectedBrand = dropdown.options[dropdown.selectedIndex].text;

        fetch('/add/' + selectedBrand)
            .then(res => {
                return res.text()
            })
            .then(data => {
                let models = JSON.parse(data);

                let modelsOptions = document.getElementById("model")
                modelsOptions.innerHTML = ""
                models.forEach(function(model) {
                    let option = document.createElement("option")
                    option.value = model.model
                    option.innerHTML = model.model
                    modelsOptions.appendChild(option)
                })

            })
            .catch(error => console.log(error))
    })
}

if (searchBrandDropdown !== null) {
    searchBrandDropdown.addEventListener("change", function() {
        if (searchBrandDropdown.value !== "all") {
            let selectedBrand = searchBrandDropdown.options[searchBrandDropdown.selectedIndex].text;

            fetch('/add/' + selectedBrand)
                .then(res => {
                    return res.text()
                })
                .then(data => {
                    let models = JSON.parse(data);

                    let divModel = document.getElementById("searchModel")
                    divModel.innerHTML = ""

                    models.forEach(function(model) {
                        let checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.id = model._id;
                        checkbox.name = "searchModel";
                        checkbox.value = model.model;
                        checkbox.innerHTML = model.model;

                        let label = document.createElement("label");
                        label.htmlFor = model._id;
                        label.appendChild(document.createTextNode(model.model));

                        let br = document.createElement("br");

                        divModel.appendChild(checkbox);
                        divModel.appendChild(label);
                        divModel.appendChild(br);
                    })
                })
                .catch(error => console.log(error))
        } else {
            let divModel = document.getElementById("searchModel")
            divModel.innerHTML = ""
        }
    })
}