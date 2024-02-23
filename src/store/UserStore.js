import {makeAutoObservable} from "mobx"

export default class UserStore{

    constructor(){
        this._isAuth=false;
        this._user={};
        makeAutoObservable(this)//Данный метод следит за изменениями объета класса  UserStore
    }

    setIsAuth(bool){
        this._isAuth=bool;
    }//Action для изменения флага isAuth

    setUser(user){
        this._user=user;
    }//Action для изменения объекта пользователя

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }
}

