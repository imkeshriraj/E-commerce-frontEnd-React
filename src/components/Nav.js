import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Row, Col, Typography } from 'antd';
import { PlusOutlined, EditOutlined, LogoutOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Title } = Typography;
const Nav = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setAuth(user)
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/signup');
    }
    return (
        <div className='nav'>
            <Menu mode="horizontal">
                <Row justify={'space-between'} style={{ width: '100%' }}>
                    <Col><Row><Avatar size={64} shape='square' src='https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D' /> <Title className='text-e'>E-commerce</Title></Row></Col>

                    <Col>
                        {auth &&
                            <>
                                <Menu.Item key="products" icon={<UserOutlined />}>
                                    <Link to='/'>Products</Link>
                                </Menu.Item>
                                <Menu.Item key="add" icon={<PlusOutlined />}>
                                    <Link to='/add'>Add Product</Link>
                                </Menu.Item>
                                {/* <Menu.Item key="update" icon={<EditOutlined />}>
                                    <Link to='/update'>Update Product</Link>
                                </Menu.Item> */}

                                <Menu.Item key="profile" icon={<UserOutlined />}>
                                    <Link to='/profile'>Profile</Link>
                                </Menu.Item>
                                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                                    <Link onClick={logout} to='/logout'>Logout ({auth.name})</Link>
                                </Menu.Item>
                            </>

                        }
                    </Col>
                    {!auth && (
                        <Col>
                            <SubMenu key="authSubMenu" icon={<UserAddOutlined />} title='signup/login'>
                                <>
                                    <Menu.Item key="signup">
                                        <Link to='/signup'>Signup</Link>
                                    </Menu.Item>
                                    <Menu.Item key="login">
                                        <Link to='/login'>Login</Link>
                                    </Menu.Item>
                                </>
                            </SubMenu>
                        </Col>
                    )}
                </Row>
            </Menu>
        </div>
    );
};

export default Nav;