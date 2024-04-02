"use strict";
const openCardCreatorBnt = document.querySelector('[data="openCreateNewCardBnt"]');
const popUpContainer = document.querySelector('[data="popUpContainer"]');
const popUpContainerBntClose = document.querySelector('[data="popUpContainer__bntClose"]');
const createNewCardBnt = document.querySelector('[data="createNewCardBnt"]');
const cardExtendedCreateNewCard = document.querySelector('[data="cardExtended__CreateNewCard"]');
const activeCardBnt = document.querySelector('[data="activeCardBnt"]');
const cardsContainer = document.querySelector('[data="cards__container"]');
const popUpContainerDynamic = document.querySelector('[data="popUpContainerDynamic"]');
const popUpContainerDynamicCloseBnt = document.querySelector('[data="popUpContainerDynamic__bntClose"]');
const popUpContainerDynamicContainer = document.querySelector('[data="popUpContainerDynamicConatiner"]');
let MyList = [];
let MyListCurrentItem = 0;
let CurrentExtendedCard;
let editMode = false;
const genresCard = ["Fantasia", "Ficção", "Distopia", "Ação", "Aventura", "Horror", "Suspense", "Romance", "Humor"];
const typesCard = ["Anime", "Serie", "Mangá", "Graphic Novel", "Livro"];
const loadMyList = () => {
    const list = localStorage.getItem('MinhaListaDeObras');
    if (list == null)
        return;
    MyList = JSON.parse(list);
};
const loadMyListInDom = (list) => {
    const cards = [];
    list.forEach(card => {
        cards.push(makeCardInDom(card));
    });
    cardsContainer.innerHTML = '';
    cardsContainer.innerHTML += cards.join(' ');
};
openCardCreatorBnt.addEventListener('click', event => {
    openCardCreator();
});
const openCardCreator = () => {
    popUpContainer.classList.remove('display__none');
};
popUpContainerBntClose.addEventListener('click', event => {
    closeCardCreator();
});
const closeCardCreator = () => {
    popUpContainer.classList.add('display__none');
};
activeCardBnt.addEventListener('click', event => {
    activeCardBnt.classList.toggle('cardExtended__bntActive_--AC');
});
cardsContainer.addEventListener('click', event => {
    const elementClickd = event.target;
    if (elementClickd.getAttribute('data') == 'interactable') {
        const elementClickdId = parseInt(elementClickd.id);
        const index = seachCardInMyList(elementClickdId);
        openPopUpContainerDynamic();
        makeCardExtendedInDom(MyList[index]);
        MyListCurrentItem = index;
    }
    else {
        console.log('fora');
    }
});
popUpContainerDynamicCloseBnt.addEventListener('click', event => {
    popUpContainerDynamicClose();
    editMode == true ? editMode = false : 0;
});
const popUpContainerDynamicClose = () => {
    disableChangeFunctions();
    popUpContainerDynamic.classList.add('display__none');
};
const openPopUpContainerDynamic = () => {
    popUpContainerDynamic.classList.remove('display__none');
};
createNewCardBnt.addEventListener('click', event => {
    const inputImg = cardExtendedCreateNewCard.querySelector('[data="inputChoseImg"]');
    const inputCardColor = cardExtendedCreateNewCard.querySelector('[data="inputChoseCardColor"]');
    const inputName = cardExtendedCreateNewCard.querySelector('[data="inputChoseName"]');
    const inputSeason = cardExtendedCreateNewCard.querySelector('[data="inputChoseSeason"]');
    const inputChapter = cardExtendedCreateNewCard.querySelector('[data="inputChoseChapter"]');
    const inputAssessment = cardExtendedCreateNewCard.querySelector('[data="inputChoseAssessment"]');
    const inputTag = cardExtendedCreateNewCard.querySelector('[data="inputChoseTag"]');
    const inputType = cardExtendedCreateNewCard.querySelector('[data="inputChoseType"]');
    const cardComments = cardExtendedCreateNewCard.querySelector('[data="cardComments"]');
    const cardLink = cardExtendedCreateNewCard.querySelector('[data="inputChoseLink"]');
    const clearInputs = () => {
        inputImg.value = '';
        inputCardColor.value = '#012030';
        inputName.value = '';
        inputSeason.value = '';
        inputChapter.value = '';
        cardComments.value = '';
        activeCardBnt.classList.remove('cardExtended__bntActive_--AC');
    };
    if (inputName.value == '') {
        clearInputs();
        showMessageError('ERRO', 'Nome é obrigatorio');
        return;
    }
    const inputImgValue = inputImg.value;
    const inputCardColorValue = inputCardColor.value;
    const inputNameValue = inputName.value;
    const inputSeasonValue = inputSeason.value == '' ? '0' : inputSeason.value;
    const inputChapterValue = inputChapter.value == '' ? '0' : inputChapter.value;
    const inputAssessmentValue = inputAssessment.value;
    const inputTagValue = inputTag.value;
    const inputTypeValue = inputType.value;
    const cardCommentsValue = cardComments.value;
    const cardLinkValue = cardLink.value == '' ? '...' : cardLink.value;
    const checkIfCardIsActivate = activeCardBnt.classList.contains('cardExtended__bntActive_--AC') ? true : false;
    const newCard = {
        'id': generatesId(),
        'image': inputImgValue,
        'color': inputCardColorValue,
        'name': inputNameValue,
        'searchName': inputNameValue.toLocaleLowerCase().replaceAll(' ', ''),
        'season': inputSeasonValue,
        'chapeter': inputChapterValue,
        'assessment': inputAssessmentValue,
        'tag': inputTagValue,
        'type': inputTypeValue,
        'comments': cardCommentsValue,
        'link': cardLinkValue,
        'active': checkIfCardIsActivate
    };
    makeCardInDom(newCard);
    saveNewCardInMyList(newCard);
    loadMyListInDom(MyList);
    clearInputs();
    showMessageSuccess("Criado", "Sucesso ao adicionar nova obra!");
});
const generatesId = () => {
    let id = 0;
    if (MyList.length > 0) {
        id = MyList[MyList.length - 1].id + 1;
    }
    return id;
};
const makeCardInDom = (card) => {
    return `
        <div class="card" style="background-color: ${card.color};">
            <div>
                <img src="${card.image}" alt="">
                <h3>${card.name}</h3>
            </div> 
            <div class="card__capaClickable" data="interactable" id="${card.id}"></div>
            <div class="card__capa">
                <h3 class="open">Abrir</h3>
            </div>
        </div>
    `;
};
const seachCardInMyList = (id) => {
    return MyList.findIndex(item => item.id == id);
};
const makeCardExtendedInDom = (card) => {
    popUpContainerDynamicContainer.innerHTML = `
        <div class="cardExtended__container" style="background-color: ${card.color};" data="cardExtended__container">
            <div class="cardExtended__img">
                <img src="${card.image}" alt="" data="interactable" id="img">
            </div>
            <div class="cardExtended__info">
                <div class="cardExtended__yourColors cardExtended__centralize" data="cardExtended__yourColors">
                    <div style="background-color: #012030;" title="Cor padão" data="interactable" id="defaultCorlor"></div>
                </div>
                <input type="color" class="cardExtended__changeColor" data="interactable" id="color" value="${card.color}">
                <div data="cardExtended__containerBnt">
                    <button class="cardExtended__bntDelete cardExtended__centralize" data="interactable" id="delete" >DELETAR</button>
                </div>
                <span class="cardExtended__title cardExtended__centralize cardExtended__input"><h3>Nome da obra</h3> <div data="interactable" id="name">${card.name}</div></span>
                <div class="cardExtended__bntActive cardExtended__centralize ${card.active == true ? 'cardExtended__bntActive_--AC' : 0}" >
                    <h3>Obra ativa</h3>
                    <button data="interactable" id="activeBnt"><div></div></button>
                </div>
                <span class="cardExtended__season cardExtended__centralize cardExtended__input"><h3>Temporada/Volume :</h3> <div data="interactable" id="season">${card.season}</div></span>
                <span class="cardExtended__chapter cardExtended__centralize cardExtended__input"><h3>Ultimo capitulo visto :</h3> <div data="interactable" id="chapeter">${card.chapeter}</div></span>
                <span class="cardExtended__assessment cardExtended__centralize cardExtended__input"><h3>Sua nota :</h3> <div data="interactable" id="assessment">${card.assessment}</div></span>
                <span class="cardExtended__tag cardExtended__centralize cardExtended__input"><h3>Gênero :</h3> <div data="interactable" id="tag">${card.tag}</div></span>
                <span class="cardExtended__type cardExtended__centralize cardExtended__input"><h3>Tipo :</h3> <div data="interactable" id="type">${card.type}</div></span>
                <span class="cardExtended__comments">
                    <h3>Comentarios</h3>
                    <div data="interactable" id="comments">${card.comments}</div>
                </span>
                <span class="cardExtended__link cardExtended__centralize cardExtended__input">
                    <h3>Link onde você acompanha a obra :</h3> 
                    <div data="interactable" id="link">${card.link}</div>
                </span>
            </div>
        </div>
    `;
    activeChangeFunctions();
};
const activeChangeFunctions = () => {
    CurrentExtendedCard = popUpContainerDynamicContainer.querySelector('[data="cardExtended__container"]');
    CurrentExtendedCard.addEventListener('click', event => {
        ChangeFunctions(event);
    });
};
const disableChangeFunctions = () => {
    CurrentExtendedCard.removeEventListener('click', event => {
        ChangeFunctions(event);
    });
};
const ChangeFunctions = (event) => {
    const elementClickd = event.target;
    if (elementClickd.getAttribute('data') == 'interactable') {
        const container = elementClickd.parentNode;
        let componente = ``;
        switch (elementClickd.id) {
            case 'img':
                componente = openGenericInput(openInputImg);
                break;
            case 'name':
                componente = openGenericInput(openInputName);
                break;
            case 'season':
                componente = openGenericInput(openInputSeason);
                break;
            case 'chapeter':
                componente = openGenericInput(openInputChapeter);
                break;
            case 'assessment':
                componente = openGenericInput(openInputAssessment);
                break;
            case 'tag':
                componente = openGenericInput(openInputTag);
                break;
            case 'type':
                componente = openGenericInput(openInputType);
                break;
            case 'comments':
                componente = openGenericInput(openInputComments);
                break;
            case 'link':
                componente = openGenericInput(openInputLink);
                break;
            case 'activeBnt':
                activeBntChangeState(container);
                break;
            case 'color':
                activeColorChange(elementClickd);
                break;
            case 'delete':
                openConfirmPopUp();
                break;
            case 'confirm':
                changeConfirm(elementClickd);
                break;
            case 'cancel':
                activateBntCancel();
                break;
            case 'defaultCorlor':
                setColor(elementClickd.style.backgroundColor);
                break;
        }
        if (componente == ``)
            return;
        container.innerHTML = componente;
    }
};
const activateBntConfirm = () => {
    const container = CurrentExtendedCard.querySelector('[data="cardExtended__containerBnt"]');
    container.innerHTML = `
        <div class="cardExtended__confirmBnts cardExtended__centralize">
            <button class="confirm bnt" data="interactable" id="confirm"></button>
            <button class="cancel bnt" data="interactable" id="cancel"></button>
        </div>
    `;
    editMode = true;
};
const activateBntCancel = () => {
    makeCardExtendedInDom(MyList[MyListCurrentItem]);
    editMode = false;
};
const changeConfirm = (elementClickd) => {
    const inputs = CurrentExtendedCard.querySelectorAll('input');
    const selects = CurrentExtendedCard.querySelectorAll('select');
    const textArea = CurrentExtendedCard.querySelector('textArea');
    const cardTochange = MyList[MyListCurrentItem];
    const activeSeriesBnt = CurrentExtendedCard.querySelector('#activeBnt')?.parentNode;
    const inputColor = CurrentExtendedCard.querySelector('#color');
    inputs.forEach(item => {
        if (item == null || item == undefined || item.value == '')
            return;
        switch (item.getAttribute('data')) {
            case 'inputChoseImg':
                cardTochange.image = item.value;
                break;
            case 'inputChoseName':
                cardTochange.name = item.value;
                cardTochange.searchName = item.value.toLocaleLowerCase().replaceAll(' ', '');
                break;
            case 'inputChoseSeason':
                cardTochange.season = item.value;
                break;
            case 'inputChoseChapter':
                cardTochange.chapeter = item.value;
                break;
            case 'inputChoseLink':
                cardTochange.link = item.value;
                break;
        }
    });
    selects.forEach(item => {
        if (item == null || item == undefined || item.value == '')
            return;
        switch (item.getAttribute('data')) {
            case 'inputChoseAssessment':
                cardTochange.assessment = item.value;
                break;
            case 'inputChoseTag':
                cardTochange.tag = item.value;
                break;
            case 'inputChoseType':
                cardTochange.type = item.value;
                break;
        }
    });
    if (textArea != null && textArea != undefined && textArea.value !== '') {
        cardTochange.comments = textArea.value;
    }
    cardTochange.active = activeSeriesBnt.classList.contains('cardExtended__bntActive_--AC') ? true : false;
    cardTochange.color = rgbToHex(CurrentExtendedCard.style.backgroundColor.match(/\d+/g));
    saveInBrowser(MyList);
    makeCardExtendedInDom(MyList[MyListCurrentItem]);
    showMessageSuccess("Modificado", "Sua alteração foi feita com sucesso!");
    editMode = false;
};
const deleteItemFromMyList = () => {
    MyList.splice(MyListCurrentItem, 1);
    saveInBrowser(MyList);
    showMessageSuccess("Deletado", "Item deletado com sucesso!");
};
const openConfirmPopUp = () => {
    popUpContainerDynamicContainer.innerHTML += `
        <div class="popUp__confirmDelete">
            <h3>Tem certeza ?</h3>
            <button class="popUp__confirmDelete__confirm" data="confirm">SIM</button>
            <button class="popUp__confirmDelete__cancel" data="cancel">NÃO</button>
        </div>
    `;
    const bntConfirm = popUpContainerDynamicContainer.querySelector('[data="confirm"]');
    const bntCancel = popUpContainerDynamicContainer.querySelector('[data="cancel"]');
    bntConfirm.addEventListener('click', event => {
        deleteItemFromMyList();
        loadMyListInDom(MyList);
        popUpContainerDynamicClose();
    });
    bntCancel.addEventListener('click', event => {
        makeCardExtendedInDom(MyList[MyListCurrentItem]);
    });
};
const activateEditeMode = () => {
    editMode == false ? activateBntConfirm() : 0;
};
const openGenericInput = (func) => {
    activateEditeMode();
    return func();
};
const openInputImg = () => {
    const string = `
            <div class="cardExtended__choseImg cardExtended__input">
                <label>Insira o link da imagem</label>
                <input type="text" maxlength="300" data="inputChoseImg">
            </div>
        `;
    return string;
};
const openInputName = () => {
    const string = `
        <h3>Nome da obra</h3> <input type="text" maxlength="100" data="inputChoseName" value="${MyList[MyListCurrentItem].name}">
    `;
    return string;
};
const openInputSeason = () => {
    const string = `
        <h3>Temporada/Volume :</h3><input type="number" data="inputChoseSeason" value="${MyList[MyListCurrentItem].season}">
    `;
    return string;
};
const openInputChapeter = () => {
    const string = `
        <h3>Ultimo capitulo visto :</h3> <input type="number" data="inputChoseChapter" value="${MyList[MyListCurrentItem].chapeter}">
    `;
    return string;
};
const openInputAssessment = () => {
    const string = `
        <h3>Sua nota :</h3> 
        <select data="inputChoseAssessment">
            ${optionGenerationAssessment()}
        </select>
    `;
    return string;
};
const openInputTag = () => {
    const string = `
        <h3>Gênero : </h3>
        <select data="inputChoseTag">
            ${optionGenerationTag()}
        </select>
    `;
    return string;
};
const openInputType = () => {
    const string = `
        <span class="cardExtended__type cardExtended__centralize cardExtended__input">
            <h3>Tipo : </h3>
            <select data="inputChoseType">
                ${optionGenerationType()}
            </select>
        </span>
    `;
    return string;
};
const openInputComments = () => {
    const string = `
        <h3>Comentarios</h3>
        <textarea name="" id="" cols="30" rows="10">${MyList[MyListCurrentItem].comments}</textarea>
    `;
    return string;
};
const openInputLink = () => {
    const string = `
        <h3>Coloque aqui o link onde você acompanha a obra :</h3> 
        <input type="text" maxlength="1000" data="inputChoseLink" value="${MyList[MyListCurrentItem].link}">
    `;
    return string;
};
const optionGenerationAssessment = () => {
    const itens = [];
    for (let i = 1; i <= 10; i++) {
        itens.push(`<option value="${i}">${i}</option>`);
    }
    return itens;
};
const optionGenerationTag = () => {
    return genresCard.map(item => {
        return `<option value="${item}">${item}</option>`;
    });
};
const optionGenerationType = () => {
    return typesCard.map(item => {
        console.log(item);
        return `<option value="${item}">${item}</option>`;
    });
};
const activeBntChangeState = (button) => {
    activateEditeMode();
    button.classList.toggle('cardExtended__bntActive_--AC');
};
const activeColorChange = (elementClickd) => {
    elementClickd.addEventListener('input', () => {
        setColor(elementClickd.value);
    });
};
const setColor = (colorValue) => {
    activateEditeMode();
    const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    console.log(hexRegex.test(colorValue));
    if (!hexRegex.test(colorValue)) {
        CurrentExtendedCard.style.backgroundColor = rgbToHex(colorValue.match(/\d+/g));
        return;
    }
    CurrentExtendedCard.style.backgroundColor = colorValue;
};
const rgbToHex = (rgb) => '#' + [rgb[0], rgb[1], rgb[2]].map(x => {
    const hex = parseInt(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}, '').join('');
const saveInBrowser = (MyList) => {
    localStorage.setItem('MinhaListaDeObras', JSON.stringify(MyList));
};
const saveNewCardInMyList = (newCard) => {
    MyList.push(newCard);
    saveInBrowser(MyList);
};
loadMyList();
loadMyListInDom(MyList);
