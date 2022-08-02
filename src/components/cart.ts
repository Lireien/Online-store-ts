export default class Cart {
    public cartInStorage: { [key: string]: number };
    public cartCounter: number;
    private maskedLayout: HTMLElement;
    private closePopup: HTMLElement;
    constructor() {
        this.cartInStorage = {};
        this.cartCounter = 0;
        this.maskedLayout = document.querySelector('.mask__layout') as HTMLElement;
        this.closePopup = document.querySelector('.cart__popup-close') as HTMLElement;
        this.init();
    }

    private init(): void {
        const cart = localStorage.getItem('cart');
        if (cart) {
            this.cartInStorage = JSON.parse(cart) as { [key: string]: number };
            this.cartCounter = Object.keys(this.cartInStorage).length;
        }

        this.maskedLayout.addEventListener('click', (e) => {
            if (e.target === this.maskedLayout) this.maskedLayout.classList.remove('visible');
        });

        this.closePopup.addEventListener('click', () => {
            this.maskedLayout.classList.remove('visible');
        });
    }

    private set(name: string): void {
        if (this.cartInStorage[name]) {
            this.cartInStorage[name] += 1;
        } else {
            this.cartInStorage[name] = 1;
        }
        this.cartCounter += 1;
        localStorage.setItem('cart', JSON.stringify(this.cartInStorage));
    }

    private remove(name: string): void {
        if (this.cartInStorage[name]) {
            this.cartInStorage[name] -= 1;
            this.cartCounter -= 1;
        }
        if (this.cartInStorage[name] <= 0) delete this.cartInStorage[name];
        localStorage.setItem('cart', JSON.stringify(this.cartInStorage));
    }

    public toggle(name: string): void {
        if (this.cartInStorage[name]) {
            delete this.cartInStorage[name];
            this.cartCounter -= 1;
        } else if (this.cartCounter >= 20) {
            this.showShadowedLayout();
            return;
        } else {
            this.cartInStorage[name] = 1;
            this.cartCounter += 1;
        }
        localStorage.setItem('cart', JSON.stringify(this.cartInStorage));
    }

    public clear(): void {
        this.cartInStorage = {};
        this.cartCounter = 0;
        localStorage.removeItem('cart');
    }

    private showShadowedLayout(): void {
        this.maskedLayout.classList.add('visible');
    }
}
