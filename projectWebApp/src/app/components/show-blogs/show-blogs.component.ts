import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { ProjectService } from 'src/app/service/project.service';


@Component({
  selector: 'app-show-blogs',
  templateUrl: './show-blogs.component.html',
  styleUrls: ['./show-blogs.component.css'],
  providers:[ProjectService]
})
export class ShowBlogsComponent implements OnInit {
   private url: String;
   public blog: any;

  constructor(private _projectService: ProjectService, private _route: ActivatedRoute) { 
      this.url = this.blog;
  }

  ngOnInit(): void {
      this._route.params.subscribe(params =>{
           let id =   params.id
           this.seeBlog(id);
      })
  }

  seeBlog(id:number){
      this._projectService.getBlog(id).subscribe(
        response =>{
           this.blog = response.blog;
        },
        error =>{
          console.log(<any>error);
       }
      );
  }

}
