"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const settings_1 = require("@rocket.chat/apps-engine/definition/settings");
class Settings {
    get baseUrl() {
        return this._baseUrl;
    }
    get issuePattern() {
        return this._issuePattern;
    }
    get maxSearchAttempts() {
        return this._maxSearchAttempts;
    }
    get isModifyAttachments() {
        return this._isModifyAttachments;
    }
    get secondBaseUrl() {
        return this._secondBaseUrl;
    }
    get secondIssuePattern() {
        return this._secondIssuePattern;
    }
    get secondMaxSearchAttempts() {
        return this._secondMaxSearchAttempts;
    }
    get secondIsModifyAttachments() {
        return this._secondIsModifyAttachments;
    }
    async init(settings) {
        await settings.provideSetting({
            id: Settings.BASE_URL_SETTING_ID,
            type: settings_1.SettingType.STRING,
            packageValue: Settings.DEFAULT_BASE_URL,
            required: true,
            public: true,
            i18nLabel: 'OzgurYazilim_Base_URL',
            i18nDescription: 'OzgurYazilim_Base_URL_Description',
        });
        await settings.provideSetting({
            id: Settings.ISSUE_PATTERN_SETTING_ID,
            type: settings_1.SettingType.STRING,
            packageValue: Settings.DEFAULT_ISSUE_PATTERN,
            required: true,
            public: true,
            i18nLabel: 'Issue_Pattern',
            i18nDescription: 'Issue_Pattern_Description',
        });
        await settings.provideSetting({
            id: Settings.MAX_SEARCH_ATTEMPTS_ID,
            type: settings_1.SettingType.NUMBER,
            packageValue: Settings.DEFAULT_MAX_SEARCH_ATTEMPTS,
            required: true,
            public: true,
            i18nLabel: 'Max_Search_Attempts',
            i18nDescription: 'Max_Search_Attempts_Description',
        });
        await settings.provideSetting({
            id: Settings.MODIFY_ATTACHMENTS_ID,
            type: settings_1.SettingType.BOOLEAN,
            packageValue: Settings.DEFAULT_MODIFY_ATTACHMENTS,
            required: true,
            public: true,
            i18nLabel: 'Modify_Attachments',
            i18nDescription: 'Modify_Attachments_Description',
        });
        await settings.provideSetting({
            id: Settings.BASE_URL_SETTING_SECOND_ID,
            type: settings_1.SettingType.STRING,
            packageValue: Settings.DEFAULT_BASE_URL,
            required: true,
            public: true,
            i18nLabel: 'OzgurYazilim_Base_URL',
            i18nDescription: 'OzgurYazilim_Base_URL_Description',
        });
        await settings.provideSetting({
            id: Settings.ISSUE_PATTERN_SETTING_SECOND_ID,
            type: settings_1.SettingType.STRING,
            packageValue: Settings.DEFAULT_ISSUE_PATTERN,
            required: true,
            public: true,
            i18nLabel: 'Issue_Pattern',
            i18nDescription: 'Issue_Pattern_Description',
        });
        await settings.provideSetting({
            id: Settings.MAX_SEARCH_ATTEMPTS_SECOND_ID,
            type: settings_1.SettingType.NUMBER,
            packageValue: Settings.DEFAULT_MAX_SEARCH_ATTEMPTS,
            required: true,
            public: true,
            i18nLabel: 'Max_Search_Attempts',
            i18nDescription: 'Max_Search_Attempts_Description',
        });
        await settings.provideSetting({
            id: Settings.MODIFY_ATTACHMENTS_SECOND_ID,
            type: settings_1.SettingType.BOOLEAN,
            packageValue: Settings.DEFAULT_MODIFY_ATTACHMENTS,
            required: true,
            public: true,
            i18nLabel: 'Modify_Attachments',
            i18nDescription: 'Modify_Attachments_Description',
        });
    }
    onUpdate(setting) {
        switch (setting.id) {
            case Settings.BASE_URL_SETTING_ID:
                this.extractedBaseUrl(setting.value);
                break;
            case Settings.ISSUE_PATTERN_SETTING_ID:
                this.extractedIssuePattern(setting.value);
                break;
            case Settings.MAX_SEARCH_ATTEMPTS_ID:
                this.extractedMaxSearchAttempts(setting.value);
                break;
            case Settings.MODIFY_ATTACHMENTS_ID:
                this.extractedModifyAttachments(setting.value);
                break;
            case Settings.BASE_URL_SETTING_SECOND_ID:
                this.extractedBaseUrl(setting.value);
                break;
            case Settings.ISSUE_PATTERN_SETTING_SECOND_ID:
                this.extractedIssuePattern(setting.value);
                break;
            case Settings.MAX_SEARCH_ATTEMPTS_SECOND_ID:
                this.extractedMaxSearchAttempts(setting.value);
                break;
            case Settings.MODIFY_ATTACHMENTS_SECOND_ID:
                this.extractedModifyAttachments(setting.value);
                break;
        }
    }
    async setFrom(settings) {
        this.extractedBaseUrl(await settings.getValueById(Settings.BASE_URL_SETTING_ID),await settings.getValueById(Settings.BASE_URL_SETTING_SECOND_ID));
        this.extractedIssuePattern(await settings.getValueById(Settings.ISSUE_PATTERN_SETTING_ID),await settings.getValueById(Settings.BASE_URL_SETTING_SECOND_ID));
        this.extractedMaxSearchAttempts(await settings.getValueById(Settings.MAX_SEARCH_ATTEMPTS_ID),await settings.getValueById(Settings.BASE_URL_SETTING_SECOND_ID));
        this.extractedModifyAttachments(await settings.getValueById(Settings.MODIFY_ATTACHMENTS_ID),await settings.getValueById(Settings.BASE_URL_SETTING_SECOND_ID));
    }
    extractedBaseUrl(value0,value1) {
        this._baseUrl = value0;
        this._secondBaseUrl = value1;
    }
    extractedIssuePattern(value0,value1) {
        this._issuePattern = value0;
        this._secondIssuePattern = value1;
    }
    extractedMaxSearchAttempts(value0,value1) {
        this._maxSearchAttempts = value0;
        this._secondMaxSearchAttempts = value1;
    }
    extractedModifyAttachments(value0,value1) {
        this._isModifyAttachments = value0;
        this._secondIsModifyAttachments = value1;
    }
}
exports.Settings = Settings;
Settings.EXCLUDE_PATTERNS = '\\`\\`\\`[^\\`]+\\`\\`\\`' +
    '|\\~\\~\\~[^\\~]+\\~\\~\\~' +
    '|\\`[^\\`]+\\`' +
    '|[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b[-a-zA-Z0-9()@:%_\\+.~#?&//=]*' +
    '|\\[[^\\[\\]]+\\]\\([^\\(\\)]+\\)';
Settings.POSITIVE_LOOKBEHIND = '(?<=^|[^a-zA-Z0-9])';
Settings.POSITIVE_LOOKAHEAD = '(?=[^a-zA-Z0-9]|$)';
Settings.DEFAULT_BASE_URL = 'https://islergucler.ozguryazilim.com.tr';
Settings.DEFAULT_ISSUE_PATTERN = '[a-zA-Z]+-[0-9]+';
Settings.DEFAULT_MAX_SEARCH_ATTEMPTS = 25;
Settings.DEFAULT_MODIFY_ATTACHMENTS = false;
Settings.BASE_URL_SETTING_ID = 'base-url';
Settings.ISSUE_PATTERN_SETTING_ID = 'issue-pattern';
Settings.MAX_SEARCH_ATTEMPTS_ID = 'max-search-attempts';
Settings.MODIFY_ATTACHMENTS_ID = 'modify-attachments';
Settings.BASE_URL_SETTING_SECOND_ID = 'second-base-url';
Settings.ISSUE_PATTERN_SETTING_SECOND_ID = 'second-issue-pattern';
Settings.MAX_SEARCH_ATTEMPTS_SECOND_ID = 'second-max-search-attempts';
Settings.MODIFY_ATTACHMENTS_SECOND_ID = 'second-modify-attachments';