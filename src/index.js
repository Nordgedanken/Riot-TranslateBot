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
        if (message.startsWith("!help")){
            console.log(
                "\r\n(%s) %s :: %s\r\n", room.name, event.getSender(), message
            );
            commands.help(room);
        } else if (message.startsWith("!languages")){
            console.log(
                "\r\n(%s) %s :: %s\r\n", room.name, event.getSender(), message
            );
            commands.languages(room);
        } else if (message.startsWith("!projects")){
            console.log(
                "\r\n(%s) %s :: %s\r\n", room.name, event.getSender(), message
            );
            commands.projects(room);
        } else if (message.startsWith("!status")){
            const message_split = message.split(" ");
            let lang;
            if (message_split.length > 1){
                lang = message_split[1];
            }
            console.log(
                "\r\n(%s) %s :: %s\r\n", room.name, event.getSender(), message
            );
            commands.status(room, lang);
        }
    });
    client.startClient();
});