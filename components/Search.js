// Import from react
import React, { useState, useEffect } from 'react';

import {
    View, 
    Text,
    FlatList,
    ScrollView
} from 'react-native'

import { 
    SearchBar, 
    Input,
    Button 
} from 'react-native-elements';

import axios from 'axios';
import X2JS from 'x2js';

// Import owner
import { search_game, config } from '../soap-calling/url';

import Card_UI from '../UI/Card/Card_UI';
import Loading from '../UI/Loading/Loading';

// Component part 
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Main content
const Search = (props) => {
    // Data at first
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState();
    // const [isLoading, setIsLoading] = useState();
    // Use this for deleting
    const [foundId, setFoundId] = useState();

    // // Fetching data 
    // const searchGameHandle = () => {
    //     fetch(search_games, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json' 
    //         },
    //         body: JSON.stringify({
    //             search_text: searchText
    //         })
    //     })
    //     .then(resp => resp.json())
    //     .then(game => {
    //         setData(game);
    //         console.log(game);
    //     })
    //     .catch(() => {
    //         console.log("Server not found");    // For checking. Not alerting on mobile screen
    //     })
    // }

    // Fetching data 
    const searchGameHandle = () => {
        const searchGame = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <Search xmlns="http://huan-nguyen.org/">
              <keyword>${searchText}</keyword>
            </Search>
          </soap:Body>
        </soap:Envelope>`

        axios.post(search_game, searchGame, config)
            .then(res => {
                const xmlData = res.data;

                const jsonData = new X2JS().xml2js(xmlData);
                setData(jsonData.Envelope.Body.SearchResponse.SearchResult.game);
            })
            .catch(err => {
                console.log("Something was wrong!");
            });
    };

    // Show true
    const showModalHandle_True = (id) => {
        setShowModal(true);
        setFoundId(id);
    }

    // Render data
    const renderData = (game) => {
        return (
            <Card_UI
                game={game}
                showModalHandle_True={showModalHandle_True} 
                canShowing={true}
            />
        );
    };

    return (
        <ScrollView>
            <View>
                <Input
                    onChangeText={text => setSearchText(text)} 
                />
                <Button 
                    title="Search"
                    onPress={() => searchGameHandle()}
                />
            </View>
            <FlatList
                data={data}
                renderItem={({item}) => {
                    return renderData(item)
                }}
                keyExtractor={item => `{$item.id}`}     // Warning at here, but it isn't a bug
            />
        </ScrollView>
    )
};
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// End component

export default Search;