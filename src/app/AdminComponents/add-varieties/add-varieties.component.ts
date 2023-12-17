import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-add-varieties',
  templateUrl: './add-varieties.component.html',
  styleUrls: ['./add-varieties.component.css']
})
export class AddVarietiesComponent {

  constructor(private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router) { }


  ngOnInit(): void {
    // this.PasswordIconToggel()
    this.getRecipeIdAndName()
  }



  varietyform = this.formBuilder.group({
    varietyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    deliveryTime: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*')]],
    cashOnDelivery: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')]],
    price: ['', [Validators.required, Validators.maxLength(10)]],
    recipeId: ['', Validators.required],

    varietyImage: ['', Validators.required]
  });




  RecipeIdAndName: { rid: any, rname: any }[] = []
  SelectedRecipeId: any | undefined;


  getRecipeIdAndName() {
    this.requestService.getrecipesData().subscribe((data: any) => {
      this.RecipeIdAndName = data.map((obj: { recipeid: any, flavorName: any }) => ({ rid: obj.recipeid, rname: obj.flavorName }));
      console.log(data)
    })
  }

  onSelectChange(event: any) {
    //  console.log(event)
    this.SelectedRecipeId = event.target.value;
    this.varietyform.get('recipeId')?.setValue(this.SelectedRecipeId);
    const selectedRecipe = this.RecipeIdAndName.find(recipe => recipe.rid == this.SelectedRecipeId);

    if (selectedRecipe) {
      console.log('Selected Recipe:', { rid: selectedRecipe.rid, rname: selectedRecipe.rname });
    } else {
      console.log('Not Found');
    }
  }
  varietyImageFile: any


  onFileChange(event: any) {
    const file = event.target.files[0];
    this.varietyImageFile = file

  }



  varietyAdded() {
    this.toastr.success('Veriety Added');
  }

  save() {

    const VForm = this.varietyform.value as {
      varietyName: string | null;
      deliveryTime: string | null;
      cashOnDelivery: string | null;
      price: string | null;
    };

    const formdata = new FormData();
    formdata.append('VarietyImageFile', this.varietyImageFile, this.varietyImageFile.name);
    formdata.append('RecipeID', this.SelectedRecipeId);
    formdata.append('varietyName', VForm.varietyName!);
    formdata.append('deliveryTime', VForm.deliveryTime!);
    formdata.append('cashOnDelivery', VForm.cashOnDelivery!);
    formdata.append('price', VForm.price!);

    // console.log(this.varietyform.value)

    this.requestService.addVariety(formdata).subscribe((data: any) => {
      console.log(data)
      this.varietyAdded()
      this.varietyform.reset({})
      this.route.navigate(['/admin/varieties'])
    })

  }


}
