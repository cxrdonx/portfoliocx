import {Emails} from '../../models/emails';
import {ProjectService} from '../../service/project.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
const nodeMailer = require('nodemailer');
const { google } = require('googleapis');

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ProjectService]
})
export class ContactComponent implements OnInit {
       sitekey: string;
       client_id: string;
       client_secret: string;
       redirect_uri: string;
       refresh_token: string;
       oAuth2Client: any;
     public email: Emails;

  constructor(private _projectService: ProjectService) { 
    this.sitekey = '6LdBn4gcAAAAAB2qgIj-xu8Gvzn21Xoc278lWLr3';
      this.email = new Emails('','','','');
      this.client_id = '993748911568-7c65j18ccf4n0jem6g5qi3gc1ee1ubqd.apps.googleusercontent.com';
      this.client_secret = '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';
      this.redirect_uri ='https://developers.google.com/oauthplayground';
      this.refresh_token ='1//04OvSBQnQHBSgCgYIARAAGAQSNwF-L9IrJVRCQJc4Q5gVAjHV5qAmBJZBMTVTjHySs-G_E1UeJsuFaotBWcfPyFwbGoMnOpEVmC4';
      this.oAuth2Client = new google.auth.OAuth2(this.client_id, this.client_secret, this.redirect_uri);
      this.oAuth2Client.setCredentials({
        refresh_token: this.refresh_token
      });
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

      async function sendEmail(email: Emails) {
        try{
          const accesToken = await this.oAuth2Client.getAccessToken();
          const transport = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'j.cardona.covenant@gmail.com',
              clientId: this.client_id,
              clientSecret: this.client_secret,           
              refreshToken: this.refresh_token,
              accesToken: "accesToken" 
            }
          })catch(error){
            console.log(error);
          }
        }



  }

}


