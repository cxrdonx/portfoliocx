import {Emails} from '../../models/emails';
import {ProjectService} from '../../service/project.service';
import { Component, OnInit, Renderer2} from '@angular/core';
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
     public status: any;

  constructor(private _projectService: ProjectService, private renderer: Renderer2) { 
    this.email = new Emails('','','','');

  }

  ngOnInit(){
     const submit = () =>{
       if(this.email.name != '' && this.email.email != '' && this.email.affair != '' && this.email.message != ''){
    
       }
       console.log(this.email);
      

       const clear = document.querySelector(".limpiar");
        clear?.addEventListener("click", (event) => {
          event.preventDefault();
  
     });
    
  }
  submit();
}



  onSubmit(forms:NgForm){
  
    this._projectService.sendEmail(this.email).subscribe(
      response=>{
        console.log(this.email);
         if(response.email){
           this.status = 'success';
           console.log(this.status);
         }else{
           this.status = 'failed';
         }
      },
       error=>{
        console.log(<any>error); 
  
       }
        );

        const submit = () =>{
          if(this.email.name != '' && this.email.email != '' && this.email.affair != '' && this.email.message != ''){
           alert('Mensaje enviado');
          location.reload();
          }
      }

      submit();
    }
}


