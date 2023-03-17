const companyCards = { 
    companyCardDisplayed : false,
    showEntryPriceInput : function (event) {


        const button = event.target; 
        
        const input = button.closest('.watchlist-company__company-entryprice').querySelector('.entryprice-input');
        
        input.classList.remove('is-hidden')
    },
    hideEntryPriceInput : function () {
        const hideEnteryPriceInput = document.querySelector('.entryprice-input');

        
        hideEnteryPriceInput.classList.add('is-hidden');
    },
    makeCompanyCard : async function (company) {
        const companyCardTemplate = document.querySelector('#CompanyCardColumn');
        const newCompanyCard = document.importNode(companyCardTemplate.content, true);
        newCompanyCard.querySelector('.watchlist-company__company-symbol').innerHTML = company.symbol
        newCompanyCard.querySelector('.watchlist-company__company-name').innerHTML = company.name
        newCompanyCard.querySelector('.entryprice').innerHTML = company.entry_price

        const response = await fetch(app.base_url +"/tickersearch/price/"+ company.symbol)
        const responseJson = await response.json()
        const companyPrice = responseJson["Global Quote"]['05. price']
        const companyChange = responseJson["Global Quote"]['09. change']
        const companyChangeInPercent = responseJson["Global Quote"]['10. change percent']


        newCompanyCard.querySelector('.watchlist-company__company-price').innerHTML = companyPrice
        newCompanyCard.querySelector('.watchlist-company__company-price-change').innerHTML = companyChange
        newCompanyCard.querySelector('.watchlist-company__company-price-change-pourcent').innerHTML = companyChangeInPercent

        if (companyChangeInPercent < '0' && Number(companyChange) < 0) {
            newCompanyCard.querySelector('.watchlist-company__company-price-change-pourcent').style.color = 'red'
            newCompanyCard.querySelector('.watchlist-company__company-price-change').style.color = 'red'
        } else {
            newCompanyCard.querySelector('.watchlist-company__company-price-change-pourcent').style.color = 'green'
            newCompanyCard.querySelector('.watchlist-company__company-price-change').style.color = 'green'
        }

        newCompanyCard.querySelector('.fa-pen').addEventListener('click',companyCards.showEntryPriceInput);
        
        newCompanyCard.querySelector('.update-entrey-price-form').addEventListener('submit', companyCards.updateEntryPrice);
        newCompanyCard.querySelector('.entryprice-input').dataset.companyId = company.code_company;

        const companyCardsContainer = document.querySelector('.company-cards');
        
        
       
        document.querySelector('.company-cards').append(newCompanyCard);
        
    },
    updateEntryPrice : async function (event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const idCompany = event.target.closest('.update-entrey-price-form').querySelector('.entryprice-input').dataset.companyId;
        await fetch(app.base_url + "/company/" + idCompany, {
            method: 'PUT',
            body: formData
        })
        companyCards.hideEntryPriceInput()
        const inputElement = event.target[0];
        inputElement.value = "";
        inputElement.focus();
        companyCards.refeshCards(idCompany)
        // TODO faire en sorte que ca se recharge et met a jour le nouveau prix quand on ajoute un new prix watchlist-company-card
       
        
    },
    sendSelectedCompanyInDataBase : async function (symbol, name) {
        

        const symbolField = document.getElementById('symbolField');
        const nameField = document.getElementById('nameField');
        const addListForm = document.querySelector('#searchBarId');

        symbolField.value = symbol;
        nameField.value = name;

        await fetch(app.base_url + "/company", {
            method: 'POST',
            body: new FormData(addListForm)
        })
    },
    // TODO j'aarive pas a recuperer enteryPriceElement 
    refeshCards : async function (idCompany) {

       
        console.log(' comp id est' + idCompany)
        
        const response = await fetch(app.base_url + "/company/" + idCompany);
        const reponseJson = await response.json()

        // const entryPriceElements = document.querySelectorAll('.entryprice');
        // console.log(entryPriceElements)

        // entryPriceElements.forEach(entryPriceElement => {
        //     entryPriceElement.innerHTML = reponseJson.entry_price;
        //   }); CE CODE MODIFIE TOUT DONC PAS BON MAIS Y A UNE PISTE 

        const entryPriceElement = document.querySelector(`[data-company-cid="${idCompany}"] .entryprice`);

        console.log(entryPriceElement);
        entryPriceElement.innerHTML = reponseJson.entry_price;


        companyCards.makeCompanyCard(reponseJson)
    }

}