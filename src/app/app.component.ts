import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import { HeaderComponent } from "./header/header.component";
import { BoardComponent } from "./board/board.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatRippleModule,HeaderComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TaskBoard';
}
