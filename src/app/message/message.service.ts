import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
    messages: string[] = [];

    // Adding message

    add(message: string) {
        this.clear();
        this.messages.push(message);
    }

    // Clearing messages

    clear() {
        this.messages = [];
    }
}