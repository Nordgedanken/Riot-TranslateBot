import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import login from '../lib/login';
import commands from '../lib/commands';

chai.use(chaiAsPromised);

chai.should();

describe('Commands', () => {
    const mx = new login;
    mx.getClient().then(() => {
        //TODO add test
        it('should answer with help');
    });
});