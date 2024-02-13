import { Component } from '@angular/core';
import { GithubService } from '../github.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  username: string = ''; // Initialize username
  profile: any; // Define profile property
  repositories: any[] = []; // Initialize repositories property
  isLoading: boolean = false;
  currentPage: number = 1;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageSize: number = 10;

  constructor(private githubService: GithubService) { }

  searchRepositories(): void {
    if (!this.username) {
      console.error('Username is empty or undefined');
      return;
    }

    // Reset repositories and pagination settings
    this.repositories = [];
    this.currentPage = 1;

    this.isLoading = true;

    // Call the GitHub service method to fetch profile
    this.githubService.getProfile(this.username).subscribe(
      (profile) => {
        this.profile = profile;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching profile:', error);
        this.isLoading = false;
      }
    );

    // Call the GitHub service method to fetch repositories
    this.loadRepositories();
  }

  loadRepositories(): void {
    this.githubService.getRepositories(this.username).subscribe(
      (repositories) => {
        this.repositories = repositories;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching repositories:', error);
        this.isLoading = false;
      }
    );
  }
  

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRepositories();
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.loadRepositories();
  }
}
