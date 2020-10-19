import { Directive, ElementRef, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appFilledImages]',
})
export class FilledImagesDirective implements OnInit, AfterViewInit {

    constructor(public el: ElementRef) { }

    @Output() completed: EventEmitter<boolean> = new EventEmitter();
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
                this.el.nativeElement.style.height = 'auto';
                this.completed.emit(true);
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

    ngAfterViewInit(): void {
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
        this.completed.emit(true);
    }

    addViewMore() {
        const remainingLength = this.originalLength - this.length;
        if (remainingLength === 0) {
            return;
        }

        const index = this.length - 1 <= 4 ? this.length - 1 : 4;
        const lastImage = this.images[index];
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
        div.style.width = lastImage.style.width;
        div.style.height = lastImage.style.height;
        div.innerHTML = '+' + remainingLength;
        div.addEventListener('click', () => {
            this.viewMore.emit(true);
        });
        this.el.nativeElement.appendChild(div);
    }
}
