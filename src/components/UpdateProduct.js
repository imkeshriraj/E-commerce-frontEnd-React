import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const { Option } = Select;
const { Title } = Typography;

const UpdateProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/getProductById/${params.id}`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` } });
                console.log('Product:', response.data);
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error(error.response.data.result);
            }
        }
        fetchProducts();
    }, [params.id, form])
    const onFinish = async (values) => {
        try {
            const response = await axios.put(`http://localhost:2000/updateProduct/${params.id}`, values, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` } });
            form.resetFields();
            message.success('Product updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Update failed:', error);
            message.error(error.response.data.result);
        }
    };
    const priceValidator = (_, value) => {
        if (!value || /^[0-9]+$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be a number!'));
    };
    return (
        <div className='signup'>
            <Title level={2} style={{ textAlign: 'center' }}>Update Product</Title>
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
                        </Select>
                    </Form.Item>
                    <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please input the brand!' }]}>
                        <Input placeholder="Enter brand" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update Product
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProduct;
