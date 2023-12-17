import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService,private route:Router) { }
  ngOnInit(): void {
    this.PasswordIconToggel()
  }



  userForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(13), Validators.maxLength(40),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#$%^&*()-_+=?]*$'),Validators.maxLength(25)]],
    contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(110)]],
    type: ['user', Validators.required],
    status: ['Active', Validators.required],
    gender: ['', Validators.required]
  });



  gender(gender: string) {
    this.userForm.get('gender')?.setValue(gender);
  }
  save() {
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
      this.userRegistered();
      this.userForm.reset({})
      this.route.navigate(['/admin/users'])
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

  userRegistered() {
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



}
