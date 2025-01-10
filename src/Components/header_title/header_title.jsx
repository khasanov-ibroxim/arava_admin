import React from 'react';
import "./header_title.css"


const HeaderTitle = ({title , subtitle}) => {
    return (
        <div className="header_title_component">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
};

export default HeaderTitle;