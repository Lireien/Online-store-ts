import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { IFilter } from './types';
import { DataGoods } from '../dataItems';

export default class FilterGoods implements IFilter {
    private search: HTMLInputElement;
    private typesList: NodeListOf<HTMLInputElement>;
    private priceSlider: noUiSlider.target;
    private yearSlider: noUiSlider.target;
    private colorList: NodeListOf<HTMLInputElement>;
    private isAvailable: HTMLInputElement;
    public checkboxes: NodeListOf<HTMLInputElement>;

    constructor() {
        this.search = document.querySelector('.search') as HTMLInputElement;
        this.typesList = document.querySelectorAll('.store-checkbox[name="controls"]');
        this.priceSlider = document.querySelector('.store-price__slider') as noUiSlider.target;
        this.yearSlider = document.querySelector('.store-year__slider') as noUiSlider.target;
        this.colorList = document.querySelectorAll('.store-checkbox[name="color"]');
        this.isAvailable = document.querySelector('.store-checkbox[name="available"]') as HTMLInputElement;
        this.checkboxes = document.querySelectorAll('.store-checkbox');
        this.init();
    }

    private init(): void {
        const checkboxValue = localStorage.getItem('checkboxes') as string;
        const checkboxesChecked = JSON.parse(checkboxValue) as boolean[];
        if (checkboxesChecked) {
            this.checkboxes.forEach((elem, id) => {
                elem.checked = checkboxesChecked[id];
            });
        }
        const priceValue = localStorage.getItem('price') as string;
        const price = JSON.parse(priceValue) as [number, number];

        const yearsValue = (localStorage as Storage).getItem('years') as string;
        const years = JSON.parse(yearsValue) as [number, number];
        (this.priceSlider as noUiSlider.target).noUiSlider?.set(price);
        (this.yearSlider as noUiSlider.target).noUiSlider?.set(years);
    }

    private nameFilter(data: DataGoods): DataGoods {
        if (!this.search.value) return data;
        return data.filter((el) => el.name.toLowerCase().indexOf(this.search.value.toLowerCase()) !== -1);
    }

    private typeFilter(data: DataGoods): DataGoods {
        const types: string[] = [];
        this.typesList.forEach((elem) => {
            if (elem.checked) types.push(elem.value.toLowerCase());
        });
        if (!types.length) return data;
        return data.filter((el) => types.indexOf(el.type.toLowerCase()) !== -1);
    }

    private priceFilter(data: DataGoods): DataGoods {
        const prices = (this.priceSlider.noUiSlider as noUiSlider.API).get() as [number, number];
        return data.filter((el) => Number(el.price) >= prices[0] && Number(el.price) <= prices[1]);
    }

    private yearFilter(data: DataGoods): DataGoods {
        const appears = (this.yearSlider.noUiSlider as noUiSlider.API).get() as [number, number];
        return data.filter((el) => Number(el.appear) >= appears[0] && Number(el.appear) <= appears[1]);
    }

    private colorFilter(data: DataGoods): DataGoods {
        const colors: string[] = [];
        this.colorList.forEach((elem) => {
            if (elem.checked) colors.push(elem.value.toLowerCase());
        });
        if (!colors.length) return data;
        return data.filter((el) => colors.indexOf(el.color.toLowerCase()) !== -1);
    }

    private isAvailableCheck(data: DataGoods): DataGoods {
        if (!this.isAvailable.checked) return data;
        return data.filter((el) => el.available);
    }

    public resetSettings(): void {
        this.typesList.forEach((elem) => (elem.checked = false));
        (this.priceSlider.noUiSlider as noUiSlider.API).set([0, 999999]);
        (this.yearSlider.noUiSlider as noUiSlider.API).set([0, 999999]);
        this.colorList.forEach((elem) => (elem.checked = false));
        this.isAvailable.checked = false;

        localStorage.removeItem('checkboxes');
        localStorage.removeItem('price');
        localStorage.removeItem('years');
    }

    public filter(data: DataGoods): DataGoods {
        let filteredGoods = data;
        filteredGoods = this.nameFilter(filteredGoods);
        filteredGoods = this.typeFilter(filteredGoods);
        filteredGoods = this.priceFilter(filteredGoods);
        filteredGoods = this.yearFilter(filteredGoods);
        filteredGoods = this.colorFilter(filteredGoods);
        filteredGoods = this.isAvailableCheck(filteredGoods);
        return filteredGoods;
    }
}
