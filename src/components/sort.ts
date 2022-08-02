import { DataGoods } from '../dataItems';
import { ISort } from './types';

export default class SortGoods implements ISort {
    selectSortElement: HTMLSelectElement;

    constructor(query: string) {
        this.selectSortElement = document.querySelector(query) as HTMLSelectElement;
        this.init();
    }

    private init() {
        const sorted = localStorage.getItem('sorted');
        if (sorted) {
            this.selectSortElement.value = sorted;
        }
    }

    public sort(data: DataGoods): DataGoods | undefined {
        switch (this.selectSortElement.value) {
            case 'name-ascending':
                return this.nameAscedingSort(data as DataGoods);
            case 'name-descending':
                return this.nameDescedingSort(data as DataGoods);
            case 'price-ascending':
                return this.priceAscending(data as DataGoods);
            case 'price-descending':
                return this.priceDescending(data as DataGoods);
        }
    }

    private nameAscedingSort<T extends { name: string }[]>(data: T): T {
        return data.sort((a, b) => a.name.localeCompare(b.name));
    }

    private nameDescedingSort<T extends { name: string }[]>(data: T): T {
        return data.sort((a, b) => b.name.localeCompare(a.name));
    }

    private priceAscending<T extends { price: string }[]>(data: T): T {
        return data.sort((a, b) => Number(a.price) - Number(b.price));
    }

    private priceDescending<T extends { price: string }[]>(data: T): T {
        return data.sort((a, b) => Number(b.price) - Number(a.price));
    }

    public resetToDefault(): void {
        this.selectSortElement.value = 'name-ascending';
        localStorage.removeItem('sorted');
    }
}
