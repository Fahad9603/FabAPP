import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../service/core.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-blank',
  standalone: true,  
  templateUrl: './blank.component.html',
  styleUrls: [],
  imports: [RouterOutlet, MaterialModule, CommonModule],
})
export class BlankComponent {
  private htmlElement!: HTMLHtmlElement;

  constructor(public settings: CoreService) {
    this.htmlElement = document.querySelector('html')!;
  }

  get options() {
    return this.settings.getOptions(); 
  }
}