import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Renderer2 } from '@angular/core';
declare const tree: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit { 
    
public title: string;
public subtitle: string;
public tools: string[];

  constructor( private renderer: Renderer2) { 
    this.title ="HOLA, soy José Cardona";
    this.subtitle ="Programador";
    this.tools = ["Java", "NodeJs", "HTML", "CSS", "JavaScript", "Github"];
  }

  ngOnInit() {
   
  }

  inicializateScript(): void{
    tree();
  }

}
