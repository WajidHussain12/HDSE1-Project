import { ProductService } from 'src/app/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  registrationSuccess = false; // Add this variable



  constructor(private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router,private ProductService: ProductService,) { }
  ngOnInit(): void {
    this.PasswordIconToggel()
  }



  userForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(13), Validators.maxLength(40), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#$%^&*()-_+=?]*$'), Validators.maxLength(25)]],
    contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(110)]],
    type: ['user', Validators.required],
    status: ['Active', Validators.required],
    gender: ['', Validators.required]
  });



  gender(gender: string) {
    this.userForm.get('gender')?.setValue(gender);
  }
  async save() {
    // Get the current value of the Contact field
    let contactValue = this.userForm.get('contact')?.value;

    // Check if contactValue is a string and prepend '+92' if it's not already there
    if (contactValue) {
      contactValue = '+92' + contactValue;
      // Set the modified value back to the form control
      this.userForm.get('contact')!.setValue(contactValue);

      console.log('Modified Contact Value:', contactValue);
    }

    // Now, you can proceed with saving the form
    console.log('Form Data to be saved:', this.userForm.value);

     this.requestService.addUser(this.userForm.value).subscribe((data) => {
       this.userAutoRedirect()
      this.userRegisteredMSG();
      // this.userForm.reset({})
      // this.route.navigate(['user/dashboard'])
    });
  }
  onInputChange(event: any) {
    const inputValue = event.target.value;
    // Check if the input starts with '+92'
    if (inputValue.startsWith('+92')) {
      // Remove '+92' from the input value
      const newInputValue = inputValue.substring(3);
      // Update the form control value without '+92'
      this.userForm.get('contact')?.setValue(newInputValue, { emitEvent: false });
    }
  }

  userRegisteredMSG() {
    this.toastr.success('User Registered');
  }

  PasswordIconToggel() {
    $(".toggle-password").click(() => {
      $(".toggle-password").toggleClass("fa-eye fa-eye-slash");
      const input = $(".toggle-password").parent().find("input");
      if (input.attr("type") === "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }


  userAutoRedirect() {
    const userformData = this.userForm.value as {
      email: string,
      password: string

    };

    const formData = new FormData();
    formData.append("email", userformData.email)
    formData.append("password", userformData.password)

     // Print formData content
  formData.forEach((value, key) => {
    console.log("FromData",key, value);
  });

    this.ProductService.Userlogin(formData).subscribe((data) => {
      var d: any = [data]
      var jwTtoken = d[0]['jwTtoken']
      localStorage.setItem("usertoken", jwTtoken)

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

      localStorage.setItem('UserName', userName)
      this.route.navigate(['user/dashboard'])
      console.log(jwTtoken)
    })

  }






  // ngOnInit() {
  //   this.registrationForm = this.fb.group({
  //     username: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', Validators.required, ],
  //   }, { validators: this.passwordMatchValidator });
  // }

  // customUsernameValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   // Add your custom username validation logic here
  //   // Example: Username should not contain spaces
  //   if (control.value && control.value.trim().length > 0 && control.value.includes(' ')) {
  //     return { 'invalidUsername': true };
  //   }
  //   return null;
  // }

  // customPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   // Add your custom password validation logic here
  //   // Example: Password should contain at least one digit
  //   const hasDigit = /\d/.test(control.value);
  //   if (!hasDigit) {
  //     return { 'missingDigit': true };
  //   }
  //   return null;
  // }

  // customConfirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');

  //   // Check if both fields are not empty and if they match
  //   if (password && confirmPassword && password.value !== confirmPassword.value) {
  //     return { 'passwordMismatch': true };
  //   }

  //   return null;
  // }




  // Custom validator for password matching

  // passwordMatchValidator(group: FormGroup): { [s: string]: boolean } | null {
  //   const password = group.get('password')!.value;
  //   const confirmPassword = group.get('confirmPassword')!.value;
  //   return password === confirmPassword ? null : { 'passwordMismatch': true };
  // }


  // isFieldInvalid(field: string): boolean {
  //   const formControl = this.registrationForm.get(field);
  //   return !!formControl && formControl.invalid && formControl.touched;
  // }




  //     register() {
  //       if (this.registrationForm.valid) {
  //         this.ProductService.register(this.registrationForm.value).subscribe(
  //           (response) => {
  //             this.registrationSuccess = true;
  //             this.registrationForm.reset()
  //             console.log('Registration successful', response);
  //             setTimeout(() => {
  //               this.router.navigate(['/login']);
  //               this.registrationSuccess = false;
  //             }, 2000);
  //           },
  //           (error) => {
  //             console.error('Registration failed', error);
  //           }
  //           );
  //         } else {
  //         // Form is invalid, display error messages or handle as needed
  //         console.error('Form is invalid');
  //       }
  //     }

}
