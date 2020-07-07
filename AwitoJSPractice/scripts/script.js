'use strict';

 const modalAdd = document.querySelector('.modal__add'),
        addAd =  document.querySelector('.add__ad'),
        ModalBtnSubmit = document.querySelector('.modal__btn-submit'),
        modalSubmit = document.querySelector('.modal__submit'),
        catalog = document.querySelector('.catalog'),
        modalItem = document.querySelector('.modal__item');

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    ModalBtnSubmit.disabled = true;
});

modalAdd.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.modal__close') || target === modalAdd){
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }
});

catalog.addEventListener('click', (event) => {

    if (event.target.closest('.card')){
        modalItem.classList.remove('hide');
    }
});

modalItem.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.modal__close') || target === modalItem){
        modalItem.classList.add('hide');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape'){
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
    }
});