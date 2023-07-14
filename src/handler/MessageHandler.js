"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandler = void 0;
const TextMessage_1 = require("./TextMessage");
class MessageHandler {
    constructor(settings) {
        this.settings = settings;
    }
    async checkPreMessageModify(message, read, http) {
        if (message.text && await this.hasIssues(message.text)) {
            return true;
        }
        if (this.settings.isModifyAttachments && message.attachments) {
            for (const attachment of message.attachments) {
                if (attachment.text && await this.hasIssues(attachment.text)) {
                    return true;
                }
            }
        }
        //return false;
        this.secondCheckPreMessageModify(message.text, read.text, http.text)
    }
    async secondCheckPreMessageModify(message, read, http) {
        if (message.text && await this.secondHasIssues(message.text)) {
            return true;
        }
        if (this.settings.isModifyAttachments && message.attachments) {
            for (const attachment of message.attachments) {
                if (attachment.text && await this.secondHasIssues(attachment.text)) {
                    return true;
                }
            }
        }
        return false;
    }
    async executePreMessageModify(message, builder, read, http, persistence) {
        if (message.text) {
            await this.modifyText(message.text).then((messageText) => builder.setText(messageText));
        }
        if (this.settings.isModifyAttachments && message.attachments) {
            await this.modifyAttachments(message.attachments).then((attachments) => builder.setAttachments(attachments));
        }
        return builder.getMessage();
    }
    async secondExecutePreMessageModify(message, builder, read, http, persistence) {
        if (message.text) {
            await this.secondModifyText(message.text).then((messageText) => builder.setText(messageText));
        }
        if (this.settings.isModifyAttachments && message.attachments) {
            await this.secondModifyAttachments(message.attachments).then((attachments) => builder.setAttachments(attachments));
        }
        return builder.getMessage();
    }
    async hasIssues(text) {
        return this.textMessage(text).hasIssues();
    }
    async modifyText(text) {
        return this.textMessage(text).linkIssues();
    }
    async secondHasIssues(text) {
        return this.textMessage(text).secondHasIssues();
    }
    async secondModifyText(text) {
        return this.textMessage(text).secondLinkIssues();
    }
    async modifyAttachments(attachments) {
        return Promise.all(attachments.map((attachment) => this.modifyAttachment(attachment)));
    }
    async modifyAttachment(attachment) {
        if (attachment.text) {
            const newAttachment = Object.assign(Object.assign({}, attachment), { text: await this.modifyText(attachment.text) });
            return newAttachment;
        }
        return attachment;
    }
    async secondModifyAttachments(attachments) {
        return Promise.all(attachments.map((attachment) => this.secondModifyAttachment(attachment)));
    }
    async secondModifyAttachment(attachment) {
        if (attachment.text) {
            const newAttachment = Object.assign(Object.assign({}, attachment), { text: await this.secondModifyText(attachment.text) });
            return newAttachment;
        }
        return attachment;
    }
    textMessage(text) {
        return new TextMessage_1.TextMessage(this.settings, text);
    }
}
exports.MessageHandler = MessageHandler;
