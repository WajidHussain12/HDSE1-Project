import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  constructor(private el: ElementRef) { }

  typedText: string = '';
  textToType: string = "Explore the wonders of ice cream right here, where every flavor is an adventure.";
  index: number = 0;

  ngAfterViewInit(): void {
    const additionalText = "We love making ice cream - but using our business to make the world a better place gives our work its meaning!";
    this.typeWriterEffect(additionalText, this.el.nativeElement.querySelector('#typed-output'), 20);
  }

  private typeWriterEffect(text: string, element: HTMLElement, speed: number): void {
    let i = 0;

    function type() {
      if (i < text.length) {
        const char = text.charAt(i);
        const coloredChar = i < text.length / 3 ? `<span style="color: rgb(231, 170, 16);">${char}</span>` : char;
        element.innerHTML += coloredChar;
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }


  ngOnInit() {
    this.typeWriter();
  }

  private typeWriter() {
    if (this.index < this.textToType.length) {
      this.typedText += this.textToType[this.index];
      this.index++;

      setTimeout(() => {
        this.typeWriter();
      }, 50);
    }
  }


}
