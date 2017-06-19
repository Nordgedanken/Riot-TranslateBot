export default class commands {
    constructor(client){
        this.client = client;
    }

    help = room => {
        this.client.sendHtmlNotice(room.roomId, `Help for you!\r\n Commands:\r\n - None`, `Help for you!<br> Commands:<br> - None`).catch(error => console.log(error));
    }
}
