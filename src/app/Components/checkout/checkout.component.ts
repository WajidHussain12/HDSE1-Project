import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private Servie: ProductService, private ActivatedRoute: ActivatedRoute, private FormBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getCheckData()
    this.getuserdata()
  }

  checkoutData: any[] = [];

  getCheckData() {
    const checkoutDataString = localStorage.getItem("checkout");
    if (checkoutDataString) {
      this.checkoutData = JSON.parse(checkoutDataString);
      // Decode base64 file data
      this.checkoutData.forEach((checkout: any) => {
        if (checkout.IData) {
          const byteCharacters = atob(checkout.IData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/octet-stream' });

          // Create a URL for the blob
          checkout.DecodedFileForCheckout = URL.createObjectURL(blob);
          console.log(this.checkoutData)
        }
      });

    }
  }

  // createBlobUrl(data: string): string {
  //   // Assuming 'data' is the Blob URL
  //   const blob = this.convertDataToBlob(data);
  //   return URL.createObjectURL(blob);
  // }

  // convertDataToBlob(data: string): Blob {
  //   // Implement your logic to convert the data to a Blob
  //   // This might involve fetching the data from a server or manipulating it in some way
  //   // For simplicity, let's assume 'data' is a Base64-encoded image and we convert it to a Blob
  //   const byteCharacters = atob(data.split(',')[1]);
  //   const byteArrays = [];

  //   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
  //     const slice = byteCharacters.slice(offset, offset + 512);

  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   return new Blob(byteArrays, { type: 'image/jpeg' });
  // }







  // decodeFile() {

  // this.checkoutData.forEach(element => {
  //   element.File.FileData
  // });
  //   const decodedFileData = this.decodeBase64(this.fileData);
  //   const blob = new Blob([decodedFileData], { type: 'image/jpeg' });
  //   const file = new File([blob], 'recipe_image.jpg', { type: 'image/jpeg' });
  //   this.DecodedFile = file
  //   this.readImageFile(file);
  // }

  // decodeBase64(encodedData: string): Uint8Array {
  //   const binaryString = window.atob(encodedData);
  //   const binaryLen = binaryString.length;
  //   const bytes = new Uint8Array(binaryLen);
  //   for (let i = 0; i < binaryLen; ++i) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   return bytes;
  // }

  // readImageFile(file: File) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = (event) => {
  //     this.recipeImageFile = event.target?.result as string;
  //   };

  // }

  userCheckoutForm = this.FormBuilder.group({
    userName: [''],
    email: [''],
    contact: [''],
    address: [''],
  })




  UserAddress: any
  UserContact: any

  getuserdata() {
    this.ActivatedRoute.params.subscribe((data: any) => {
      const userid = data['id']
      this.Servie.getuserData(userid).subscribe((data: any) => {
        this.UserAddress = data['address']
        this.UserContact = data['contact']
        this.userCheckoutForm = this.FormBuilder.group({
          userName: [data['userName']],
          email: [data['email']],
          contact: [data['contact']],
          address: [data['address']],
        })
        console.log("Userdata", data);
      })
    })
  }


  save() {

  }

}
