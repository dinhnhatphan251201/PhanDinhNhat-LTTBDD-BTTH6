import { Button, TextInput } from "@react-native-material/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from "react-native";
import Item from "../components/Item";
import List from "../components/List";

const Home = () => {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {});
    }, []);

    const handleAddItem = () => {
        axios
            .post(`https://jsonplaceholder.typicode.com/posts`, {
                userId: 1,
                title: value,
                body: "body",
            })
            .then(function (response) {
                console.log(response.data);
                setData([...data, response.data]);
                // ToastAndroid.show("Đã thêm");
            })
            .catch(function (error) {
                console.log(error);
                // ToastAndroid.show("Không thế thêm");
            })
            .finally(function () {});
    };

    const handleRemoveItem = (id) => {
        setData(data.filter((item) => item.id !== id));
        axios
            .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(function (response) {
                console.log(response.data);
                // setData(data.filter((item) => item.id !== id));
                // ToastAndroid.show("Đã thêm");
            })
            .catch(function (error) {
                console.log(error);
                // ToastAndroid.show("Không thế thêm");
            })
            .finally(function () {});
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.add}>
                <TextInput
                    variant="outlined"
                    label="Nhap mon hoc"
                    style={{ flex: 1 }}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                />
                <Button title="them" onPress={handleAddItem} />
            </View>
            <View>
                <ScrollView>
                    {/* <FlatList
                        data={data}
                        renderItem={Item}
                        keyExtractor={(item) => item.id}
                    ></FlatList> */}
                    {data.map((item, index) => (
                        <Item
                            handleRemoveItem={handleRemoveItem}
                            key={index}
                            item={item}
                        ></Item>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    add: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default Home;
