import * as noUiSlider from 'nouislider';
import { DataGoods } from '../../dataItems';

export interface DrawStore {
    draw(data: Record<string, unknown>[], cart: Record<string, unknown>): void;
}

export interface ISlider {
    query: string;
    range: number[];
    step: number;
    target: noUiSlider.target;
    start: () => void;
}

export interface ISort {
    sort(data: DataGoods): DataGoods | undefined;
    resetToDefault(): void;
}

export interface IFilter {
    filter(data: DataGoods): DataGoods;
    resetSettings(): void;
}
