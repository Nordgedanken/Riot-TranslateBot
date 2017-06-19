import login from './login';

const mx = new login;
mx.getClient().then(client => {
    client.on("event", function(event) {
        console.log(event.getType());
    });
    client.on("Room.timeline", (event, room, toStartOfTimeline) => {
        console.log(event.getType());
        if (toStartOfTimeline) {
            return; // don't print paginated results
        }
        if (event.getType() !== "m.room.message") {
            return; // only print messages
        }
        console.log(
            // the room name will update with m.room.name events automatically
            "(%s) %s :: %s", room.name, event.getSender(), event.getContent().body
        );
    });
    client.startClient();
});

