import matrix_sdk from 'matrix-js-sdk';
import fs from 'mz/fs';
import node_fs from 'fs';

const env_args = process.argv.splice(process.execArgv.length + 2);

export default class Login {
    constructor() {};
    getClient = () => {
        return this.login();
    };

    login = () => {
        if (node_fs.existsSync('user_data.json')){
            const json = node_fs.readFileSync('user_data.json');
            const valid_json = JSON.parse(json);
            if (valid_json.hasOwnProperty("access_token")){
                return this.useToken(valid_json["access_token"], valid_json["user_id"], valid_json["home_server"]);
            } else {
                return this.useEnv();
            }
        } else {
            return this.useEnv();
        }
    };

    useEnv = () => {
        const matrixClient = matrix_sdk.createClient({
            baseUrl: "https://matrix.org",
            userId: env_args[0]
        });

        matrixClient.loginWithPassword(env_args[0], env_args[1]).then( data => {
            console.log(data);
            fs.writeFile('user_data.json', JSON.stringify(data), 'utf8')
            .then(() => {
                console.log("saved Access_token to file");
            })
            .catch(err => {
                console.error(err);
            })
        });
        return new Promise(resolve => {
            resolve(matrixClient);
        });
    };

    useToken = (token, userId, baseUrl) => {
        const matrixClient = matrix_sdk.createClient({
            baseUrl: "https://" + baseUrl,
            userId: userId,
            accessToken: token
        });
        return new Promise(resolve => {
            resolve(matrixClient);
        });
    };
}