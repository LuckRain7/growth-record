import Component from "./Component";
import { ITodoData } from "../../../typings";

export interface IListOptions {
  wrapperEl: HTMLElement;
  todoData: ITodoData[];
}

class List extends Component {
  private wrapperEl: HTMLElement;
  private static todoData: ITodoData[]; // 静态属性

  constructor(options: IListOptions) {
    super();
    this.wrapperEl = options.wrapperEl;
    List.todoData = options.todoData;
  }

  public render() {
    this.wrapperEl.innerHTML += Component.listView(List.todoData);
  }

  public bindEvent(){
    const oTodoList: HTMLElement = document.querySelector('.todo-list')
    oTodoList.addEventListener('click', this.handleListClick.bind(this), false)

  }

  private handleListClick(e: MouseEvent){
    const tar = e.target as HTMLElement; // 类型断言 告诉ts 这是HTMLElement类型
    const tagName = tar.tagName.toLowerCase();
    const oTodoItems: HTMLCollection = document.getElementsByClassName('todo-item');

    if(tagName === 'input' || tagName === 'button'){
      const id: number = parseInt(tar.dataset.id);
      switch(tagName){
        case 'input':
            this._handleCheckBoxClick(id, oTodoItems)
            break;
        case 'button':
            this._handleButtonClick(id, oTodoItems)
            break;
        default:
            break;
      }
    }

  }

  private _handleCheckBoxClick(id: number, oTodoItems: HTMLCollection) {

    List.todoData = List.todoData.map((todo: ITodoData, index: number) => {
      if(todo.id === id){
        console.log(todo.id,id);
        todo.completed = !todo.completed;
        console.log(index);
        console.log(oTodoItems[index]);

        oTodoItems[index].querySelector('span').style.textDecoration = todo.completed ? 'line-through' : '';
      }
      return todo
    })
  }

  private _handleButtonClick(id: number, oTodoItems: HTMLCollection) {

    List.todoData = List.todoData.filter((todo: ITodoData, index: number) => {
      if(todo.id !== id){
        return todo
      }else{
          oTodoItems[index].remove();
      }
    })
  }

  // 静态方法
  public static addItem(val: string) {
    const oTodoList =  document.querySelector('.todo-list')

    const _item: ITodoData = {
        id: new Date().getTime(),
        content: val,
        completed: false
    }

    List.todoData.push(_item)
    
    if(List.todoData.length === 1){
        oTodoList.innerHTML = ''
    }
    oTodoList.innerHTML += Component.todoView(_item);
  }


}

export default List;
