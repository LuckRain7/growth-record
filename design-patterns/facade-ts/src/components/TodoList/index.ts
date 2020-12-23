import { ITodoData } from "../../typings/index";

import Input, { IInputOptions } from "./Subs/Input";
import List, { IListOptions } from "./Subs/List";

class TodoList {
  private el: HTMLElement;
  private todoData: ITodoData[];
  private input: Input;
  private list: List;
  private todoWrapper: HTMLElement;

  constructor(el: HTMLElement, todoData: ITodoData[]) {
    this.el = el;
    this.todoData = todoData;
    this.todoWrapper = document.createElement("div");
  }

  public init() {
    this.createComponents();
    this.render();
    this.bingEvent();
  }

  // 初始化 input list 组件函数
  private createComponents() {
    console.log("createComponents");
    this.input = new Input(<IInputOptions>{
      wrapperEl: this.todoWrapper,
      placeholderText: "请输入",
      buttonText: "增加",
    });
    this.list = new List(<IListOptions>{
      todoData: this.todoData,
      wrapperEl: this.todoWrapper,
    });
  }

  // 渲染函数
  private render() {
    this.input.render();
    this.list.render();
    this.el.appendChild(this.todoWrapper);
    console.log("render");
  }
  // 数据绑定函数
  private bingEvent() {
    console.log("bingEvent");
    this.input.bindEvent();
    this.list.bindEvent();
  }
}

export default TodoList;
