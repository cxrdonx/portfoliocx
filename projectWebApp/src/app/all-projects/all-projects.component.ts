import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../service/project.service';
import { NgForm } from '@angular/forms';
import { UploadService } from '../service/upload.service';
import { global } from '@angular/compiler/src/util';
import { Global } from '../service/global';


@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css'],
  providers: [ProjectService, UploadService]
})
export class AllProjectsComponent implements OnInit {
  public project: Project;
  public filesToUpload: Array<File>;
  public projectId: string;
  public projects: any;

  constructor(private _projectService: ProjectService, private _uploadService: UploadService) {
        this.project = new Project('','','','','','');
        this.filesToUpload = new Array<File>();
        this.projectId = this.project._id;
   }

  ngOnInit(): void {
  }

  onSubmit(forms:NgForm) {
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project){
      
          this._uploadService.makeFileRequest(Global.url+"send-image/"+response.project._id,[],this.filesToUpload,'image')
          .then((result:any) =>{
                       console.log(result);
          });
          forms.reset();
        }else{

        }
      },
    error =>{
      console.log(<any>error);
    }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}