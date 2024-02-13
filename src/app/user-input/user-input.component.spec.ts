// user-input.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInputComponent } from './user-input.component';
import { GithubService } from '../github.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInputComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ GithubService ] // You might need to provide the service if not already provided at AppModule level
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchRepositories and loadRepositories methods when form is submitted', () => {
    spyOn(component, 'searchRepositories').and.callThrough();
    spyOn(component, 'loadRepositories').and.callThrough();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.searchRepositories).toHaveBeenCalled();
    expect(component.loadRepositories).toHaveBeenCalled();
  });

  it('should fetch profile when searchRepositories is called', () => {
    const profile = { login: 'testuser', avatar_url: 'https://example.com/avatar' };
    spyOn(githubService, 'getProfile').and.returnValue(of(profile));

    component.username = 'testuser';
    component.searchRepositories();

    expect(githubService.getProfile).toHaveBeenCalledWith('testuser');
    expect(component.profile).toEqual(profile);
  });

  // In user-input.component.spec.ts
it('should fetch repositories when loadRepositories is called', () => {
  const repositories = [{ name: 'repo1' }, { name: 'repo2' }];
  spyOn(githubService, 'getRepositories').and.returnValue(of(repositories));

  component.username = 'testuser';
  component.loadRepositories();

  expect(githubService.getRepositories).toHaveBeenCalledWith('testuser'); // Adjust this expectation according to your method signature
  expect(component.repositories).toEqual(repositories);
});


 
});
