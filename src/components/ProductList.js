import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Typography, Button, Input, Space, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, json } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [deletedProduct, setDeletedProduct] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const onDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:2000/deleteProduct/${id}`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` } });
            console.log('Product Deleted:', response.data);
            setDeletedProduct(id);
            message.success('Product Deleted Successfully');
        } catch (error) {
            message.error(error.response.data.result);
        }
    };
    const edit = (id) => {
        console.log('Edit:', id);

    }


    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            // ...getColumnSearchProps('name'),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (text) => <span>₹{text}</span>,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <>
                    <Popconfirm
                        title={`Are you sure you want to delete ${record.name}?`}
                        cancelText="Cancel"
                        okText="Confirm"
                        onConfirm={() => onDelete(record._id)}
                    >
                        <Button icon={<DeleteOutlined />} type="danger" >
                            Delete
                        </Button>
                    </Popconfirm>
                    <Link to={`/update/${record._id}`} onClick={() => edit(record._id)}>
                        <Button type="danger" icon={<EditOutlined />}>
                            Edit
                        </Button>
                    </Link>
                </>
            ),
        },
    ];
    const fetchProducts = async () => {
        console.log(`Bearer ${JSON.parse(localStorage.getItem('token'))}`)
        try {
            const response = await axios.get('http://localhost:2000/getProducts',{headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }});
            console.log('Product List:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.log(error)
            message.error(error.response.data.result);
        }
    };
    useEffect(() => {
        fetchProducts();
        setDeletedProduct(null);
    }, [deletedProduct]);
    const onSearch = async (e) => {
        console.log(e.target.value);
        const searchValue = e.target.value;
        if (searchValue) {

            try {
                const response = await axios.get(`http://localhost:2000/searchProduct/${searchValue}`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` } });
                setProducts(response.data);
            } catch (error) {
                console.error('Search failed:', error);
                message.error(error.response.data.result || 'Search failed');
            }
        } else {
            fetchProducts();
        }
    };

    return (
        <div className='signup'>
            <div className='form-container'>
                <Title level={2} style={{ textAlign: 'center' }}>Product Listing</Title>
                <div className='search-container'>
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton
                        size="large"
                        onChange={onSearch}
                    />
                </div>
                <Table
                    dataSource={products}
                    columns={columns}
                    pagination={{ pageSize: 5, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` }} />
            </div>
        </div >
    );
}

export default ProductList;