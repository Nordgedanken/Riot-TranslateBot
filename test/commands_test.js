import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Login from '../lib/login';
import Commands from '../lib/commands';

chai.use(chaiAsPromised);

chai.should();

describe('Commands', () => {
    const mx = new Login;
    mx.getClient().then(client => {
        it('should send help', done => {
            const CommandHandler = new Commands(client);
            const room = {roomId: '!EDuQpgunAOTYiUKIcU:matrix.org'};
            const help = CommandHandler.help(room);
            help.should.be.fulfilled.and.notify(done);
        });
        it('should send languages', done => {
            const CommandHandler = new Commands(client);
            const room = {roomId: '!EDuQpgunAOTYiUKIcU:matrix.org'};
            const languages = CommandHandler.languages(room);
            languages.should.be.fulfilled.and.notify(done);
        });
    });
});