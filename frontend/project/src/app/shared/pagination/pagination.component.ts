import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() limit: number = 3;
  @Input() total: number = 0;
  @Output() changePageEvent: EventEmitter<number> = new EventEmitter<number>();

  // Pages
  pages: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['total'] || changes['limit']) {
      this.calculatePageCount();
    }
  }

  range(start: number, end: number): number[] {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  changePage(page: number) {
    this.changePageEvent.emit(page);
  }

  calculatePageCount() {
    const pageCount = Math.ceil(this.total / this.limit);
    this.pages = this.range(1, pageCount);
  }
}