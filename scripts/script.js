'use strict';

 const modalAdd = document.querySelector('.modal__add'),
        addAd =  document.querySelector('.add__ad'),
        modalBtnSubmit = document.querySelector('.modal__btn-submit'),
        modalSubmit = document.querySelector('.modal__submit'),
        catalog = document.querySelector('.catalog'),
        modalItem = document.querySelector('.modal__item');

 //Открытие модального окна подачи объявления(и отключение кнопки отправки)
addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});

//Закрытие модального окна подачи объявления при нажатии за границей модального окна или на крестик
modalAdd.addEventListener('click', event => {

    if (event.target.closest('.modal__close') || event.target === modalAdd){
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }
});

//Открытие модального окна товара
catalog.addEventListener('click', (event) => {

    if (event.target.closest('.card')){
        modalItem.classList.remove('hide');
    }
});

//Закрытие модального окна товара при нажатии за границей модального окна или на крестик
modalItem.addEventListener('click', event => {

    if (event.target.closest('.modal__close') || event.target === modalItem){
        modalItem.classList.add('hide');
    }
});

//Закрытие модальных окон нажатием на Esc
document.body.addEventListener('keydown', (event) => {

    if (event.code === 'Escape'){
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
    }
});