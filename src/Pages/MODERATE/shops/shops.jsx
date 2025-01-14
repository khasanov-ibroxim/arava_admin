import React, {useEffect, useState} from 'react';
import {message, Table} from "antd";
import {Link, useParams} from "react-router-dom";
import Header_title from "../../../Components/header_title/header_title.jsx";
import "./shops.css";
import Filter_shops from "../../../Components/filters/filter_shops/filter_shops.jsx";
import {LAYOUT, MODERATOR_SINGLE_SHOP} from "@/utils/consts.jsx";
import {shopsStore} from "@/store/shopsStore/shopsStore.jsx";

const { Column } = Table;



const Shops = () => {
    const {user_id} = useParams()
    const {allShops, getAllShops , searchShop} = shopsStore()
    const [filteredShopName , setFilteredShopName] = useState('')
    const [shops_table , setShops_table] = useState([]);

    console.log(allShops)
    useEffect(()=>{
        if (filteredShopName){
            searchShop(filteredShopName).then(r=>{
                if (r.length > 0){
                    setShops_table(r)
                }else {
                    setShops_table([]); // Jadvalni tozalash
                    message.info("Ma'lumot topilmadi");
                }
            })
        }
    },[filteredShopName])

    console.log(shops_table)
    useEffect(() => {
        getAllShops()
    }, [user_id]);


    return (
        <div className="shops-container">
            <div className="shops_header">
                <Header_title title={"Shops"} />
                <Filter_shops setFiltrShop={setFilteredShopName}/>
            </div>

            <Table
                dataSource={shops_table.length > 0 ? shops_table : allShops}
                bordered={false}
                className="dark-table"
                pagination={{ pageSize: 5 }}
                rowKey="id"
            >

                <Column
                    title=""
                    dataIndex="photo"
                    key="photo"
                    render={(photo) => (
                        <img src={"https://backend1.mussi.uz/"+photo} alt="shop" style={{ width: 130, height: "100px", borderRadius: 8 }} />
                    )}
                    width={"200px"}
                />


                <Column title="Shop Name" dataIndex="name" key="name" />


                <Column title="Raiting" dataIndex="rating" key="rating" />


                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Link to={LAYOUT.replace(":user_id" , user_id)+MODERATOR_SINGLE_SHOP.replace(":shop_id" , record.id )} style={{color: "#1e90ff"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag-edit">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M11 21h-2.426a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304h11.339a2 2 0 0 1 1.977 2.304l-.109 .707"/>
                                <path d="M9 11v-5a3 3 0 0 1 6 0v5"/>
                                <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z"/>
                            </svg>
                        </Link>
                    )}
                />
            </Table>
        </div>
    );
};

export default Shops;
