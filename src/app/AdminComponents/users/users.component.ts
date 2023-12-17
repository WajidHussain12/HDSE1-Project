import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private requestService: AdminService,private toastr: ToastrService) {

  }

  showerror() {
    this.toastr.error('User Deleted!');
  }


  ngOnInit(): void {
    this.requesrUserData();




  }



  UserData: any;
  requesrUserData() {
    this.requestService.getUsersData().subscribe((data) => {
      this.UserData = data;
      console.log(this.UserData)
    });
  }

  // Delete
  userId: number = 0;
  username: string = "";

  getDeleteId(id: number) {
    this.userId = id;
    console.log(this.userId)
    this.getDeleteUserName(this.userId)
  }

  getDeleteUserName(Deleteid: number) {
    this.requestService.GetdeleteUsername(Deleteid).subscribe((data) => {
      var d: any = data;
      this.username = d['userName']
    });
  }


  DeleteUser(id: number) {
    this.requestService.DeleteUser(id).subscribe((data) => {
      console.log("Student Deleted", data)
      this.ngOnInit()
    });
  }

  ConfirmDelete() {
    this.DeleteUser(this.userId);
    this.showerror();
  }


}



