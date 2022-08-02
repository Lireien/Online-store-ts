import { DataGoods } from '../dataItems';
import { DrawStore } from './types';

export default class RenderCards implements DrawStore {
    public draw(data: DataGoods, cart: { [key: string]: number }): void {
        const fragment = document.createDocumentFragment();
        const goodsTemplateElement = document.querySelector('.store-card__template') as HTMLTemplateElement | null;

        if (data.length === 0) {
            const noGoodsElement = document.createElement('p');
            noGoodsElement.classList.add('no-goods__message');
            noGoodsElement.textContent = 'Извините, такого товара нет. Попробуйте изменить параметры поиска';

            fragment.append(noGoodsElement);
        } else {
            if (goodsTemplateElement === null) {
                throw new Error('Could not find element.');
            }
            data.forEach((item) => {
                const goodsElement = goodsTemplateElement.content.cloneNode(true) as DocumentFragment;

                const img = goodsElement.querySelector('.store-card__image') as HTMLImageElement;
                img.src = `images/goods/${item.img}.jpg`;
                (goodsElement.querySelector('.store-card__item-name') as HTMLElement).textContent = item.name;
                (goodsElement.querySelector('.store-card__price-text') as HTMLElement).textContent = item.price;
                (
                    goodsElement.querySelector('.store-card__year-date') as HTMLElement
                ).textContent = `${item.appear} года`;
                (goodsElement.querySelector('.store-card__available') as HTMLElement).textContent = item.available
                    ? 'В наличии'
                    : 'Предзаказ';
                item.available
                    ? (goodsElement.querySelector('.store-card__available') as HTMLElement).classList.add(
                          'available-to-buy'
                      )
                    : (goodsElement.querySelector('.store-card__available') as HTMLElement).classList.add(
                          'not-available'
                      );

                (goodsElement.querySelector('.store-card__cart') as HTMLButtonElement).textContent = cart[item.name]
                    ? 'Добавлено'
                    : 'В корзину';
                cart[item.name]
                    ? (goodsElement.querySelector('.store-card__cart') as HTMLButtonElement).classList.add('in-cart')
                    : (goodsElement.querySelector('.store-card__cart') as HTMLButtonElement).classList.remove(
                          'in-cart'
                      );

                fragment.append(goodsElement);
            });
        }

        (document.querySelector('.store-goods__container') as HTMLElement).innerHTML = '';
        (document.querySelector('.store-goods__container') as HTMLElement).appendChild(fragment);
    }
}
