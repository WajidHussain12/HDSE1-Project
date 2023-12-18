import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdashboardComponent } from '../../userdashboard/userdashboard.component';
import { ShareRecipeComponent } from '../../share-recipe/share-recipe.component';
import { UserordersComponent } from '../../userorders/userorders.component';
import { UserprofileComponent } from '../../userprofile/userprofile.component';
import { UsersettingsComponent } from '../../usersettings/usersettings.component';

const routes: Routes = [
  { path: 'dashboard/:id', component: UserdashboardComponent },
  { path: 'ShareRecipe/:id', component: ShareRecipeComponent },
  { path: 'orders/:id', component: UserordersComponent },
  { path: 'profile/:id', component: UserprofileComponent },
  { path: 'settings/:id', component: UsersettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
