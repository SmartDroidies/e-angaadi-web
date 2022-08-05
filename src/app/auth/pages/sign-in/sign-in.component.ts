import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognito.service';
import { CognitoUser } from '../../models/cognito-user';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    signinForm!: FormGroup;
    loading: boolean;
    user: CognitoUser;
    showPassword = false;
    userName!: string;
    formError!: any;

    constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private cognitoService: CognitoService) {
        this.loading = false;
        this.user = {} as CognitoUser;
        this.signinForm = this.fb.group({
            username: new FormControl('', [Validators.required, Validators.minLength(4)]),
            password: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.minLength(8), Validators.maxLength(10)
                ]
            ),
        });

    }

    get f() {
        return this.signinForm.controls;
    }


    toggleShowPassword(showBoolean: boolean) {
        this.showPassword = !showBoolean;
    }

    public async signIn(): Promise<void> {
        this.user.username = this.signinForm.value.username;
        this.user.password = this.signinForm.value.password;
        this.loading = true;
        if (this.signinForm.invalid) {
            return;
        }
        try {
            (this.cognitoService.signIn(this.user)).toPromise()
                .then(() => {
                    this.cancel();
                    this.toastr.success('Successfully Logged to your account', 'Loggedin', {
                        positionClass: 'toast-bottom-center',
                    });
                }).catch((e) => {
                    this.loading = false;
                    this.formError = e;
                    this.toastr.error('Error while signin', 'Error', {
                        positionClass: 'toast-bottom-center',
                    });
                });
        } catch (e) {
            this.formError = e;
            this.toastr.error('Error while signin', 'Error', {
                positionClass: 'toast-bottom-center',
            });
        }
    }

    async cancel() {
        await this.router.navigate(['/home']);
    }

    async signUp() {
        await this.router.navigate(['/auth/sign-up']);
    }

    async resetPassword(){
        await this.router.navigate(['/auth/forgot-password']);
    }
}