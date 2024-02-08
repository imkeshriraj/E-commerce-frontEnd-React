import React from 'react'
import { Layout } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer } = Layout;

function FooterComponent() {
    return (
        <Footer className='footer'>
            <div>
                <p >Connect with us:</p>
                <a href="https://github.com/" ><GithubOutlined /></a>
                <a href="https://twitter.com/" ><TwitterOutlined /></a>
                <a href="https://www.linkedin.com/" ><LinkedinOutlined /></a>
            </div>
            <p >©2024 E-dashboard. All Rights Reserved.</p>
        </Footer>
    )
}

export default FooterComponent;
