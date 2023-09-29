#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var commander_1 = require("commander");
var inquirer_1 = require("inquirer");
var program = new commander_1.Command();
program
    .name('deploy')
    .version('0.0.1')
    .option('-c, --config <path>', 'set config path', './deploy.conf');
program
    .command('setup [env]')
    .description('run setup commands for all envs')
    .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
    .action(function (env, options) {
    env = env || 'all';
    console.log('read config from %s', program.opts().config);
    console.log('setup for %s env(s) with %s mode', env, options.setup_mode);
});
program
    .command('exec <script>')
    .alias('ex')
    .description('execute the given remote cmd')
    .option('-e, --exec_mode <mode>', 'Which exec mode to use', 'fast')
    .action(function (script, options) {
    console.log('read config from %s', program.opts().config);
    console.log('exec "%s" using %s mode and config %s', script, options.exec_mode, program.opts().config);
}).addHelpText('after', "\nExamples:\n  $ deploy exec sequential\n  $ deploy exec async");
program
    .action(function (options, command) { return __awaiter(void 0, void 0, void 0, function () {
    var exited, replCommand, answers, argv, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exited = false;
                replCommand = new commander_1.Command("".concat(command.name()))
                    .addHelpText("afterAll", "\nREPL mode: skip delimiter `".concat(command.name(), ">` and call commands directly."))
                    .usage("[command]");
                replCommand
                    .command("exit")
                    .description("Exit the program.")
                    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("Exiting...");
                        exited = true;
                        return [2 /*return*/];
                    });
                }); });
                _a.label = 1;
            case 1:
                if (!!exited) return [3 /*break*/, 7];
                return [4 /*yield*/, inquirer_1["default"].prompt([
                        {
                            type: "input",
                            name: "cmd",
                            message: "".concat(command.name, ">"),
                            prefix: ""
                        },
                    ])];
            case 2:
                answers = _a.sent();
                argv = answers.cmd.trim().split(" ");
                if (argv[0] === "") {
                    return [3 /*break*/, 1];
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, replCommand.parseAsync(argv, { from: "user" })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                if ((e_1 === null || e_1 === void 0 ? void 0 : e_1.name) !== "CommanderError") {
                    console.log(e_1);
                }
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); });
program.parse();
