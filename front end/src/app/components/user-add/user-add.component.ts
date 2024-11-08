import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  addUser(): void {
    this.userService.addUser(this.user).subscribe(
      () => {
        alert('Usuario agregado exitosamente');
        this.router.navigate(['/users']);
      },
      error => {
        console.error('Error al agregar el usuario:', error);
      }
    );
  }
}
