import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-flavours',
  templateUrl: './flavours.component.html',
  styleUrls: ['./flavours.component.css']
})
export class FlavoursComponent implements OnInit {

  constructor(private requestService: AdminService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getFlavourData();
  }



  Flavour: any

  getFlavourData() {
    this.requestService.getrecipesData().subscribe((data) => {
      this.Flavour = data
      // console.log(data)
    });
  }


  // Delete
  // FlavourId: number;
  // Flavourname: string = "";

  getDeleteId(id: number) {
    // this.FlavourId = id;
    // console.log(this.FlavourId)
    // this.GetdeleteFlavourname(id)
  }

  // GetdeleteFlavourname(Deleteid: number) {
  //   this.requestService.GetdeleteFlavourname(Deleteid).subscribe((data) => {
  //     var d: any = data;
  //     this.Flavourname = d['flavourName']
  //   });
  // }






  // ConfirmDelete() {
  //   this.DeleteFlavour(this.FlavourId);
  // }

  // DeleteFlavour(id: number) {
  //   this.requestService.DeleteFlavour(id).subscribe((data) => {
  //     console.log("Flavour Deleted", data)
  //     this.ngOnInit()
  //   this.toastr.error('Flavour Deleted!');

  //   });
  // }


}
