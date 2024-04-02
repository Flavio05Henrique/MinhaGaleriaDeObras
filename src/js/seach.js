"use strict";
const formSearchName = document.querySelector('[data="formSearchName"]');
const inputSearchName = document.querySelector('[data="inputSearchName"]');
const resetSearchBnt = document.querySelector('[data="seach__reset"]');
const HTMLBody = document.querySelector('[data="cards__container"]');
const searchFilterBnt = document.querySelector('[data="seachFilter"]');
formSearchName.addEventListener('submit', event => {
    event.preventDefault();
    searchNameInMyList(inputSearchName.value);
});
const searchNameInMyList = (name) => {
    const treatedName = name.toLocaleLowerCase().replaceAll(' ', '');
    const itemsFound = MyList.filter(item => item.searchName.includes(treatedName));
    loadMyListInDom(itemsFound);
};
resetSearchBnt.addEventListener('click', event => {
    inputSearchName.value = "";
    loadMyListInDom(MyList);
});
searchFilterBnt.addEventListener('click', event => {
    openSearchPopUp(event.clientX, event.clientY);
});
const openSearchPopUp = (x, y) => {
    HTMLBody.innerHTML += `
        <div class="searchPopUp__closeArea" data="searchPopUp__closeArea">
            <div class="searchPopUp__container" style="top: ${y + 15}px; left: ${x}px" data="searchPopUp__container">
                <div>
                    <h3 class="searchPopUp__title">Obra ativa :</h3>
                    <input type="checkbox" value="1">
                </div>
                <div>
                    <h3 class="searchPopUp__title">Nota :</h3>
                    <select>
                        <option value=""></option>
                        ${optionGenerationAssessment()}
                    </select>
                </div>
                <div>
                    <h3 class="searchPopUp__title">Gênero :</h3>
                    <select>
                        <option value=""></option>
                        ${optionGenerationTag()}
                    </select>
                </div>
                <div>
                    <h3 class="searchPopUp__title">Tipo :</h3>
                    <select>
                        <option value=""></option>
                        ${optionGenerationType()}
                    </select>
                </div>
                <button class="searchPopUp__bnt" data="searchPopUp__bnt">Filtrar</button>
            </div>
        </div>
    `;
    activateSearchBnt();
    activateCloseSearchPopUp();
};
const activateCloseSearchPopUp = () => {
    const container = document.querySelector('[data="searchPopUp__closeArea"]');
    container.addEventListener('click', event => {
        const elementClicked = event.target;
        if (elementClicked.classList.contains('searchPopUp__closeArea')) {
            '';
            container.parentNode?.removeChild(container);
        }
    });
};
const activateSearchBnt = () => {
    const bnt = document.querySelector('[data="searchPopUp__bnt"]');
    bnt.addEventListener('click', () => {
        const container = bnt.parentNode;
        const filter = container.querySelector('input');
        const filters = container.querySelectorAll('select');
        const filter1 = filters[0].value;
        const filter2 = filters[1].value;
        const filter3 = filters[2].value;
        if (!filter.checked && filter1 == '' && filter2 == '' && filter3 == '')
            return;
        const filteredList = MyList.filter(item => {
            if (filter.checked) {
                if (item.active === true)
                    return item;
            }
            if (item.assessment === filter1)
                return item;
            if (item.tag === filter2)
                return item;
            if (item.type === filter3)
                return item;
        });
        if (filteredList.length == 0) {
            showMessageError('Lista vazia', 'Nenhuma de suas obras atende a esses filtros.');
            return;
        }
        loadMyListInDom(filteredList);
    });
};
