import React, { useState,useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // setLoading(true);
        console.log('Received values:', values);
        try {
            const response = await axios.post('http://localhost:2000/login', values);
            console.log('Registration successful:', response.data.token);
            message.success('Login successful');

            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            navigate('/');
            setLoading(false);
        } catch (error) {
            console.error('Registration failed:', error);
            message.error(error.response.data.result);
            // setLoading(false);

        }
    };
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    });

    return (
        <div className='signup'>
            <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
            <div className='form-container'>
                <Form
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input type='email' placeholder="Enter Email" prefix={<MailOutlined />} className='input-field' size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" prefix={<LockOutlined />} className='input-field' size="large" />
                    </Form.Item>
{/*
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
