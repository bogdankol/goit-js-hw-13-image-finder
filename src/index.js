import './sass/main.scss';
import fetchFn from './js/apiService';
import template from './templates/listElements.hbs'

const refs = {
  input: document.querySelector('.js-inputSearch'),
  searchBtn: document.querySelector('.js-searchBtn'),
  form: document.querySelector('#search-form'),
  div: document.querySelector('.js-forGallery'),
};
const { input, searchBtn, form, div } = refs;

form.addEventListener('submit', onSearchHandler);
let page = 1;

const ul = document.createElement('ul');
ul.classList.add('gallery');
div.append(ul);
    
async function onSearchHandler(event) {
    event.preventDefault();

    ul.innerHTML = '';

    const inputValue = input.value;
    const result = await fetchFn(inputValue, page);

    if (result.length === 0) {

        divForButtonsRemover();
        alert('No results were found! Please try again')
        return;

    } else if (result.length > 0) {

        const markUp = template(result);
        ul.insertAdjacentHTML('beforeend', markUp);
        
        buttonCreate();
    }

}

function buttonCreate() {

    divForButtonsRemover();
    divForButtonsCreator();

    loadMoreBtnCreator();
    resetBtnCreator();
}

function loadMoreBtnCreator() {
    const loadMore = document.createElement('button');
    loadMore.setAttribute('type', 'button');
    loadMore.classList.add('loadMoreBtn');
    loadMore.textContent = 'Load more';

    if (document.querySelector('.divForButtons')) {
      document.querySelector('.divForButtons').insertAdjacentElement('beforeend', loadMore);
    }
    loadMore.addEventListener('click', onClickHandler);
}

function resetBtnCreator() {
    const resetBtn = document.createElement('button');
    resetBtn.classList.add('reset');
    resetBtn.classList.add('js-reset');
    resetBtn.textContent = 'Reset search';

    if (document.querySelector('.divForButtons')) {
      document.querySelector('.divForButtons').insertAdjacentElement('beforeend', resetBtn);
    }
    resetBtn.addEventListener('click', onResetHandler);
}

async function onClickHandler() {
    page += 1;
    const inputValue = input.value;
    const resultNew = await fetchFn(inputValue, page);
    const newMarkUp = template(resultNew)
    ul.insertAdjacentHTML('beforeend', newMarkUp);

    setTimeout(() => {
      ul.children[ul.children.length - 12].scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }, 500);
}

function onResetHandler() {
    form.reset();
    ul.innerHTML = '';

    divForButtonsRemover();
}

function divForButtonsCreator() {
  const divForButtons = document.createElement('div');
  divForButtons.classList.add('divForButtons');
  divForButtons.classList.add('js-divForButtons');
  document.body.insertAdjacentElement('beforeend', divForButtons);
}

function divForButtonsRemover() {
  if (document.querySelector('.divForButtons')) {
    document.querySelector('.divForButtons').remove();
  }
}



























// let previousSearch;
// let numberOfPage = 1;
// const ul = document.createElement('ul');
// ul.classList.add('gallery');
    

// async function onSearchHandler(e) {
//     e.preventDefault();

//     const inputValue = input.value;

//     const result = await fetchFn(inputValue, numberOfPage);

//     if (result.length === 0) {
//         alert('there are no results of your input! try again!')
//         return;
        
//     } else if (document.querySelector('.gallery') && previousSearch === inputValue) {

//       alert('you just searched that! try some other things!');
//       console.log('2222222', previousSearch === inputValue);
//         return;
        
//     } else if (previousSearch !== inputValue && document.querySelector('.gallery')) {

//         nullifyGallery();
//         const markUp = template(result.map(el => el));
//         ul.insertAdjacentHTML('beforeend', markUp);
//         console.log('3333333', previousSearch, inputValue, previousSearch === inputValue);
//         div.append(ul);
//         previousSearch = inputValue;
//         createButton();
//         return
        
//     } else {

//         const markUp = template(result.map(el => el));
//         ul.insertAdjacentHTML('beforeend', markUp);
//         console.log('444444444', previousSearch, inputValue, previousSearch === inputValue);
//         previousSearch = inputValue;
//         div.append(ul)
//         createButton();

//     }
    
// }


// function nullifyGallery() {
//     div.innerHTML = '';
// }

// function createButton() {
//   const moreBtn = document.createElement('button');
//   moreBtn.classList.add('loadMoreBtn');
//   moreBtn.classList.add('js-loadMoreBtn');
//   moreBtn.textContent = 'Load more';
//     div.append(moreBtn);
//     moreBtn.addEventListener('click', onMoreBtnHandler);
// }

// async function onMoreBtnHandler() {
//     const inputValue = input.value;
//     numberOfPage += 1;
//     const result = await fetchFn(inputValue, numberOfPage);
//     const markUp = template(result.map(el => el));
//     ul.insertAdjacentHTML('beforeend', markUp);
//     console.log('55555555', previousSearch, inputValue, previousSearch === inputValue);
//     div.append(ul);
// }








































































































