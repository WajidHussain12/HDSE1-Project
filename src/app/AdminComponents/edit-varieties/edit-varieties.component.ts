import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-edit-varieties',
  templateUrl: './edit-varieties.component.html',
  styleUrls: ['./edit-varieties.component.css']
})
export class EditVarietiesComponent {

  constructor(private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router, private ActivatedRoute: ActivatedRoute) { }

  varietyID: any
  RecipeIdAndName: { rid: any, rname: any }[] = []
  SelectedRecipeId: any | undefined;
  varietyImageFile: any
  DropDownRecipeId: any
  fileData: any
  recipeImageFile: any
  DecodedFile: any
  ResponseDatabaseImgae: any
  // RecipeIdAndName:any


  ngOnInit(): void {

    this.getRecipeIdAndName()
    this.getVarietyDatabyId()

    setTimeout(() => {
      this.decodeFile();
    }, 1000);

    setTimeout(() => {
      this.decodeFile();

      // Set the initial value after the form has been created
      this.varietyform.get('recipeId')?.setValue(this.DropDownRecipeId);
    }, 1000);

  }




  varietyform = this.formBuilder.group({
    varietyName: [''],
    deliveryTime: [''],
    cashOnDelivery: [''],
    price: [''],
    varietyImage: [''],
    recipeId:['']
  });

  getRecipeIdAndName() {
    this.requestService.getrecipesData().subscribe((data: any) => {
      this.RecipeIdAndName = data.map((obj: { recipeid: any, flavorName: any }) => ({ rid: obj.recipeid, rname: obj.flavorName }));

      // Set initial selected value
      this.SelectedRecipeId = this.RecipeIdAndName[0].rid;
    });
  }
  onSelectChange(event: any) {
    const selectedRecipeId = event.target.value! as string;
    this.varietyform.get('recipeId')?.setValue(selectedRecipeId);
  }





  onFileChange(event: any) {
    const file = event.target.files[0];
    this.varietyImageFile = file

  }


  varietyAdded() {
    this.toastr.success('Veriety Added');
  }




  getVarietyDatabyId() {
    this.ActivatedRoute.params.subscribe((data: any) => {
      var VarietyId = data['id']
      console.log(VarietyId)

      this.requestService.getVarietyDataByID(VarietyId).subscribe((data: any) => {
        this.DropDownRecipeId = data['recipeID']
        this.varietyID = data['varietyID']
        this.fileData = data['varietyImg']
        this.ResponseDatabaseImgae = data['varietyImageFileName']
        this.varietyform = this.formBuilder.group({
          varietyName: [data['varietyName'] || null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
          deliveryTime: [data['deliveryTime'] || null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*')]],
          cashOnDelivery: [data['cashOnDelivery'] || null, [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')]],
          price: [data['price'] || null, [Validators.required, Validators.maxLength(10)]],
          recipeId: [data['recipeId'] || null, Validators.required],
          varietyImage: [data['varietyImage'] || null]
        });


        console.log(data)
      })
    });
  }



  decodeFile() {
    const decodedFileData = this.decodeBase64(this.fileData);
    const blob = new Blob([decodedFileData], { type: 'image/jpeg' });
    const file = new File([blob], 'recipe_image.jpg', { type: 'image/jpeg' });
    this.DecodedFile = file
    this.readImageFile(file);
  }

  decodeBase64(encodedData: string): Uint8Array {
    const binaryString = window.atob(encodedData);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  readImageFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      this.recipeImageFile = event.target?.result as string;
    };

  }


  // recipeid = this.varietyform.get('recipeId')?.value;
  save() {
    // console.log(this.varietyform.value)

    const varietyData = this.varietyform.value as {
      varietyName: string
      deliveryTime: string
      cashOnDelivery: string
      price: string
      recipeId: any
      varietyImage: string
    };

    const formData = new FormData();
    if (this.varietyImageFile) {
      formData.append('VarietyImageFile', this.varietyImageFile, this.varietyImageFile.name);
      formData.append('varietyName', varietyData.varietyName);
      formData.append('deliveryTime', varietyData.deliveryTime);
      formData.append('cashOnDelivery', varietyData.cashOnDelivery);
      formData.append('price', varietyData.price);
      formData.append('recipeId', varietyData.recipeId);
    }
    else {
      formData.append('VarietyImageFile', this.DecodedFile, this.DecodedFile.name);
      formData.append('varietyName', varietyData.varietyName);
      formData.append('deliveryTime', varietyData.deliveryTime);
      formData.append('cashOnDelivery', varietyData.cashOnDelivery);
      formData.append('price', varietyData.price);
      formData.append('recipeId', varietyData.recipeId);
    }

    this.updateVariety(formData)
  }

  updateVariety(data: any) {
    this.requestService.updateVarietyData(this.varietyID, data).subscribe((data) => {
      console.log(data)
    });
  }
}
//varietyImageFile
