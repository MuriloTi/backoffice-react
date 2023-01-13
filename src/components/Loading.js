import React from 'react';
import { Oval } from 'react-loader-spinner';

export default function Loading(props) {
    return (
        <div className='d-flex align-items-center'>
            <Oval
                height={25}
                width={25}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
            <span className='text-muted'>{props.text}</span>
        </div>
    );
}