import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getUser(id);
  }

  getUser(id: number): void {
    this.userService.getUsers().subscribe(
      data => {
        const users = data['users'];
        const user = users.find((u: User) => u.id === id);
        if (user) {
          this.userForm.patchValue(user);
        }
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  updateUser(): void {
    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.value;
      this.userService.updateUser(updatedUser).subscribe(
        () => {
          this.showSuccessModal();
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
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

  cancelEdit(): void {
    this.router.navigate(['/users']);
  }
}
