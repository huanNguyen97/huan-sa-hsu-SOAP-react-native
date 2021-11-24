// Import from react
import React, { useState } from 'react';

import {
    Text,
    ScrollView
} from 'react-native';

import {
    Card,
    Button,
    Input
} from 'react-native-elements';

import { useRoute } from '@react-navigation/native';

import axios from 'axios';
import X2JS from 'x2js';

// Import from owner project
import { edit_game, config } from '../soap-calling/url';

// Component part 
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Main content
const Edit = (props) => {
    // Take params from navigator
    const route = useRoute();

    // Set data default values
    const [name, setName] = useState(route.params.name);
    const [category, setCategory] = useState(route.params.category);
    const [brand, setBrand] = useState(route.params.brand);
    const [year_released, setYear_Released] = useState(route.params.year_released.toString());
    const [price, setPrice] = useState(route.params.price.toString());

    // // Update function
    // const updateData = () => {
    //     fetch(update_game + route.params.id, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json' 
    //         },
    //         body: JSON.stringify({
    //             id: route.params.id,     // Just only id cannot edit.
    //             name: name,
    //             category: category,
    //             brand: brand,
    //             year_released: year_released,
    //             price: price
    //         })
    //     })
    //     .then(resp => resp.json())
    //     .then(game => {
    //         props.navigation.push('Tab');
    //     })
    //     .catch(() => {
    //         console.log("Server not found");    // For checking. Not alerting on mobile screen
    //     })
    // }

    // Update function
    const updateData = () => {
        const editGame = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <Update xmlns="http://huan-nguyen.org/">
              <newItem>
                <id>${route.params.id}</id>
                <name>${name}</name>
                <category>${category}</category>
                <brand>${brand}</brand>
                <year_released>${year_released}</year_released>
                <price>${price}</price>
              </newItem>
            </Update>
          </soap:Body>
        </soap:Envelope>`

        axios.post(edit_game, editGame, config)
            .then(res => {
                const xmlData = res.data;
                
                const jsonData = new X2JS().xml2js(xmlData);
                console.log(jsonData);
            })
            .catch(err => {
                console.log("Something was wrong!");
            });
            
        props.navigation.push('Tab');
    };

    return (
        <ScrollView>
            <Card>
                <Card.Title >FORM EDITTING</Card.Title> 
                <Text>{/* empty */}</Text>
                <Text>{/* empty */}</Text>
                <Input
                    label="Name"
                    labelStyle={{
                        color: 'green',
                        fontWeight: 'normal'
                    }}
                    inputStyle={{
                        fontWeight: 'bold'
                    }}
                    value={name}
                    rightIcon={{
                        type: 'font-awesome-5',
                        name: 'chess-knight'
                    }}
                    onChangeText={text => setName(text)}
                />
                <Text>{/* empty */}</Text>
                <Input
                    label="Category"
                    labelStyle={{
                        color: 'green',
                        fontWeight: 'normal'
                    }}
                    inputStyle={{
                        fontWeight: 'bold'
                    }}
                    value={category}
                    rightIcon={{
                        type: 'font-awesome-5',
                        name: 'gamepad'
                    }}
                    onChangeText={text => setCategory(text)}
                />
                <Text>{/* empty */}</Text>
                <Input
                    label="Brand"
                    labelStyle={{
                        color: 'green',
                        fontWeight: 'normal'
                    }}
                    inputStyle={{
                        fontWeight: 'bold'
                    }}
                    value={brand}
                    rightIcon={{
                        type: 'font-awesome-5',
                        name: 'copyright'
                    }}
                    onChangeText={text => setBrand(text)}
                />
                <Text>{/* empty */}</Text>
                <Input
                    label="Year released"
                    labelStyle={{
                        color: 'green',
                        fontWeight: 'normal'
                    }}
                    inputStyle={{
                        fontWeight: 'bold'
                    }}
                    value={year_released}
                    rightIcon={{
                        type: 'font-awesome-5',
                        name: 'list-ol'
                    }}
                    onChangeText={text => setYear_Released(text)}
                />
                <Text>{/* empty */}</Text>
                <Input
                    label="Price"
                    value={price}
                    labelStyle={{
                        color: 'green',
                        fontWeight: 'normal'
                    }}
                    inputStyle={{
                        fontWeight: 'bold'
                    }}
                    rightIcon={{
                        type: 'font-awesome-5',
                        name: 'money-check'
                    }}
                    onChangeText={text => setPrice(text)}
                />
                <Button
                    title="Save"
                    buttonStyle={{
                        backgroundColor: "#32CD32"
                    }}
                    onPress={() => {
                        updateData()
                    }} 
                />
            </Card> 
        </ScrollView>
    );
};
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// End component

export default Edit;