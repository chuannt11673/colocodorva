import { Directive, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Directive({
    selector: '[filledImages]',
})
export class FilledImagesDirective implements OnInit {

    constructor(public el: ElementRef) { }
    
    @Output() onComplete: EventEmitter<boolean> = new EventEmitter();
    @Output() viewMore: EventEmitter<boolean> = new EventEmitter();
    images: HTMLImageElement[];
    count: number;
    originalLength: number; 
    get length(): number {
        return this.images ? this.images.length : 0;
    }

    ngOnInit(): void {
        this.images = [...this.el.nativeElement.querySelectorAll('img')];
        this.originalLength = this.images.length;
        this.count = 0;
        
        if (this.length === 1) {
            const img = this.images[0];
            img.onload = () => {
                this.el.nativeElement.style.height = img.height + 'px';
                this.onComplete.emit(true);
            };
            return;
        }

        if (this.length > 4) {
            this.images = this.images.slice(0, 4);
        }

        this.images.map((image: HTMLImageElement, index: number) => {
            this.format(image, index);
        });
    }

    format(image: HTMLImageElement, index: number) {
        image.onload = () => {
            this.count += 1;
            if (this.count === this.length) {
                this.arrange();
                this.addViewMore();
            }
        }
    }

    arrange() {
        const firstImg = this.images[0];
        const remainingImgs = this.images.slice(1, this.length);
        firstImg.style.float = 'left';
        if (firstImg.naturalWidth >= firstImg.naturalHeight) {
            firstImg.style.width = '100%';
            firstImg.style.height = '60%';
            remainingImgs.map(img => {
                img.style.width = 100 / remainingImgs.length + '%';
                img.style.height = '40%';
            });
        }
        else {
            firstImg.style.width = '60%';
            firstImg.style.height = '100%';
            remainingImgs.map(img => {
                img.style.width = '40%';
                img.style.height = 100 / remainingImgs.length + '%';
            });
        }
        this.onComplete.emit(true);
    }

    addViewMore() {
        const remainingLength = this.originalLength - this.length;
        if (remainingLength === 0)
            return;

        const lastImage = this.images[this.length - 1];
        lastImage.style.opacity = '0.6';

        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.bottom = '0px';
        div.style.right = '0px';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.color = '#fff';
        div.style.fontSize = '1.6em';
        div.style.fontWeight = '500';
        div.style.width = lastImage.offsetWidth + 'px';
        div.style.height = lastImage.offsetHeight + 'px';
        div.innerHTML = '+' + remainingLength;

        div.addEventListener('click', () => {
            this.viewMore.emit(true);
        });
        this.el.nativeElement.appendChild(div);
    }
}
