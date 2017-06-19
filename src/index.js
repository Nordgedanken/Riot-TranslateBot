import login from './login';

const new_login = new login;
new_login.getClient().then(client => {
    console.log("client: " + client);
    client.publicRooms(function(err, data) {
        console.log("Public Rooms: %s", JSON.stringify(data));
    });
});

