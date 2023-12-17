import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private FormBuilder: FormBuilder, private Toast:ToastrService) { }

  contactform = this.FormBuilder.group({

    name: ['', Validators.required],
    email: ['', Validators.required],
    msg: ['', Validators.required],
  })


  save() {
    const contactformData = this.contactform.value
    this.Toast.success("Your Form Submitted We will Contact you Soon")
    this.contactform.reset()
    console.log(contactformData)
  }
}
