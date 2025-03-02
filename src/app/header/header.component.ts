import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  template: `
    <div class="header-container">
      <div class="header-title">TaskBoard</div>
      <div class="header-buttons">
        <button mat-button [matMenuTriggerFor]="beforeMenu">Settings</button>
        <mat-menu #beforeMenu="matMenu" xPosition="before">
          <button mat-menu-item>Dark Mode</button>
        </mat-menu>
        <button mat-button [matMenuTriggerFor]="afterMenu">Info</button>
        <mat-menu #afterMenu="matMenu" xPosition="after">
          <button mat-menu-item>Dev: BrunoMagno</button>
          <button mat-menu-item>GitHub</button>
        </mat-menu>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
  imports: [MatButtonModule, MatMenuModule],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
}
