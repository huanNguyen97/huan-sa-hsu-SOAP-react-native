// Import from react
import React, { useState, useEffect } from 'react';

import { 
    View,
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

// Import from owner
import { read_details_game, config } from '../soap-calling/url';
import Loading from '../UI/Loading/Loading';

// Component part 
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Main content
const Details = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Take params from navigator
    const route = useRoute();

    // // Fetching data
    // useEffect(() => {
    //     fetch(read_detail_game + route.params.id, {
    //         method: 'GET'
    //     })
    //     .then(resp => resp.json())
    //     .then(game_details => {
    //         setData(game_details);
    //         setIsLoading(true);
    //     })
    //     .catch(() => {
    //         console.log("Server not found");     // For checking. Not alerting on mobile screen
    //     })
    // }, []);

    // Fetching data
    useEffect(() => {
        const getDetails = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetDetails xmlns="http://huan-nguyen.org/">
              <itemID>${route.params.id}</itemID>
            </GetDetails>
          </soap:Body>
        </soap:Envelope>`

        axios.post(read_details_game, getDetails, config)
            .then(res => {
                const xmlData = res.data;

                const jsonData = new X2JS().xml2js(xmlData);
                setData(jsonData.Envelope.Body.GetDetailsResponse.GetDetailsResult);
                setIsLoading(true);
            })
            .catch(err => {
                console.log("Something was wrong!");
            });
    }, [])

    // Details of game
    const Game_Details = (sub_props) => {
        return (
            <ScrollView>
                <Card>
                    <Card.Title >GAME DETAIL</Card.Title> 
                    <Text>{/* empty */}</Text>
                    <Text>{/* empty */}</Text>
                    <Input
                        label="Name"
                        disabled
                        labelStyle={{
                            color: '#1E90FF',
                            fontWeight: 'normal'
                        }}
                        inputStyle={{
                            fontWeight: 'bold'
                        }}
                        value={sub_props.game_details.name}
                        rightIcon={{
                            type: 'font-awesome-5',
                            name: 'chess-knight'
                        }}
                        onChangeText={text => setName(text)}
                    />
                    <Text>{/* empty */}</Text>
                    <Input
                        label="Category"
                        disabled
                        labelStyle={{
                            color: '#1E90FF',
                            fontWeight: 'normal'
                        }}
                        inputStyle={{
                            fontWeight: 'bold'
                        }}
                        value={sub_props.game_details.category}
                        rightIcon={{
                            type: 'font-awesome-5',
                            name: 'gamepad'
                        }}
                        onChangeText={text => setCategory(text)}
                    />
                    <Text>{/* empty */}</Text>
                    <Input
                        label="Brand"
                        disabled
                        labelStyle={{
                            color: '#1E90FF',
                            fontWeight: 'normal'
                        }}
                        inputStyle={{
                            fontWeight: 'bold'
                        }}
                        value={sub_props.game_details.brand}
                        rightIcon={{
                            type: 'font-awesome-5',
                            name: 'copyright'
                        }}
                        onChangeText={text => setBrand(text)}
                    />
                    <Text>{/* empty */}</Text>
                    <Input
                        label="Year released"
                        disabled
                        labelStyle={{
                            color: '#1E90FF',
                            fontWeight: 'normal'
                        }}
                        inputStyle={{
                            fontWeight: 'bold'
                        }}
                        value={sub_props.game_details.year_released.toString()}
                        rightIcon={{
                            type: 'font-awesome-5',
                            name: 'list-ol'
                        }}
                        onChangeText={text => setYear_Released(text)}
                    />
                    <Text>{/* empty */}</Text>
                    <Input
                        label="Price"
                        disabled
                        value={sub_props.game_details.price.toString()}
                        labelStyle={{
                            color: '#1E90FF',
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
                </Card> 
            </ScrollView>
        );
    }

    // Result of component
    return (
        <ScrollView>
            {
                isLoading ?
                <Game_Details
                    game_details={data}  
                /> : <Loading />
            }
        </ScrollView>
    );
};
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// End component

export default Details;