import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getUser(id);
  }

  getUser(id: number): void {
    this.userService.getUsers().subscribe(
      data => {
        const users = data['users'];
        this.user = users.find((u: User) => u.id === id) || new User();
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      () => {
        alert('Usuario actualizado exitosamente');
        this.router.navigate(['/users']);
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
