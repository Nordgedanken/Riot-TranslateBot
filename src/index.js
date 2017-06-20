import login from './login';
import CommandHandler from './commands';

const mx = new login;
mx.getClient().then(client => {
    const ServerStart = new Date;
    const commands = new CommandHandler(client);
    client.on("Room.timeline", (event, room, toStartOfTimeline) => {
        if ((ServerStart - event.getDate()) > 0) return;
        if (toStartOfTimeline) return;
        if (event.getType() !== "m.room.message") return;
        if (event.getContent().msgtype !== "m.text") return;
        if (event.getSender() === "@MTRNord:matrix.org") return;
        if (room.roomId !== "!EDuQpgunAOTYiUKIcU:matrix.org" && room.roomId !== "!OYyXUbcTKVsDBUniNn:matrix.eclabs.de") return;
        const message = "" + event.getContent().body;
        /*console.log(
            // the room name will update with m.room.name events automatically
            "(%s) %s :: %s", room.name, event.getSender(), message
        );
        client.sendHtmlNotice(room.roomId, message, message).catch(error => console.log(error));*/
        if (message.startsWith("!help")){
            console.log(
                "(%s) %s :: %s", room.name, event.getSender(), message
            );
            commands.help(room);
        } else if (message.startsWith("!languages")){
            console.log(
                "(%s) %s :: %s", room.name, event.getSender(), message
            );
            commands.languages(room);
        }
    });
    client.startClient();
});