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
    const firstStage = this.stages[0];
    if (event.target && event.target.value) {
      this.items[firstStage].push(event.target.value);
    }
  }

  onRightClick(event: any, item: string, stage: string, stageIndex: number, itemIndex: number): void {
    if (stageIndex === 0) {
      this.items[stage].splice(itemIndex, 1);
    } else {
      const prevStage = this.stages[stageIndex - 1];
      this.items[prevStage].push(item);
      this.items[stage].splice(itemIndex, 1);
    }
    event.preventDefault();
  }

  onLeftClick(item: string, stage: string, stageIndex: number, itemIndex: number): void {
    if (stageIndex === 3) {
      this.items[stage].splice(itemIndex, 1);
    } else {
      const nextStage = this.stages[stageIndex + 1];
      this.items[nextStage].push(item);
      this.items[stage].splice(itemIndex, 1);
    }
  }
}
