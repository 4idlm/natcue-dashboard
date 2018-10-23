import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => (<ol className="breadcrumb">
    <li className="breadcrumb-item">
        <Link to={props.parentLink}>
            {props.parentTitle}
        </Link>
    </li>
    <li className="breadcrumb-item active">{props.leaf}</li>
</ol>)