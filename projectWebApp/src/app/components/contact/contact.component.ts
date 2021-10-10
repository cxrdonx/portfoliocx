import {Emails} from '../../models/emails';
import {ProjectService} from '../../service/project.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ProjectService]
})
export class ContactComponent implements OnInit {
  
       oAuth2Client: any;
     public email: Emails;

  constructor(private _projectService: ProjectService) { 
    this.email = new Emails('','','','');
  }

  ngOnInit(): void {
  }

  onSubmit(forms:NgForm){
     console.log(this.email);
    this._projectService.sendEmail(this.email).subscribe(
      response=>{
        console.log(response); 
      },
       error=>{
        console.log(<any>error); 
       }
        );
      
      }

}


