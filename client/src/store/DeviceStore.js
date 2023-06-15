import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    _types = [];
    _brands = [];
    _devices = [];
    _selectedType = {};
    _selectedBrand = {};
    _page = 1;
    _totalCount = 0;
    _limit = 6;
    _basketDevices = [];

    constructor() {
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setDevices(devices) {
        this._devices = devices;
    }

    setSelectedType(type) {
        this.setPage(1);
        this._selectedType = type;
    }

    setSelectedBrand(brand) {
        this.setPage(1);
        this._selectedBrand = brand;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    get types() {
        return this._types;
    }

    get brands() {
        return this._brands;
    }

    get devices() {
        return this._devices;
    }

    get selectedType() {
        return this._selectedType;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    get totalCount() {
        return this._totalCount;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }

    sortDevices(sortType) {
        switch (sortType) {
            case "newest":
                this._devices = this._devices.sort((a, b) => a.id - b.id);
                break;
            case "rating":
                this._devices = this._devices.sort((a, b) => b.rating - a.rating);
                break;
            case "price_asc":
                this._devices = this._devices.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                this._devices = this._devices.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
    }

    get sortedDevices() {
        return this._devices;
    }

    get basketDevices() {
        return this._basketDevices;
    }
}
