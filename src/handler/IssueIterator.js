"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueIterator = void 0;
class IssueIterator {
    constructor(text, issuePattern, excludePatterns = '', maxSearchAttempts = 25) {
        this.searchAttemptsCount = 0;
        this.text = text;
        const pattern = (excludePatterns && excludePatterns.length > 0 ? excludePatterns + '|' : '')
            + `(${issuePattern})`;
        this.issueMatcher = new RegExp(pattern, 'g');
        this.maxSearchAttempts = maxSearchAttempts;
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        while (this.searchAttemptsCount++ < this.maxSearchAttempts) {
            const matchResult = this.issueMatcher.exec(this.text);
            if (!matchResult) {
                break;
            }
            const issueSubgroup = matchResult[1];
            if (issueSubgroup) {
                return { value: { text: issueSubgroup, index: matchResult.index }, done: false };
            }
        }
        return { value: undefined, done: true };
    }
}
exports.IssueIterator = IssueIterator;
