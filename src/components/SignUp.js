import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const commonRules = [{ required: true, message: 'This field is required!' }];
const SignUpForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:2000/register', values);
            console.log('Registration successful:', response.data);
            message.success('Registration successful');
            localStorage.setItem('user', JSON.stringify(response.data?.result));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            form.resetFields();
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            message.error(error.response.data.result);
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
                    name="signup"
                    onFinish={onFinish}
                    form={form}

                >
                    <Form.Item
                        name="name"
                        label="Username"
                        rules={[...commonRules]}
                    >
                        <Input type='text' placeholder="Enter Name" prefix={<UserOutlined />} className='input-field' size="large" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[...commonRules]}

                    >
                        <Input type='text' placeholder="Enter Email" prefix={<MailOutlined />} className='input-field' size="large" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[...commonRules]}
                    >
                        <Input.Password placeholder="Enter Password" prefix={<LockOutlined />} className='input-field' size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='input-field'>Sign Up</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default SignUpForm;
