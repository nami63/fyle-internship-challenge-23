import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { GithubService } from './github.service';
import { UserInputComponent } from './user-input/user-input.component';

@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule // Add FormsModule to the imports array
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
