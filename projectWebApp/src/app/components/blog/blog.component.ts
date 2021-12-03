import { Component, OnInit } from '@angular/core';
import { analytics } from 'googleapis/build/src/apis/analytics';
import { Blog } from 'src/app/models/blog';
import { Global } from 'src/app/service/global';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ProjectService]
})
export class BlogComponent implements OnInit {

  public url: string;
  public blogs: any;

  constructor(private _projectService: ProjectService) {
      this.url = Global.url;
    
    }

  ngOnInit(){ 
      this.getAllblogs();
       
  }
   
  getAllblogs(){
    this._projectService.getBlogs().subscribe(
      result =>{
         this.blogs = result;
         console.log(this.blogs);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  click(){
    console.log("click");
  }

}
