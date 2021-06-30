import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'assemblyline',
  templateUrl: './assemblyline.component.html',
  styleUrls: ['./assemblyline.component.scss']
})
export class AssemblyLineComponent implements OnInit {
  @Input() stages: string[];
  items = {};
  stageLabels: [];

  ngOnInit(): void {
    this.stages.forEach((stage: string) => {
      this.items[stage] = [];
    });
  }

  readTasks(event: any): void {
    if (event.key === 'Enter') {
      const firstStage = this.stages[0];
      if (event.target.value) {
        this.items[firstStage].push(event.target.value);
        event.target.value = '';
      }
    }
  }

  onRightClick(event: any, item: string, stage: string, stageIndex: number, itemIndex: number): void {
    if (stageIndex === 0) {
      this.items[stage].splice(itemIndex, 1);
    } else {
      const temp = this.stages[stageIndex - 1];
      this.items[temp].push(item);
      this.items[stage].splice(itemIndex, 1);
    }
    event.preventDefault();
  }

  onLeftClick(item: string, stage: string, stageIndex: number, itemIndex: number): void {
    if (stageIndex === 3) {
      this.items[stage].splice(itemIndex, 1);
    } else {
      const temp = this.stages[stageIndex + 1];
      this.items[temp].push(item);
      this.items[stage].splice(itemIndex, 1);
    }
  }
}
