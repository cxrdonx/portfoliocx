import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
       sitekey: string;

  constructor() { 
    this.sitekey = '6LdBn4gcAAAAAB2qgIj-xu8Gvzn21Xoc278lWLr3';
  }

  ngOnInit(): void {
  }

}
