"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUtil = void 0;
const core_1 = require("@angular/core");
const _ = __importStar(require("lodash"));
const ObjectUtil_1 = require("app/shared/util/ObjectUtil");
let StorageUtil = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StorageUtil = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            StorageUtil = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        storage;
        constructor(storage) {
            this.storage = storage;
        }
        saveData(data, key) {
            return new Promise((resolve, reject) => {
                let saveObservable;
                if (_.isArray(data)) {
                    saveObservable = this.storage.set(key, ObjectUtil_1.ObjectUtil.classToPlainArray(data));
                }
                else if (_.isObject(data)) {
                    saveObservable = this.storage.set(key, ObjectUtil_1.ObjectUtil.classToPlain(data));
                }
                else {
                    saveObservable = this.storage.set(key, data);
                }
                saveObservable
                    .subscribe(() => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        }
        loadData(key, cls = null) {
            return new Promise((resolve, reject) => {
                this.storage.get(key)
                    .subscribe((value) => {
                    if (_.isArray(value)) {
                        const data = ObjectUtil_1.ObjectUtil.plainToClassArray(cls, value);
                        resolve(data);
                    }
                    else if (_.isObject(value)) {
                        const data = ObjectUtil_1.ObjectUtil.plainToClass(cls, value);
                        resolve(data);
                    }
                    else {
                        resolve(value);
                    }
                }, (error) => {
                    reject(error);
                });
            });
        }
        deleteData(key) {
            return new Promise((resolve, reject) => {
                this.storage.delete(key)
                    .subscribe(() => {
                    resolve();
                }, (error) => {
                    reject(error);
                });
            });
        }
    };
    return StorageUtil = _classThis;
})();
exports.StorageUtil = StorageUtil;
//# sourceMappingURL=StorageUtil.js.map