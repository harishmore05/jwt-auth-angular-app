import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("SignUp | JWT Auth")
  }

  onSubmit(f: NgForm) {
    let formObj = JSON.stringify(f.value);
    this.auth.register(formObj)
    .subscribe(
      (data) => {
        this.toastr.success("Register Successfully..")
        this.router.navigateByUrl('signin')
      },
      (err) => {
        this.toastr.error(err.error.message)
      }
    )
  }

}
