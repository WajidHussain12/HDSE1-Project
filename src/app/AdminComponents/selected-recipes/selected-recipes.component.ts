import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';
@Component({
  selector: 'app-selected-recipes',
  templateUrl: './selected-recipes.component.html',
  styleUrls: ['./selected-recipes.component.css']
})
export class SelectedRecipesComponent {
  constructor(private requestService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWinnerUserData()
  }

  recipeWinnerData: any

  getWinnerUserData() {
    this.requestService.getRecipeWinnerallData().subscribe((data: any) => {
      console.log(data)
      this.recipeWinnerData = data
    });
  }

  deleteWinner(id: any) {
    this.requestService.deleteWinner(id).subscribe((data:any)=>{
      console.log(data)
      this.toastr.error("Winner Recipe Deleted")
      this.ngOnInit()
    });
  }

}
