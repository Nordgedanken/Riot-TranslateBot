import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Login from '../lib/login';
import Commands from '../lib/commands';

chai.use(chaiAsPromised);

chai.should();

describe('Commands', () => {
    const mx = new Login;
    const room = {roomId: '!EDuQpgunAOTYiUKIcU:matrix.org'};
    mx.getClient().then(client => {
        client.sendTextMessage(room.roomId, "Test messages are incoming!\n").catch(error => console.log(error));
        it('should send help', done => {
            const CommandHandler = new Commands(client);
            const help = CommandHandler.help(room);
            help.should.be.fulfilled.and.notify(done);
        });
        it('should send languages', done => {
            const CommandHandler = new Commands(client);
            const languages = CommandHandler.languages(room);
            languages.should.be.fulfilled.and.notify(done);
        });
    });
});