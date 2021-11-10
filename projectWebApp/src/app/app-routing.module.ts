import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { ShowBlogsComponent } from './components/show-blogs/show-blogs.component';


const routes: Routes = [
      {path:'sobre-mi', component: AboutComponent}, 
      {path:'contacto', component: ContactComponent},
      {path:'cargar-proyecto', component: CreateComponent},
      {path:'all-proyects', component:AllProjectsComponent},
      {path:'proyecto/:id', component:DetailComponent},
      {path:'blog', component: BlogComponent},
      {path:'see-blog/:id', component:ShowBlogsComponent}, 
      {path:'**', component:AboutComponent}
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
