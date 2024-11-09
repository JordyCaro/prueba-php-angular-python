import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  userForm: FormGroup;
  showModal: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.userForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.userService.addUser(newUser).subscribe(
        () => {
          this.showSuccessModal();
        },
        error => {
          console.error('Error al agregar el usuario:', error);
        }
      );
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }

  showSuccessModal(): void {
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
      this.router.navigate(['/users']);
    }, 3000);
  }
}
