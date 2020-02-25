import React, { useState } from 'react';
import { postUrl } from './service';

const onSubmit = async (e, setData, setLoading) => {
  e.preventDefault();

  setLoading(true);

  const url = e.target.url.value;

  const response = await postUrl(url);

  setData(response);
  setLoading(false);
};

const Loading = ({ loading, children }) =>
  loading ? <div className="loading">Loading...</div> : children;

const App = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <h1>JS-IL 02/2020 - Infinite scale with Node.js and CloudRun</h1>

      <form onSubmit={e => onSubmit(e, setData, setLoading)}>
        <input type="url" name="url" defaultValue="https://example.com" />
        <button>Go</button>
      </form>

      <Loading loading={loading}>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Loading>
    </div>
  );
};

export default App;
