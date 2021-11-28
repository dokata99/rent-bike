const region = document.getElementById("regionButton");
const price = document.getElementById("priceButton");
const clearButton = document.getElementById("clearButton");

if (region != null) {
    region.addEventListener("click", () => search());
}

if (price != null) {
    price.addEventListener("click", () => search());
}

if (clearButton != null) {
    clearButton.addEventListener("click", () => clear());
}

function search() {
    const urlParams = new URLSearchParams(window.location.search);
    const regions = document.querySelectorAll("#searchRegion input[type=checkbox]:checked");
    const minPrice = document.getElementById("searchMinPrice").value;
    const maxPrice = document.getElementById("searchMaxPrice").value;

    const regionButton = document.getElementById("regionFilter");
    if (regions.length > 0) {
        regionButton.className = "btn filter-btn-selected";
    } else {
        regionButton.className = "btn filter-btn";
    }

    const priceButton = document.getElementById("priceFilter");
    const searchMinPriceSlider = document.getElementById("searchMinPriceSlider");
    const searchMaxPriceSlider = document.getElementById("searchMaxPriceSlider");

    if (searchMinPriceSlider.value !== searchMinPriceSlider.defaultValue || searchMaxPriceSlider.value !== searchMaxPriceSlider.defaultValue) {
        priceButton.className = "btn filter-btn-selected";
    } else {
        priceButton.className = "btn filter-btn";
    }

    regions.forEach((region) => {
        urlParams.append("searchRegion", region.value);
    })

    urlParams.append("searchPriceMin", minPrice);
    urlParams.append("searchPriceMax", maxPrice);

    fetch("/?" + urlParams)
        .then(res => {
            return res.text();
        })
        .then(data => {
            data = data.split("<div id='inner-container'>");
            data = data[1].split("<footer>");
            let htmlBody = document.getElementById("inner-container");
            htmlBody.innerHTML = data[0];
        });
}

function clear() {
    const regions = document.querySelectorAll("#searchRegion input[type=checkbox]:checked");
    const minPrice = document.getElementById("searchMinPrice");
    const maxPrice = document.getElementById("searchMaxPrice");
    const minPriceSlider = document.getElementById("searchMinPriceSlider");
    const maxPriceSlider = document.getElementById("searchMaxPriceSlider");

    regions.forEach((r) => {
        r.checked = false;
    });

    minPrice.value = minPrice.defaultValue;
    minPriceSlider.value = minPriceSlider.defaultValue;
    maxPrice.value = maxPrice.defaultValue;
    maxPriceSlider.value = maxPriceSlider.defaultValue;

    search();
}