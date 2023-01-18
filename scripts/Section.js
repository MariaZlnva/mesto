// section отвечает за отрисовку эл-в на странице
// у Section нет своей разметки, он получает ее через ф-цию колбек и вставляет ее в контейнер


export default class Section {
    constructor({items, renderer}, selectorPopup){
      this._initialArray = items; //массив карточек
      this._renderer = renderer; //функция, отвечающая за создание и отрисовку данных на стран.
      this._container = document.querySelector(selectorPopup); //контейнер куда добавлять создан.эл-ты
    }
    // пуб.мет. к-рый отвеч за отрисовку всех эл-в.
    renderItems(){
      this._initialArray.forEach(item => this._renderer(item)//вызываем renderer, передав item
      );
    }
    // публ.метод к-рый принимает ДОМ-элемент и добавляет его в контейнер
    addItem(element){
      this._container.prepend(element);

    }
}