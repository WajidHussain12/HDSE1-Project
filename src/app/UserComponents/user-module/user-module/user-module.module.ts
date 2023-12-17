import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserdashboardComponent } from '../../userdashboard/userdashboard.component';
import { UsersRecipesComponent } from 'src/app/AdminComponents/users-recipes/users-recipes.component';
import { UsersidebarComponent } from '../../usersidebar/usersidebar.component';
import { UserdashboardnavComponent } from '../../userdashboardnav/userdashboardnav.component';


@NgModule({
  declarations: [
    UsersidebarComponent,
    UserdashboardComponent,
    UserdashboardnavComponent

    // user

  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
  ]
})
export class UserModuleModule { }
