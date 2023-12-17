import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-add-flavour',
  templateUrl: './add-flavour.component.html',
  styleUrls: ['./add-flavour.component.css']
})
export class AddFlavourComponent {
  constructor(private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router) { }
  ngOnInit(): void {

  }

  recipeForm = this.formBuilder.group({
    Recipe_Name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    Cooking_Time: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9]*')]],
    Ingredients: ['', [Validators.required, Validators.minLength(20)]],
    Instruction: ['', [Validators.required, Validators.minLength(30)]],
    Calories: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')]],
    image: ['', [Validators.required]],

    Author_ID: ['1'],
    Author_Name: ['Admin'],
    Status: ['Available']

  });

  onFileChange(event: any) {
    const file = event.target.files[0];
    // this.recipeForm.get('image').setValue(file);
}
//

  // save() {
  //   var formData = this.recipeForm.value
  //   this.requestService.addRecipe(formData).subscribe((data) => {
  //     this.toastr.success("Recipe Added");
  //     this.route.navigate(["admin/recipes"])
  //   });

  // }

}
