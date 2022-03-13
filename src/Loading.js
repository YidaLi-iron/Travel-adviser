import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Spin } from 'antd';

function Loading() {
    return (
      <div className="loading">
        <div style={{ padding: "100px" }}>
          <Spin size="large" />
          <h1 style={{ marginBottom: "2rem"}}>
            Loading
          </h1>
        </div>
      </div>
    );
  }
    
  export default Loading;