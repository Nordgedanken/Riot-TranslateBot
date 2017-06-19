import login from './login';

const mx = new login;
mx.getClient().then(client => {
    client.on("Room.timeline", (event, room, toStartOfTimeline) => {
        if (toStartOfTimeline) return;
        if (event.getType() !== "m.room.message") return;
        if (event.getContent().msgtype !== "m.text") return;
        console.log(
            // the room name will update with m.room.name events automatically
            "(%s) %s :: %s", room.name, event.getSender(), event.getContent().body
        );
    });
    client.startClient();
});

