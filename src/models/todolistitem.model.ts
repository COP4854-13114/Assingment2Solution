export class TodoListItem {
  id: number=0;
  task: string='';
  completed: boolean=false;
  created_at: Date=new Date();
  updated_at: Date=new Date();
  list_id: number=0;
}