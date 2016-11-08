export class NavParams {
    constructor(data = {}) {
        this.data = data;
    }
    get(param) {
        return this.data[param];
    }
}
//# sourceMappingURL=nav-params.js.map