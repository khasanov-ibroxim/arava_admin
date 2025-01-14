import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { shopsStore } from '@/store/shopsStore/shopsStore.jsx';
import './single_shop.css';
import { Button, Drawer, Input, Table, Select, message, Upload, Alert } from 'antd';
import Single_shop_filter_products from '@/Components/filters/filter_shops/single_shop_filter_products.jsx';
import { UploadOutlined } from '@ant-design/icons';

const { Column } = Table;

const SingleShop = () => {
    const { shop_id, user_id } = useParams();
    const {
        shop_by_id_products,
        allShops,
        getAllShops,
        getAllShopsMainCategory,
        allShopsMainCategory,
        getSingleShopWork
    } = shopsStore();

    const currentShop = allShops.find(item => item.id === Number(shop_id)) || {};

    const [changedShopData, setChangedShopData] = useState({
        name: currentShop?.name,
        photo: currentShop?.photo,
        shop_category_id: currentShop?.shop_category_id,
        work: {
            work_id: '',
            open_time: '',
            close_time: '',
            week: []
        }
    });

    const [open, setOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const weekDays = [
        { label: 'Dushanba', value: 'Monday' },
        { label: 'Seshanba', value: 'Tuesday' },
        { label: 'Chorshanba', value: 'Wednesday' },
        { label: 'Payshanba', value: 'Thursday' },
        { label: 'Juma', value: 'Friday' },
        { label: 'Shanba', value: 'Saturday' },
        { label: 'Yakshanba', value: 'Sunday' }
    ];

    const showDrawer = (products) => {
        setSelectedProducts(products);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setSelectedProducts([]);
    };

    const handleShopChange = (e) => {
        setChangedShopData({ ...changedShopData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (value) => {
        setChangedShopData({ ...changedShopData, shop_category_id: value });
    };

    const handleWeekChange = (e) => {
        const { value, checked } = e.target;
        const updatedWeek = checked
            ? [...changedShopData.work.week, value]
            : changedShopData.work.week.filter(day => day !== value);

        setChangedShopData({
            ...changedShopData,
            work: { ...changedShopData.work, week: updatedWeek }
        });

        e.target.parentNode.classList.toggle('activeDay', checked);
    };

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setChangedShopData({
            ...changedShopData,
            work: { ...changedShopData.work, [name]: value }
        });
    };

    const props = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'uploading') {
                setAlertMessage('Uploading...');
                setAlertType('info');
            }
            if (info.file.status === 'done') {
                setAlertMessage(`${info.file.name} file uploaded successfully`);
                setAlertType('success');
            } else if (info.file.status === 'error') {
                setAlertMessage(`${info.file.name} file upload failed.`);
                setAlertType('error');
            }
        },
    };

    useEffect(() => {
        if (allShops.length === 0 || !currentShop) {
            getAllShops();
        }
        if (allShopsMainCategory.length === 0) {
            getAllShopsMainCategory();
        }
    }, [user_id, getAllShops, getAllShopsMainCategory, currentShop]);

    useEffect(() => {
        getSingleShopWork(shop_id);
    }, [shop_id, user_id]);

    return (
        <div>
            <Drawer title="Shop Products" onClose={onClose} open={open}>
                <div>{selectedProducts.length > 0 ? selectedProducts.map(product => <p key={product.id}>{product.name}</p>) : 'No products available'}</div>
            </Drawer>

            {alertMessage && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    showIcon
                    closable
                    style={{ marginBottom: '20px' }}
                />
            )}

            <div className="single_shop_header">
                <div className="single_shop_header_left">
                    <img
                        src={changedShopData.photo ? `https://backend1.mussi.uz/${changedShopData.photo}` : ''}
                        alt="Shop"
                    />
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Update Photo</Button>
                    </Upload>
                </div>
                <div className="single_shop_header_right">
                    <div className="single_shop_header_input">
                        <p>Shop Name</p>
                        <Input
                            name="name"
                            value={changedShopData.name || ''}
                            onChange={handleShopChange}
                        />
                    </div>
                    <div className="single_shop_header_input">
                        <p>Shop Category</p>
                        <Select
                            value={changedShopData.shop_category_id || undefined}
                            onChange={handleCategoryChange}
                            options={allShopsMainCategory.map((category) => ({
                                value: category.id,
                                label: category.name,
                            }))}
                        />
                    </div>
                    <div className="single_shop_header_input">
                        <p>Shop Working Days</p>
                        <div className="work_time">
                            <Input
                                type="time"
                                name="open_time"
                                value={changedShopData.work.open_time}
                                onChange={handleTimeChange}
                            />
                            <Input
                                type="time"
                                name="close_time"
                                value={changedShopData.work.close_time}
                                onChange={handleTimeChange}
                            />
                        </div>
                        <div className="week-checkbox-group">
                            {weekDays.map((day) => (
                                <label key={day.value} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value={day.value}
                                        checked={changedShopData.work.week.includes(day.value)}
                                        onChange={handleWeekChange}
                                    />
                                    {day.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="single_shop_content">
                <div className="single_shop_content_filter">
                    <Single_shop_filter_products />
                </div>
                <Table
                    dataSource={shop_by_id_products}
                    bordered={false}
                    className="dark-table"
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                    style={{ marginTop: '30px' }}
                >
                    <Column
                        title=""
                        dataIndex="photo"
                        key="photo"
                        render={(photo) => (
                            <img
                                src={photo}
                                alt="product"
                                style={{ width: 130, height: '100%', borderRadius: 8 }}
                            />
                        )}
                        width="200px"
                    />
                    <Column title="Product Name" dataIndex="name" key="name" />
                    <Column title="Product Count" dataIndex="product_count" key="product_count" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Button type="primary" onClick={() => showDrawer(record.products)}>
                                View Products
                            </Button>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
};

export default SingleShop;
