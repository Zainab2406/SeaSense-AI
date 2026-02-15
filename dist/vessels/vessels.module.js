"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VesselsModule = void 0;
const common_1 = require("@nestjs/common");
const vessels_service_1 = require("./vessels.service");
const vessels_controller_1 = require("./vessels.controller");
let VesselsModule = class VesselsModule {
};
exports.VesselsModule = VesselsModule;
exports.VesselsModule = VesselsModule = __decorate([
    (0, common_1.Module)({
        providers: [vessels_service_1.VesselsService],
        controllers: [vessels_controller_1.VesselsController]
    })
], VesselsModule);
//# sourceMappingURL=vessels.module.js.map