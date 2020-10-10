import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[app-masonry]',
})
export class MasonryDirective implements OnInit {

    constructor(public el: ElementRef) {}
    @Input() options: any;
    elements: HTMLElement[];
    height: any[];
    get length() {
        return this.elements ? this.elements.length : 0;
    }
    get rows() {
        return this.options ? this.options.rows || 2 : 2;
    }

    ngOnInit(): void {
        this.elements = [...this.el.nativeElement.querySelectorAll(this.options.itemSelection)];
        let count = 0;
        this.elements.map(ele => {
            this.load(ele, () => {
                count += 1;
                if (count === this.length)
                    this.format();
            });
        });
    }

    load(ele: HTMLElement, callback: any) {
        const img = ele.querySelector('img');
        img.onload = () => {
            callback();
        };
    }

    format() {
        this.initialHeight();
        this.elements.map((ele: HTMLElement, index: number) => {
            const minHeight = this.getMinimunHeight();
            ele.style.position = 'absolute';
            ele.style.top = minHeight.height + 'px';
            if (minHeight.index === 0) {
                ele.style.left = '0px';
            }
            else {
                ele.style.right = '0px';
            }
            this.height[minHeight.index] += ele.offsetHeight + 5;
        });

        this.el.nativeElement.style.height = Math.max(...this.height) + 'px';
    }

    initialHeight() {
        const rows = this.rows;
        this.height = [];
        for (let index = 0; index < rows; index++) {
            this.height[index] = 0;
        }
    }

    getMinimunHeight(): any {
        const minValue = Math.min(...this.height);
        return {
            index: this.height.findIndex(x => x === minValue),
            height: this.height.find(x => x === minValue)
        };
    }
}