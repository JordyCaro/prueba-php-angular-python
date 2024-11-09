import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: User[] = [];
  cryptoPrices: any;
  showModal: boolean = false; 
  showConfirmModal: boolean = false; 
  userIdToDelete: number | null = null; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data.users;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  confirmDeleteUser(id: number): void {
    this.userIdToDelete = id; 
    this.showConfirmModal = true; 
  }

  deleteUser(): void {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete).subscribe(
        () => {
          this.getUsers();
          this.showSuccessModal();
          this.userIdToDelete = null;
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
      this.showConfirmModal = false;
    }
  }

  cancelDelete(): void {
    this.userIdToDelete = null;
    this.showConfirmModal = false;
  }

  showSuccessModal(): void {
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
    }, 3000);
  }

  mostrarCryptoPrices(): void {
    this.userService.getCryptoPrices().subscribe(
      (data) => {
        this.cryptoPrices = data;
      },
      (error) => {
        console.error('Error al obtener precios de criptomonedas:', error);
      }
    );
  }
}
