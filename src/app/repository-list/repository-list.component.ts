import { Component } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html', // Correct template file path
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  constructor(private githubService: GithubService) { }

  fetchRepositories(username: string) {
    this.githubService.getRepositories(username).subscribe(
      (repositories: any[]) => { // Explicitly define the type of 'repositories' parameter
        // Handle the fetched repositories here
        console.log(repositories);
      },
      (error: any) => {
        // Handle error if any
        console.error('Error fetching repositories:', error);
      }
    );
  }
}
