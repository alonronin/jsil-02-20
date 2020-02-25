import axios from 'axios';
import config from 'config';

export const postUrl = async url => {
  try {
    const { data } = await axios.post(config.api, { url });
    return data;
  } catch (e) {
    console.error(e);
  }
};
