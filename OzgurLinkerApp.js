"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YouTrackLinkerApp = void 0;
const App_1 = require("@rocket.chat/apps-engine/definition/App");
const MessageHandler_1 = require("./src/handler/MessageHandler");
const Settings_1 = require("./src/settings/Settings");
class YouTrackLinkerApp extends App_1.App {
    constructor(info, logger) {
        super(info, logger);
        this.settings = new Settings_1.Settings();
        this.messageHandler = new MessageHandler_1.MessageHandler(this.settings);
    }
    async checkPreMessageSentModify(message, read, http) {
        return this.messageHandler.checkPreMessageModify(message, read, http);
    }
    async checkPreMessageUpdatedModify(message, read, http) {
        return this.messageHandler.checkPreMessageModify(message, read, http);
    }
    async executePreMessageSentModify(message, builder, read, http, persistence) {
        return this.messageHandler.executePreMessageModify(message, builder, read, http, persistence);
    }
    async executePreMessageUpdatedModify(message, builder, read, http, persistence) {
        return this.messageHandler.executePreMessageModify(message, builder, read, http, persistence);
    }
    async onEnable(environmentRead, configModify) {
        await this.settings.setFrom(environmentRead.getSettings());
        return true;
    }
    async onSettingUpdated(setting, configModify, read, http) {
        this.settings.onUpdate(setting);
    }
    async extendConfiguration(configuration, environmentRead) {
        await this.settings.init(configuration.settings);
    }
}
exports.YouTrackLinkerApp = YouTrackLinkerApp;
