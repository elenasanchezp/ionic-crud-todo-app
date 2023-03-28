import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map} from 'rxjs/operators';
import { ITask } from '../models/task.interface';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksCollection: AngularFirestoreCollection<ITask> | void; 
  private tasks: Observable<ITask[]> | void; 

  constructor(db: AngularFirestore) {
    this.tasksCollection = db.collection<ITask>('Tasks'); 
    this.tasks = this.tasksCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map (a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { ...data, id };
        });
      }
    ));
   }


   getTasks(){
    return this.tasks;
   }

   getTask(id:string){
    return this.tasksCollection?.doc<ITask>(id).valueChanges();
   }

   addTask(task: ITask){
    return this.tasksCollection?.add(task);
   }

   updateTask(task: ITask, id: string){
    return this.tasksCollection?.doc(id).update(task);
   }

   removeTask(id: string){
    return this.tasksCollection?.doc(id).delete();
   }
}
