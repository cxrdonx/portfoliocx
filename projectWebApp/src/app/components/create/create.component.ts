import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/service/global';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/project';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]

})
export class CreateComponent implements OnInit {
public projects: any;

  constructor( private _projectService: ProjectService ) { 
    
  }
               
  ngOnInit(): void {
     this.seeAllProjects();
  }

  seeAllProjects(){
    this._projectService.getProjects().subscribe(
    response=>{
           this.projects = response;
          console.log(response);
       
      },
      error=>{
        console.log(<any>error);
      }
        
   )
    }
  }
