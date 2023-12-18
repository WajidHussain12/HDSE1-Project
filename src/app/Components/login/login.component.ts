import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {

  constructor(private fb: FormBuilder, private ProductService: ProductService, private router: Router) { }

  errorMessage!: string;  // Declare errorMessage property
  loginSuccess = false;  // Add loginSuccess property
  successMessage = 'Login successful! Redirecting to home...';  // Set success message



  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })


  // get email(){
  //   return this.loginForm.controls['email'];
  // }

  // get passsword(){
  //   return this.loginForm.controls['password'];
  // }


  notFound: Boolean = false


  loginUser() {
    const formalues = this.loginForm.value as {
      email: string,
      password: string,
    };

    const formData = new FormData();

    formData.append("email", formalues.email)
    formData.append("password", formalues.password)


    // Print formData content
    // formData.forEach((value, key) => {
    //   console.log("FromData", key, value);
    // });

    this.ProductService.Userlogin(formData).subscribe((data: any) => {
      var d: any = [data]



      var firstName = d[0]['userdata']['firstName'];
      var lastName = d[0]['userdata']['lastName'];
      var address = d[0]['userdata']['address'];
      var contact = d[0]['userdata']['contact'];
      var email = d[0]['userdata']['email'];
      var gender = d[0]['userdata']['gender'];
      var password = d[0]['userdata']['password'];
      var status = d[0]['userdata']['status'];
      var type = d[0]['userdata']['type'];
      var userName = d[0]['userdata']['userName'];
      var userid = d[0]['userdata']['userid'];

      var jwTtoken = d[0]['jwTtoken']
      localStorage.setItem("usertoken", jwTtoken)
      localStorage.setItem('UserName', userName)
      localStorage.setItem('userid', userid)


      this.router.navigate([`user/dashboard/${userid}`])
      console.log("token", jwTtoken)
      // console.log(firstName)
      // console.log(data)
    },(error) => {
      // Handle error responses here
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.log("Wrong Password");
          this.notFound = true
        } else {
          console.error("An error occurred:", error);
        }
      }
    }

    )




    //   this.ProductService.login(email as string).subscribe(
    //     response => {
    //       if (response.length > 0 && response[0].password === password) {
    //         sessionStorage.setItem('email', email as string);
    //         this.loginSuccess = true;
    //         setTimeout(() => {
    //           this.router.navigate(['']);
    //         }, 2000);
    //       } else {
    //         this.errorMessage = '*Email or password is invalid';
    //       }
    //     },
    //     error => {
    //       console.error('Error during login:', error);
    //       this.errorMessage = 'An error occurred during login';
    //     }
    //   );
    // }

  }

}














// loginForm!: FormGroup;
//   errorMessage!: string;


//   constructor(private ProductService: ProductService, private fb: FormBuilder, private _http: HttpClient) { }

//   ngOnInit() {
//     this.loginForm = new FormGroup({
//       'username': new FormControl(),
//       'password': new FormControl(),
//     });
//   }

//   login(login: FormGroup) {
//     let user: any;

//     this._http.get<any>("http://localhost:3000/users").subscribe(
//       (res) => {
//         user = res.find((a: any) => a.username === this.loginForm.value.username && a.password === this.loginForm.value.password);

//         if (user) {
//           alert('You are successfully logged in');
//         } else {
//           this.errorMessage = 'Invalid username or password';
//         }
//       },
//       (error) => {
//         console.error('Error during login:', error);
//         this.errorMessage = 'An error occurred during login';
//       }
//     );
//   }
