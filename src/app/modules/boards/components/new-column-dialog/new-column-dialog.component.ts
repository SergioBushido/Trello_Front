import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-column-dialog',
  templateUrl: './new-column-dialog.component.html',
})
export class NewColumnDialogComponent {
  columnTitle: string = '';

  @Output() confirm = new EventEmitter<string>();

  emitTitle() {
    if (this.columnTitle.trim()) {
      this.confirm.emit(this.columnTitle);
      this.columnTitle = ''; // Optionally reset the title here or after confirmation in parent
    } else {
      alert('The title cannot be empty.'); // Handle validation as needed
    }
  }
}