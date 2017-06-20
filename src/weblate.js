import config from '../config.json';
import rp from 'request-promise';

export default class Weblate {
    getLangs = () => {
        const options = {
            uri: config["weblateApiRoot"] + "languages",
            headers: {
                'Authorization': 'Token ' + config['weblate_token']
            },
            json: true // Automatically parses the JSON string in the response
        };
        return rp(options);
    };
    getProjects = () => {
        const options = {
            uri: config["weblateApiRoot"] + "projects",
            headers: {
                'Authorization': 'Token ' + config['weblate_token']
            },
            json: true // Automatically parses the JSON string in the response
        };
        return rp(options);
    }
}