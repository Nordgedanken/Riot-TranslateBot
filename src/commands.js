import Weblate from './weblate';
export default class Commands {
    constructor(client){
        this.client = client;
        this.weblate = new Weblate();
    }

    help = room => {
        return this.client.sendHtmlNotice(room.roomId, `Help for you!\n Commands:\n * !languages`, `Help for you!<br> Commands:<br> <ul><li>languages</li></ul>`).catch(error => console.log(error));
    };

    languages = room => {
        return this.weblate.getLangs().then(body => {
            let message = 'Currently known languages:\n';
            for (let key in body['results']) {
                message += body['results'][key]['code'] + '\n'
            }
            return this.client.sendNotice(room.roomId, message).catch(error => console.log(error));
        })
        .catch(err => {
            console.log(err);
        });
    };
}
