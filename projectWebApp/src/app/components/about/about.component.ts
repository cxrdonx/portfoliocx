import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit { 
    
public title: string;
public subtitle: string;
public tools: string[];

  constructor() { 
    this.title ="HOLA, soy José Cardona";
    this.subtitle ="Programador";
    this.tools = ["Java", "NodeJs", "HTML", "CSS", "JavaScript", "Github"];
  }

  ngOnInit(): void {
   
  }

}
