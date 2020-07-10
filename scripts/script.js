'use strict';

 //Массив для хранения карточек
 const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

 //Переменные с классами элементов из html
 const modalAdd = document.querySelector('.modal__add'),
        addAd =  document.querySelector('.add__ad'),
        modalBtnSubmit = document.querySelector('.modal__btn-submit'),
        modalSubmit = document.querySelector('.modal__submit'),
        catalog = document.querySelector('.catalog'),
        modalItem = document.querySelector('.modal__item'),
        modalBtnWarning = document.querySelector('.modal__btn-warning'),
        modalFileInput = document.querySelector('.modal__file-input'),
        modalFileBtn = document.querySelector('.modal__file-btn'),
        modalImageAdd = document.querySelector('.modal__image-add');

 //Доступ к изменению текста кнопки и пути до картинки
 const textFileBtn = modalFileBtn.textContent,
        srcModalImage = modalImageAdd.src;

//Получение всех элементов формы кроме кнопки
 const elementsModalSubmit = [...modalSubmit.elements]
     .filter(elem => elem.tagName !== 'BUTTON' || elem.type !== 'submit');

//Проверка значений формы
const checkForm = () => {
    const validForm =  elementsModalSubmit.every(elem => elem.value);

    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
};

//Открытие модального окна подачи объявления(и отключение кнопки "Отправить")
addAd.addEventListener('click', () => {

    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);
    document.addEventListener('keydown', closeModal);
});

//Открытие модального окна товара
catalog.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.card')){
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    }
});

//Код для закрытия модальных окон
const closeModal = e => {
    const target = e.target;

    if (target.closest('.modal__close') || target.classList.contains('modal') || e.code === 'Escape') {

        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
        document.removeEventListener('keydown', closeModal);
        modalSubmit.reset();
        checkForm();
        modalImageAdd.src = srcModalImage;
        modalFileBtn.textContent = textFileBtn;
    }
};

//Закрытие модальных окон при нажатии за границей модального окна или на крестик
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

//Закрытие формы при нажатии "Отправить"
modalSubmit.addEventListener('input', checkForm);

//Отправка значений формы в массив dataBase
modalSubmit.addEventListener('submit', e => {
    const itemObj = {};

    e.preventDefault();

    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    itemObj.image = infoPhoto.base64;
    dataBase.push(itemObj);
    closeModal({target: modalAdd});
    saveDB();
    renderCard();
});

//Сохранение карточек в БД
const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));

const infoPhoto = {};

//Добавление загруженной картинки в объявление
modalFileInput.addEventListener('change', e => {
    const target = e.target;
    const reader = new FileReader();
    const file = target.files[0];

    infoPhoto.filename = file.name;
    infoPhoto.size = file.size;
    reader.readAsBinaryString(file);

    reader.addEventListener('load',  e => {
        if (infoPhoto.size < 200000) {
            modalFileBtn.textContent = infoPhoto.filename;
            infoPhoto.base64 = btoa(e.target.result);
            modalImageAdd.src = `data:image/png;base64,${infoPhoto.base64}`;
        } else {
            modalFileBtn.textContent = 'Размер файла не должен превышать 2мб'
            modalFileInput.value = '';
            checkForm();
        }
    })
});

//Добавление новой карточки в каталог
const renderCard = () => {
    catalog.textContent = '';
    dataBase.forEach((item, i) => {
        
        catalog.insertAdjacentHTML('beforeend', `
            <li class="card" data-id="${i}">
                <img class="card__image" src="data:image/png;base64,${item.image}" alt="test">
                <div class="card__description">
                    <h3 class="card__header">${item.nameItem}</h3>
                    <div class="card__price">${item.costItem}</div>
                </div>
            </li>
        `);
    });
};


