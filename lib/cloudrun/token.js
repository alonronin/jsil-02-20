const config = require('config');
const axios = require('axios');

const getCloudRunToken = async service => {
    if (config.env !== 'production') return;

    const url = `http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=${service}`;

    const { data: token } = await axios.get(url, {
        headers: {
            'Metadata-Flavor': 'Google'
        }
    });

    return token;
};

module.exports = getCloudRunToken;