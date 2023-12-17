// products.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service'; // Adjust the path based on your project structure

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  flavorData: any;
  currentFlavor: any;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getFlavorData().subscribe((data: any[] | undefined) => {
      this.flavorData = data;

      // Decode base64 file data
      this.flavorData.forEach((recipe: any) => {
        if (recipe.File && recipe.File.FileData) {
          const byteCharacters = atob(recipe.File.FileData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/octet-stream' });

          // Create a URL for the blob
          recipe.File.FileData = URL.createObjectURL(blob);
        }
      });

      console.log(data)
    });
  }


}
