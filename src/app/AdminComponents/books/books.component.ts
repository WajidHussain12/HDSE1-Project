import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  constructor(private requestService: AdminService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getbooksData();
  }



  booksData: any

  getbooksData() {
    this.requestService.getbookssData().subscribe((data) => {
      this.booksData = data
    });
  }


  // Delete
  booksId: number;
  booksname: string = "";

  getDeleteId(id: number) {
    this.booksId = id;
    console.log(this.booksId)
    this.Getdeletebooksname(id)
  }

  Getdeletebooksname(Deleteid: number) {
    this.requestService.Getdeletebookname(Deleteid).subscribe((data) => {
      var d: any = data;
      this.booksname = d['bookName']
    });
  }


  ConfirmDelete() {
    this.Deletebooks(this.booksId);
    this.showerror();
  }

  Deletebooks(id: number) {
    this.requestService.Deletebook(id).subscribe((data) => {
      console.log("Book Deleted", data)
      this.ngOnInit()
    });
  }

  showerror() {
    this.toastr.error('Book Deleted!');
  }

}
