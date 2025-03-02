import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { HeaderComponent } from './components/header/header.component';
import { BoardComponent } from './components/board/board.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatRippleModule,
    HeaderComponent,
    BoardComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <main
      class="main"
      matRipple
      [matRippleRadius]="14"
      [matRippleColor]="'#fff'"
    >
      <app-header></app-header>
      <app-board></app-board>
    </main>

    <router-outlet />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TaskBoard';
}
