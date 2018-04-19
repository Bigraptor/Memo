import React, { Component } from 'react';
import { Homepage } from "./components/page/Homepage";
import { Memopage } from "./components/page/Memopage";
import styles from "./App.scss";
import classNames from "classnames/bind";



const cx = classNames.bind(styles);


class App extends Component {
  render() {
    return (
      
          <div className={cx("App")}>
            
          </div>
        
    );
  }
}

export default App;
