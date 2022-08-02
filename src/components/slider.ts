import * as noUiSlider from 'nouislider';
import { ISlider } from './types/index';
import { target, API } from 'nouislider';

export default class GoodsSlider implements ISlider {
    query: string;
    range: number[];
    step: number;
    target!: noUiSlider.target;

    constructor(query: string, range: number[], step: number) {
        this.query = query;
        this.range = range;
        this.step = step;
        this.start();
    }

    public start(): void {
        this.target = <target>document.querySelector(`.${this.query}__slider`);
        const sliderLabelElements = [
            document.querySelector(`.${this.query}__labels-low`),
            document.querySelector(`.${this.query}__labels-high`),
        ] as HTMLInputElement[];

        noUiSlider.create(this.target, {
            start: [this.range[0], this.range[1]],
            connect: true,
            range: {
                min: this.range[0],
                max: this.range[1],
            },
            step: this.step,
            format: {
                from: (formattedValue) => Number(formattedValue),
                to: (numericValue) => Math.round(numericValue),
            },
        });
        (<API>this.target.noUiSlider).on(
            'update',
            (values, handle) => (sliderLabelElements[handle].value = String(values[handle]))
        );
        sliderLabelElements[0].addEventListener('change', () =>
            (<API>this.target.noUiSlider).set([sliderLabelElements[0].value, 0])
        );
        sliderLabelElements[1].addEventListener('change', () =>
            (<API>this.target.noUiSlider).set([0, sliderLabelElements[1].value])
        );
    }
}
