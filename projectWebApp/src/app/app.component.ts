import { Component,ElementRef,Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'projectWebApp';


  constructor(private renderer: Renderer2){

  }

  ngOnInit(){
    const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li') as NodeListOf<HTMLElement>;
      burger?.addEventListener('click', () => {
        nav?.classList.toggle('nav-active');
        burger?.classList.toggle('toggle');
        navLinks?.forEach((link, index) => {
          if(link.style.animation){
            link.style.animation =''
          }else{
           link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
          }
         });

          burger.classList.toggle('toggle');

      });

    }
    navSlide();
  
  }
}
