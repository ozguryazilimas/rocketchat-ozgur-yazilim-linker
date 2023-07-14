"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMessage = void 0;
const Settings_1 = require("../settings/Settings");
const IssueIterator_1 = require("./IssueIterator");
class TextMessage {
    constructor(settings, text) {
        this.text = text;
        this.settings = settings;
    }
    async hasIssues() {
        return !this.issueIterator().next().done;
    }
    async linkIssues() {
        let text = this.text;
        let offset = 0;
        for (const issue of this.issueIterator()) {
            const lengthBeforeReplacing = text.length;
            const issueIndex = issue.index;
            const issueText = issue.text;
            text = textBefore(issueIndex)
                + this.markdownIssueLink(issueText)
                + textAfter(issueIndex + issueText.length);
            offset += text.length - lengthBeforeReplacing;
        }
        return text;
        function textBefore(index) {
            return text.substr(0, offset + index);
        }
        function textAfter(index) {
            return text.substr(offset + index);
        }
    }
    issueIterator() {
        return new IssueIterator_1.IssueIterator(this.text, this.buildIssuePattern(), Settings_1.Settings.EXCLUDE_PATTERNS, this.settings.maxSearchAttempts);
    }
    markdownIssueLink(issueText) {
        const UrlIssueText = issueText.substring(1)
        return `[${issueText}](${this.settings.baseUrl}/${UrlIssueText})`;
    }
    buildIssuePattern() {
        return Settings_1.Settings.POSITIVE_LOOKBEHIND + this.settings.issuePattern + Settings_1.Settings.POSITIVE_LOOKAHEAD;
    }
}
exports.TextMessage = TextMessage;
