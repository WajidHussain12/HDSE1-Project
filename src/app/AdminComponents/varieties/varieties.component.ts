import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-varieties',
  templateUrl: './varieties.component.html',
  styleUrls: ['./varieties.component.css']
})
export class VarietiesComponent implements OnInit {

  constructor(private requestService: AdminService, private toastr: ToastrService,private router: Router) { }

  varietyData: any

  ngOnInit(): void {
    this.getVarietyData()

  }
  getVarietyData() {
    this.requestService.getVarietyData().subscribe((data: any) => {
      this.varietyData = data;

      // Decode base64 file data
      this.varietyData.forEach((variety: any) => {
        if (variety.File && variety.File.FileData) {
          const byteCharacters = atob(variety.File.FileData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/octet-stream' });

          // Create a URL for the blob
          variety.File.FileData = URL.createObjectURL(blob);
          console.log(data)
        }
      });
    }, error => {
      console.error('Error fetching recipes:', error);
    }
    );
  }


  // Delete
  VarietyID: number = 0;
  VarietyName: string = "";
  AuthorName: string = "";

  getDeleteId(id: number) {
    this.VarietyID = id;
    console.log("VarietyID", this.VarietyID)
    this.getDeleteUserName(this.VarietyID)
  }

  getDeleteUserName(Deleteid: number) {
    this.requestService.getVarietyDataByID(Deleteid).subscribe((data: any) => {
      this.VarietyName = data['varietyName']
    });
  }


  ConfirmDelete() {
    this.DeleteVariety(this.VarietyID);
  }


  showerror() {
    this.toastr.error('Variety Deleted!');
  }

  DeleteVariety(id: number) {
    this.requestService.deleteVariety(id).subscribe(
      (data) => {
        // Reload the current route
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        const currentUrl = this.router.url + '?';
        this.router.navigateByUrl(currentUrl).then(() => {
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        });

        // Alternatively, navigate to the same component
        // this.router.navigate(['/your-component-path']);

        // Call any other functions or logic you want after deletion
        this.showerror();
        console.log(data)
      },
      error => {
        console.error(error);
      }
    );
  }








}
