import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import login from '../lib/login';
import chai_fs from 'chai-fs';

chai.use(chai_fs);
chai.use(chaiAsPromised);

const expect = chai.expect;

chai.should();

describe('Login', () => {
    const mx = new login;
    it('should eventually login', done => {
        const client = mx.getClient();
        client.should.be.fulfilled.and.notify(done);
    });
    it('should have generated a device json file', () => {
        mx.getClient().then(client => {
            return expect('./user_data.json').to.be.a.file().with.json;
        });
    })
});