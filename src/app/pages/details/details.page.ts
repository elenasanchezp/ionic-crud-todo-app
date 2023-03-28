import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../models/task.interface';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  @Input()
  task : ITask = {
    id: '', 
    name: '', 
    priority: 0
  }

  taskId = null; 

  constructor(private route: ActivatedRoute,
            private navController: NavController, 
            private service: TasksService, 
            private loadingController: LoadingController) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];

    if(this.taskId) {
      this.loadTask()
    }
  }

  async loadTask(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    await loading.present(); 
    console.log(this.taskId);

    this.service.getTask(this.taskId || '')?.subscribe((res: any) => {
      loading.dismiss();      
      this.task = res;
    });
  }

  async saveTask(){
    const loading = await this.loadingController.create({
      message: 'Saving...'
    });

    await loading.present(); 

    if(this.taskId) {
      // update the current task
      this.service.updateTask(this.task, this.taskId)?.then(() => {
        loading.dismiss();      
        this.navController.navigateForward('/');
      });

    } else {
      // add new task
      this.service.addTask(this.task)?.then(() => {
        loading.dismiss();      
        this.navController.navigateForward('/');
      });
      
    }
  }

  onRemove(){
    console.log(this.taskId);
    this.service.removeTask(this.taskId || '{}')?.then(() => {
      this.navController.navigateForward('/');
    });
  }
}
