// section отвечает за отрисовку эл-в на странице
// у Section нет своей разметки, он получает ее через ф-цию колбек и вставляет ее в контейнер


export default class Section {
    constructor({renderer}, selectorPopup){
      // this._initialArray = items; //массив карточек
      this._renderer = renderer; //функция, отвечающая за создание и отрисовку отдельного эл-та на странице
      this._container = document.querySelector(selectorPopup); //контейнер куда добавлять создан.эл-ты
    }
    // пуб.мет. к-рый отвеч за отрисовку всех эл-в.
    renderItems(items){
      items.forEach(item => this._renderer(item)//вызываем renderer(отвечает за отрисовку каждого отдельного эл-та), передав item
      );
    }
    
    // публ.метод к-рый принимает ДОМ-элемент и добавляет его в контейнер
    addItem(element){
      this._container.prepend(element);

    }
}