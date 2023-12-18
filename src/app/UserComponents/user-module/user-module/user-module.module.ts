import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserdashboardComponent } from '../../userdashboard/userdashboard.component';
import { UsersidebarComponent } from '../../usersidebar/usersidebar.component';
import { UserdashboardnavComponent } from '../../userdashboardnav/userdashboardnav.component';
import { ShareRecipeComponent } from '../../share-recipe/share-recipe.component';
import { UserordersComponent } from '../../userorders/userorders.component';
import { UserprofileComponent } from '../../userprofile/userprofile.component';
import { UsersettingsComponent } from '../../usersettings/usersettings.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    UsersidebarComponent,
    UserdashboardComponent,
    UserdashboardnavComponent,
    ShareRecipeComponent,
    UserordersComponent,
    UserprofileComponent,
    UsersettingsComponent

    // user

  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    HttpClientModule,
    NgxApexchartsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModuleModule { }
