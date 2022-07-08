
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService, IUser } from '../../services/cognito.service';


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    loginForm!: FormGroup;
    loading: boolean;
    user: IUser;
    showPassword = false;
    Username!: string;

    constructor(private router: Router, private fb: FormBuilder,
        private cognitoService: CognitoService) {
        this.loading = false;
        this.user = {} as IUser;
        
    }

    toggleShowPassword(showBoolean: boolean) {
        this.showPassword = !showBoolean;
    }

    public signIn(): void {
        this.loading = true;
        this.cognitoService.signIn(this.user)
            .then(() => {
                this.router.navigate(['/home']);
            }).catch(() => {
                this.loading = false;
            });
    }
}