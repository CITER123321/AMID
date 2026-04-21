export interface RadioMessage {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: number;
}
export class RadioSystem {
  private messages: RadioMessage[] = [];
  public sendMessage(from: string, to: string, text: string): RadioMessage {
    const message: RadioMessage = {
      id: Math.random().toString(36).substr(2, 9),
      from, to, text, timestamp: Date.now(),
    };
    this.messages.push(message);
    return message;
  }
}
