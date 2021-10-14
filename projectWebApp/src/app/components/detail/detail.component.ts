import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import { Global } from 'src/app/service/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
 public url: String;
 public project: any;

  constructor(
      private _projectService: ProjectService,
      private _router: Router,
      private _route: ActivatedRoute
  ) { 
     this.url = Global.url;

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id:number){
     this._projectService.getProject(id).subscribe(
       response => {
         this.project = response.project;
         console.log(this.project);
       },
       error => {
         console.log(<any>error);
       }
     );
  }

}
