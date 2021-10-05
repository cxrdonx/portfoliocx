import {  Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {observable, Observable} from 'rxjs';
import {Project} from '../models/project';
import {Global} from './global';
import { Emails } from "../models/emails";
import { ThrowStmt } from "@angular/compiler";
@Injectable()
    export class ProjectService{
        public url: string;
        constructor(
            private _http: HttpClient

        ){
            this.url = Global.url;
        }
        testService(){
            return 'Probando el servicio de angular';
        }
        saveProject(project: Project): Observable<any>{
            let params = JSON.stringify(project);
            let headers = new HttpHeaders().set('Content-Type', 'application/json');

            return this._http.post(this.url+'save', params, {headers: headers});
        }

        sendEmail(email: Emails): Observable<any>{
            let params = JSON.stringify(email);
            let headers = new HttpHeaders().set('Content-Type', 'application/json');

            return this._http.post(this.url+'send-email', params, {headers: headers});
        }

        getProjects(): Observable<any>{
            return this._http.get(this.url+'all');
        }

    }
