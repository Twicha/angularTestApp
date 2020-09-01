import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UsersSearchComponent implements OnInit {

  @Input() search: Function;
  @Input() discharge: Function;
  @Input() clear: Function;
  @Input() searchValue: string = '';
  @Output() searchChange = new EventEmitter<string>();
  onSearchChange(model: string){

    if (!model.trim()) {
      this.searchValue = '';
    }

    this.searchValue = model;
    this.searchChange.emit(model);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
