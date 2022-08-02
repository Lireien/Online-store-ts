import './styles/global.css';
import { DataGoods } from './dataItems';
import data from './dataItems';
import RenderCards from './components/itemCard';
import FilterGoods from './components/goodsFilter';
import GoodsSlider from './components/slider';
import SortGoods from './components/sort';
import Cart from './components/cart';

//Declaring
const cards = new RenderCards();
const filters = new FilterGoods();
const cart = new Cart();
const sorting = new SortGoods('.store-sort__select');
const priceSlider = new GoodsSlider('store-price', [103.55, 145699.23], 1);
const yearSlider = new GoodsSlider('store-year', [1897, 2020], 1);
let filteredGoods: DataGoods;
const cartQuantity: HTMLElement = document.querySelector('.cart__goods') as HTMLElement;
//Slider realization
priceSlider.target.noUiSlider?.on('update', () => {
    draw();
});
priceSlider.target.noUiSlider?.on('set', () => {
    const prices = priceSlider.target.noUiSlider?.get() as [number, number];
    localStorage.setItem('price', JSON.stringify(prices));
});
yearSlider.target.noUiSlider?.on('update', () => {
    draw();
});
yearSlider.target.noUiSlider?.on('set', () => {
    const years = yearSlider.target.noUiSlider?.get() as [number, number];
    localStorage.setItem('years', JSON.stringify(years));
});

//Checkboxes
const controls = document.querySelector('.store-controls') as HTMLElement;
controls.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('store-checkbox')) {
        const checkedEls: boolean[] = [];
        filters.checkboxes.forEach((el, id) => {
            checkedEls[id] = el.checked;
        });
        localStorage.setItem('checkboxes', JSON.stringify(checkedEls));
        draw();
    }
});

// Searching field
const searchField = document.querySelector('.search') as HTMLInputElement;
const searchReset = document.querySelector('.search-reset');
searchField.addEventListener('input', () => {
    searchField.value ? searchField.classList.add('to-reset') : searchField.classList.remove('to-reset');
    draw();
});
searchReset?.addEventListener('click', () => {
    searchField.value = '';
    searchField.classList.remove('to-reset');
    searchField.focus();
    draw();
});

sorting.selectSortElement.addEventListener('change', () => {
    localStorage.setItem('sorted', sorting.selectSortElement.value);
    draw();
});

//Cart
const storeField = document.querySelector('.store-goods__container') as HTMLElement;
storeField.addEventListener('click', (e) => {
    const target = (<HTMLElement>e.target).closest('.store-card');
    if (target) {
        cart.toggle((<HTMLElement>target.children[1]).innerText);
        draw();
    }
});

//Reset filters
const resetBtnElement = document.querySelector('.store-button__reset') as HTMLButtonElement;
resetBtnElement.addEventListener('click', () => {
    filters.resetSettings();
    sorting.resetToDefault();
    cart.clear();
    draw();
});

function draw(): void {
    filteredGoods = filters.filter(data);
    const dataSorted = sorting.sort(filteredGoods);
    cards.draw(dataSorted as DataGoods, cart.cartInStorage);
    cart.cartCounter ? cartQuantity.classList.add('not-empty') : cartQuantity.classList.remove('not-empty');
    cartQuantity.innerText = String(cart.cartCounter);
}
draw();
