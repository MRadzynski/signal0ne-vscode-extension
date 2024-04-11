"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const environment_1 = require("environment/environment");
let ConfigurationService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConfigurationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ConfigurationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        httpClient;
        toastrService;
        translateService;
        currentAgentState$ = new rxjs_1.BehaviorSubject(false);
        isCurrentAgentStateInitialized = false;
        isAgentInitialized = false;
        get currentAgentState() {
            return this.currentAgentState$.value;
        }
        set currentAgentState(value) {
            this.currentAgentState$.next(value);
        }
        constructor(httpClient, toastrService, translateService) {
            this.httpClient = httpClient;
            this.toastrService = toastrService;
            this.translateService = translateService;
        }
        getCurrentAgentState() {
            this.httpClient.get(`${environment_1.environment.agentApiUrl}/control/state`).subscribe((agentState) => {
                this.currentAgentState = agentState.state;
                this.isCurrentAgentStateInitialized = true;
            });
        }
        setAgentState(agentStatePayload) {
            this.httpClient.post(`${environment_1.environment.agentApiUrl}/control/state`, agentStatePayload).subscribe(() => {
                this.currentAgentState = agentStatePayload.state;
                if (this.isAgentInitialized) {
                    if (this.currentAgentState) {
                        this.toastrService.success(this.translateService.instant('CONFIGURATION.AGENT_STATE_ACTIVATED'));
                    }
                    else {
                        this.toastrService.success(this.translateService.instant('CONFIGURATION.AGENT_STATE_DEACTIVATED'));
                    }
                }
                this.isAgentInitialized = true;
            });
        }
        setAgentAuthData(agentAuthData) {
            this.httpClient.post(`${environment_1.environment.agentApiUrl}/control/auth_data`, agentAuthData).subscribe(() => {
                this.toastrService.success(this.translateService.instant('CONFIGURATION.AGENT_AUTH_DATA_UPDATED'));
            });
        }
        markUserActivity() {
            this.httpClient.get(`${environment_1.environment.apiUrl}/user/last-activity`).subscribe();
        }
    };
    return ConfigurationService = _classThis;
})();
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map