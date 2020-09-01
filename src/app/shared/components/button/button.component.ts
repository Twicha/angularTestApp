import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {



  @Input() content: string = '';
  @Input() type: string = 'button';
  @Input() path: string;
  @Input() disabled: boolean;
  @Input() asA: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
