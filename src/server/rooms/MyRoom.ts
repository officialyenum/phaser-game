// Import demo room handlers
import { Room, Client } from 'colyseus';
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room {
    onCreate(options: any): void | Promise<any> {
        this.setState(new MyRoomState())
        this.onMessage("type",(client, message) => {

        })
    }

    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        
    }

    onLeave(client: Client, consented?: boolean | undefined): void | Promise<any> {
        
    }

    onDispose(): void | Promise<any> {
        
    }
}