import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  constructor(private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router) { }
  ngOnInit(): void {

  }

  addbook = this.formBuilder.group({
    bookName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*')]],
    description: ['', Validators.required],
    price: ['', Validators.required],
    bookImage: ['', Validators.required],
    Author: ['Admin'],
    Rating: ['0'],
    status: ['Available'],
  });

  postfile: any
  onchange(event: any) {
    const file = event.target.files[0];
    this.postfile = file
  }


  save() {
    var BookformData = this.addbook.value as {
      bookName: string,
      description: string,
      price: string
      Author: string,
      Rating: string,
      status: string,
    }

    const formdata = new FormData();

    formdata.append("bookImageFile", this.postfile,this.postfile.name)
    formdata.append("bookName", BookformData.bookName)
    formdata.append("description", BookformData.description)
    formdata.append("rating", BookformData.Rating)
    formdata.append("status", BookformData.status)
    formdata.append("price", BookformData.price)
    formdata.append("Author", BookformData.Author)

    // Print formData content
    // formdata.forEach((value, key) => {
    //   console.log("FromData", key, value);
    // });


    // console.log(formData)
    this.requestService.addbook(formdata).subscribe((data) => {
      this.toastr.success("Book Added");
      this.route.navigate(["admin/books"])
      console.log(data)
    });

  }

}
