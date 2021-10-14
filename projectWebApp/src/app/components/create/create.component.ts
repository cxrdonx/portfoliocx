import { Component, OnInit, Renderer2 } from '@angular/core';
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
public url: string;

  constructor( private _projectService: ProjectService, private renderer: Renderer2, private http: HttpClient) {
  
    this.url = Global.url;
  }
               
  ngOnInit() {
     this.seeAllProjects();
  }


  seeAllProjects(){
    this._projectService.getProjects().subscribe(
    result=>{
           this.projects = result;
            console.log(this.projects);
      },
      error=>{
        console.log(<any>error);
      }
        
   )
    }
  }
