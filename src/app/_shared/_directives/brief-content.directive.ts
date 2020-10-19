import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appBriefContent]',
})
export class BriefContentDirective implements OnInit, AfterViewInit {

    constructor(public el: ElementRef) {
    }
    @Input() maxLength = 50;
    @Input() showBtn = true;
    element: HTMLElement;
    hyperlink: HTMLElement;
    content: string;
    briefContent: string;

    ngOnInit(): void {
        const link = document.createElement('a');
        link.style.color = '#f31a9f';
        link.innerHTML = 'Xem thêm';
        link.addEventListener('click', (event) => {
            this.showAll();
        });
        this.hyperlink = link;
    }

    ngAfterViewInit(): void {
        this.brief();
    }

    brief() {
        this.element = this.el.nativeElement as HTMLElement;
        this.content = this.element.innerHTML;

        if (this.content.length > this.maxLength) {
            this.briefContent = this.content.slice(0, this.maxLength) + '...';
            this.element.innerHTML = this.briefContent;
            if (this.showBtn) {
                this.element.append(this.hyperlink);
            }
        }
    }

    showAll() {
        this.element.innerHTML = this.content;
    }
}
