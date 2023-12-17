import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  constructor(private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.PasswordIconToggel()
    this.getEditUserData()
  }


  userForm = this.formBuilder.group({
    userid: ['', Validators.required],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(13), Validators.maxLength(40), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#$%^&*()-_+=?]*$'), Validators.maxLength(25)]],
    contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(110), Validators.pattern('[a-zA-Z ]*')]],
    type: ['user', Validators.required],
    status: ['Active', Validators.required],
    gender: ['', [Validators.required]],
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

    this.requestService.UpdataUser(this.editUsedID, this.userForm.value).subscribe((data) => {
      this.userForm.reset({})
      this.route.navigate(['/admin/users'])
      this.userEditedMsg();
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

  userEditedMsg() {
    this.toastr.warning('User Edited');
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


  // For Update User Data


  editUsedID: any
  selectedGender: any
  getEditUserData() {
    var Userid = this.ActivatedRoute.params.subscribe((urlData) => {
      var getid = urlData;
      var getedid = getid['id'];
      this.editUsedID = getedid



      this.requestService.getEditUserData(getedid).subscribe((data: any) => {
        // Assuming Contact is the property that contains the phone number
        var phoneNumberWithCountryCode = data['contact'];

        // Removing the country code
        var phoneNumberWithoutCountryCode = phoneNumberWithCountryCode.replace(/^(\+92)/, '');

        // Assigning the modified phone number to a new variable
        var modifiedPhoneNumber = phoneNumberWithoutCountryCode;

        var getedGender = data['gender'];
        this.selectedGender = getedGender

        this.userForm = this.formBuilder.group({
          userid: [data['userid']],
          firstName: [data['firstName']],
          lastName: [data['lastName']],
          userName: [data['userName']],
          email: [data['email']],
          password: [data['password']],
          contact: [modifiedPhoneNumber],  // Using the modified phone number here
          address: [data['address']],
          type: [data['type']],
          status: [data['status']],
          gender: [data['gender']]
        });
        this.gender(data['gender']);

      });
    });
  }

}
