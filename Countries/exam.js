(function () { // IIFE

    $(function () {

        const DOMAIN = "https://restcountries.eu"

        $("#search").click(onSearch);
        $("#allCountries").click(getAllCountriesFromModel);
        $("#removeAllCountries").click(removeAll);

        //-------------------------------------------model---------------------------------------------
        /**
         * This function sends a request to the API, And accepts countries that user request in the input
        */
        function onSearch() {

            let valueOfInput = $("#valueOfSearch");
            let isValidInput = validateInput(valueOfInput);

            if (!isValidInput) {
                return;
            }

            //init of input border
            valueOfInput.css("border", "");

            let querySelectorAll = "/rest/v2/name/";

            let url = DOMAIN + querySelectorAll + valueOfInput.val().trim();

            $.get(url).then(
                function (countries) {
                    $("#valueOfSearch").val("");
                    removeAll();
                    showCountries(countries);

                })
                .catch(function (error) {
                    console.log("my error: " + JSON.stringify(error));
                    valueOfInput.css("border", "solid 3px red");
                    alert("Try again cannot found the country");
                });
        }

        /**
         * This function sends a request to the API, And accepts all countries
         */
        function getAllCountriesFromModel() {

            $(".myBody").empty();

            let querySelectorAll = "/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag";
            let url = DOMAIN + querySelectorAll;

            $.get(url).then(
                function (countries) {
                    removeAll();
                    showCountries(countries);
                })
                .catch(function (error) {
                    console.log("my error: " + error);
                });
        }



        //-------------------------------------------view---------------------------------------------

        /**
        * This function shows the countries on the html page
        */
        function showCountries(countries) {
            for (let country of countries) {

                let card = $("<div>");
                card.attr("class", "card");

                let img = $("<img>");
                img.attr("class", "card-img-top");
                img.attr("src", country.flag);

                let cardBody = $("<div>");
                cardBody.attr("class", "card-body");

                let description = createDescription(country);
                let currencies = createCurrencies(country);

                card.append(img);
                card.append(cardBody);
                cardBody.append(description);
                cardBody.append(currencies);
                $(".myBody").append(card);
            }
        }

        /**
        * This function create Description  in <h5>
        */
        function createDescription(country) {

            let description = $("<h5>");
            description.attr("class", "card-title");

            description.html("1) name: " + country.name + "<br>" +
                "2) top level domain: " + country.topLevelDomain + "<br>" +
                "3) capital: " + country.capital + "<br>" +
                "4) currencies: " + "<br>");

            return description;

        }

        /**
        * This function create Currencies in <h5>
        */
        function createCurrencies(country) {
            let currencies = $("<p>");
            currencies.attr("class", "card-title");

            for (let index = 0; index < country.currencies.length; index++) {
                let currenciesStr = $("<p>");

                currenciesStr.html("code: " + country.currencies[index].code + "<br>" +
                    "name: " + country.currencies[index].name + "<br>" +
                    "symbol: " + country.currencies[index].symbol);
                currencies.append(currenciesStr);
            }
            return currencies;

        }
        /**
         * This function deletes all countries from the body
         */
        function removeAll() {
            $(".myBody").empty();
        }

        //-------------------------------------------controler---------------------------------------------

        /**
         * This function performs validation on the input
         */
        function validateInput(valueOfInput) {

            if (valueOfInput.val().trim() == "") {
                valueOfInput.css("border", "solid 3px red");
                alert("Please enter a country name");
                return false
            }
            return true
        }

    });

})();