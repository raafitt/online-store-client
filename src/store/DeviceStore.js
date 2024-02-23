import { makeAutoObservable } from "mobx";


export default class DeviceStore{
    constructor(){
        this._types=[];
        this._brands=[];
        this._devices=[];
        this._basket=[]
        this._oneDevice={info:[]}

        this._selectedType={id:1}
        this._selectedBrand={id:1}
        this._isSelecting=false
        this._idsToDestroy=[]

        const storedBasket = localStorage.getItem('basket');
        if (storedBasket) {
            this._basket = JSON.parse(storedBasket);
        }
    
        makeAutoObservable(this)
        }
    
    pushIdsToDestroy(id){
        this._idsToDestroy.push(id)
    }

    removeIdToDestroy(id){
        const index=this._idsToDestroy.indexOf(id)
        if(index!==-1){
            this._idsToDestroy.splice(index,1)
        }
    }

    vacateIdsToDestroy(){
        this._idsToDestroy=[]
    }

    setIsSelecting(bool){
        this._isSelecting=bool
    }

    setTypes(types){
        this._types=types
    }

    setSelectedType(type){
        this._selectedType=type
    }

    setBrands(brands){
        this._brands=brands
    }

    setSelectedBrand(brand){
        this._selectedBrand=brand
    }

    setDevices(devices){
        this._devices=devices
    }

    setOneDevice(device){
        this._oneDevice=device
    }

    setBasket(devices){
        this._basket=devices
    }

    // Метод для добавления устройства в корзину
    addToBasket(device) {
        this._basket.push(device);

        // Сохранение данных в localStorage
        localStorage.setItem('basket', JSON.stringify(this._basket));
    }

    // Метод для удаления устройства из корзины
    removeFromBasket(deviceId) {
        this._basket = this._basket.filter(item => item.id !== deviceId);

        // Сохранение данных в localStorage
        localStorage.setItem('basket', JSON.stringify(this._basket));
    }

    get oneDevice(){
        return this._oneDevice
    }

    get idsToDestroy(){
        return this._idsToDestroy
    }

    get isSelecting(){
        return this._isSelecting
    }

    get types(){
        return this._types
    }

    get selectedType(){
        return this._selectedType
    }

    get brands(){
        return this._brands
    }

    get selectedBrand(){
        return this._selectedBrand
    }

    get devices(){
        return this._devices
    }

    get basket(){
        return this._basket
    }
}

