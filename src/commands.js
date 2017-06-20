export default class Commands {
    constructor(client){
        this.client = client;
    }

    help = room => {
        return this.client.sendHtmlNotice(room.roomId, `Help for you!\r\n Commands:\r\n - None`, `Help for you!<br> Commands:<br> - None`).catch(error => console.log(error));
    }
}
