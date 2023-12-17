import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrls: ['./userbooks.component.css']
})
export class UserbooksComponent {

  books: any = [];
  bannerImage: any;
  booksGetedData: any[] = [];
  booksImageFile: any


  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  bookimgData: any
  bookFile: any
  ngOnInit(): void {

    this.productService.getbooks().subscribe((data: any) => {
      this.books = data;
      this.bookFile = data



      this.imageDecode()
    });

  }
  decodedImgeFile: any

  // decodeFile() {
  //   const decodedFileData = this.decodeBase64(this.fileData);
  //   const blob = new Blob([decodedFileData], { type: 'image/jpeg' });
  //   const file = new File([blob], 'recipe_image.jpg', { type: 'image/jpeg' });
  //   this.DecodedFile = file
  //   this.readImageFile(file);
  // }

  imageDecode() {
    // Decode base64 file data
    this.books.forEach((books: any) => {
      if (books.File && books.File.FileData) {
        this.bookimgData = books.File.FileData
        console.log("decodedImgeFile", this.bookimgData)

        const byteCharacters = atob(books.File.FileData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });

        // Create a URL for the blob
        books.File.FileData = URL.createObjectURL(blob);
        books.IData = this.bookimgData
        // console.log(books.File.FileData)
        // var data = books.File.FileData
        // console.log("bookimgData", data)
        console.log("data", this.bookFile)
      }
    });
  }




  bookAddtoCart(book: any) {
    const existingCartItemsString = localStorage.getItem('cart');
    const existingCartItems = existingCartItemsString ? JSON.parse(existingCartItemsString) : [];

    // Add the book to the array
    existingCartItems.push(book);

    // Store the updated array in local storage
    localStorage.setItem('cart', JSON.stringify(existingCartItems));

    // console.log(book)
  }







  // decodeFile() {
  //   const decodedFileData = this.decodeBase64(this.bannerImage);
  //   const blob = new Blob([decodedFileData], { type: 'image/jpeg' });
  //   const file = new File([blob], 'books_image.jpg', { type: 'image/jpeg' });
  //   this.DecodedFile = file
  //   // this.readImageFile(file);
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

  //   reader.onload = (event) => {
  //     this.booksImageFile = event.target?.result as string;
  //   };

  //   reader.readAsDataURL(file);
  // }




}
