const brand = document.getElementById("searchBrand");
const model = document.getElementById("modelButton");
const region = document.getElementById("regionButton");
const engine = document.getElementById("engineButton");
const year = document.getElementById("yearButton");
const price = document.getElementById("priceButton");
const mileage = document.getElementById("mileageButton");
const clearButton = document.getElementById("clearButton");

brand.addEventListener("change", () => search());
model.addEventListener("click", () => search());
region.addEventListener("click", () => search());
engine.addEventListener("click", () => search());
year.addEventListener("click", () => search());
price.addEventListener("click", () => search());
mileage.addEventListener("click", () => search());

clearButton.addEventListener("click", () => clear());

function search() {
    const urlParams = new URLSearchParams(window.location.search);
    const brandName = document.getElementById("searchBrand").value;
    const models = document.querySelectorAll("#searchModel input[type=checkbox]:checked");
    const regions = document.querySelectorAll("#searchRegion input[type=checkbox]:checked");
    const engines = document.querySelectorAll("#searchEngine input[type=checkbox]:checked");
    const minYear = document.getElementById("searchMinYear").value;
    const maxYear = document.getElementById("searchMaxYear").value;
    const minPrice = document.getElementById("searchMinPrice").value;
    const maxPrice = document.getElementById("searchMaxPrice").value;
    const minMileage = document.getElementById("searchMinMileage").value;
    const maxMileage = document.getElementById("searchMaxMileage").value;


    const modelButton = document.getElementById("modelFilter");
    if (models.length > 0) {
        modelButton.className = "btn filter-btn-selected";
    } else {
        modelButton.className = "btn filter-btn";
    }

    const regionButton = document.getElementById("regionFilter");
    if (regions.length > 0) {
        regionButton.className = "btn filter-btn-selected";
    } else {
        regionButton.className = "btn filter-btn";
    }

    const engineButton = document.getElementById("engineFilter");
    if (engines.length > 0) {
        engineButton.className = "btn filter-btn-selected";
    } else {
        engineButton.className = "btn filter-btn";
    }

    const yearButton = document.getElementById("yearFilter");
    const searchMinYearSlider = document.getElementById("searchMinYearSlider");
    const searchMaxYearSlider = document.getElementById("searchMaxYearSlider");

    if (searchMinYearSlider.value !== searchMinYearSlider.defaultValue || searchMaxYearSlider.value !== searchMaxYearSlider.defaultValue) {
        yearButton.className = "btn filter-btn-selected";
    } else {
        yearButton.className = "btn filter-btn";
    }

    const priceButton = document.getElementById("priceFilter");
    const searchMinPriceSlider = document.getElementById("searchMinPriceSlider");
    const searchMaxPriceSlider = document.getElementById("searchMaxPriceSlider");

    if (searchMinPriceSlider.value !== searchMinPriceSlider.defaultValue || searchMaxPriceSlider.value !== searchMaxPriceSlider.defaultValue) {
        priceButton.className = "btn filter-btn-selected";
    } else {
        priceButton.className = "btn filter-btn";
    }

    const mileageButton = document.getElementById("mileageFilter");
    const searchMinMileage = document.getElementById("searchMinMileage");
    const searchMaxMileage = document.getElementById("searchMaxMileage");
    const searchMinMileageSlider = document.getElementById("searchMinMileageSlider");
    const searchMaxMileageSlider = document.getElementById("searchMaxMileageSlider");

    if (searchMinMileage.value !== searchMinMileage.defaultValue || searchMaxMileage.value !== searchMaxMileage.defaultValue) {
        mileageButton.className = "btn filter-btn-selected";
    } else {
        mileageButton.className = "btn filter-btn";
    }

    if (brandName != "Избери марка")
        urlParams.append("searchBrand", brandName);

    models.forEach((model) => {
        urlParams.append("searchModel", model.value);
    })

    regions.forEach((region) => {
        urlParams.append("searchRegion", region.value);
    })

    engines.forEach((engine) => {
        urlParams.append("searchEngine", engine.value);
    })

    urlParams.append("searchYearMin", minYear);
    urlParams.append("searchYearMax", maxYear);
    urlParams.append("searchPriceMin", minPrice);
    urlParams.append("searchPriceMax", maxPrice);
    urlParams.append("searchMileageMin", minMileage);
    urlParams.append("searchMileageMax", maxMileage);

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
    const brand = document.getElementById("searchBrand");
    const models = document.querySelectorAll("#searchModel input[type=checkbox]:checked");
    const searchModelDiv = document.getElementById("searchModel");
    const regions = document.querySelectorAll("#searchRegion input[type=checkbox]:checked");
    const engines = document.querySelectorAll("#searchEngine input[type=checkbox]:checked");
    const minYear = document.getElementById("searchMinYear");
    const maxYear = document.getElementById("searchMaxYear");
    const minYearSlider = document.getElementById("searchMinYearSlider");
    const maxYearSlider = document.getElementById("searchMaxYearSlider");
    const minPrice = document.getElementById("searchMinPrice");
    const maxPrice = document.getElementById("searchMaxPrice");
    const minPriceSlider = document.getElementById("searchMinPriceSlider");
    const maxPriceSlider = document.getElementById("searchMaxPriceSlider");
    const minMileage = document.getElementById("searchMinMileage");
    const maxMileage = document.getElementById("searchMaxMileage");
    const minMileageSlider = document.getElementById("searchMinMileageSlider");
    const maxMileageSlider = document.getElementById("searchMaxMileageSlider");

    brand.value = "all";

    models.forEach((m) => {
        m.checked = false;
    })

    searchModelDiv.innerHTML = "";

    regions.forEach((r) => {
        r.checked = false;
    })

    engines.forEach((e) => {
        e.checked = false;
    })

    minYear.value = minYear.defaultValue;
    minYearSlider.value = minYearSlider.defaultValue;
    maxYear.value = maxYear.defaultValue;
    maxYearSlider.value = maxYearSlider.defaultValue;
    minPrice.value = minPrice.defaultValue;
    minPriceSlider.value = minPriceSlider.defaultValue;
    maxPrice.value = maxPrice.defaultValue;
    maxPriceSlider.value = maxPriceSlider.defaultValue;
    minMileage.value = minMileage.defaultValue;
    minMileageSlider.value = minMileageSlider.defaultValue;
    maxMileage.value = maxMileage.defaultValue;
    maxMileageSlider.value = maxMileageSlider.defaultValue;

    search();
}