import React from 'react';
import { Form, Input, InputNumber, Select, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { Title } = Typography;

const AddProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Received values:', values);
        try {
            const response = await axios.post('http://localhost:2000/addProduct', { ...values, userId: JSON.parse(localStorage.getItem('user'))._id },{ headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}});
            form.resetFields();
            console.log(response)
            message.success('Product added successfully');
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            message.error(error.response.data.result);
        }

        // Handle form submission here
    };
    const priceValidator = (_, value) => {
        if (!value || /^[0-9]+$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be a number!'));
    };

    return (
        <div className='signup'>
            <Title level={2} style={{ textAlign: 'center' }}>Add Product</Title>
            <div className='form-container'>
                <Form form={form} onFinish={onFinish} >

                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }, { validator: priceValidator }]}>
                        <InputNumber min={1} max={1000} style={{ width: '100%' }} placeholder="Enter price" />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category!' }]}>
                        <Select placeholder="Select category">
                            <Option value="Fruits">Fruits</Option>
                            <Option value="Vegetable">Vegetable </Option>
                            <Option value="Grocery">Grocery</Option>
                            <Option value="Garments">Garments</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please input the brand!' }]}>
                        <Input placeholder="Enter brand" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add Product</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AddProduct;
