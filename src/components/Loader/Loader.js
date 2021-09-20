import React from 'react';

import './index.css';

const Loader =  (props) => {

    return (
     <div className="loader">
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
     </div>
    )
}

export default React.memo(Loader);