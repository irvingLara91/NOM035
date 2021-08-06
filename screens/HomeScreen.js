import React, {useEffect} from "react";
import {Box, Text} from "native-base";
import {connect} from "react-redux";
import productsDuck from "../redux/ducks/productsDuck";

const HomeScreen = ({productsDuck}) => {

    useEffect(() => {
        console.log(productsDuck)
    }, [])

    return (
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
            <Text color={'amber.400'}>Open up App.js to start working on your app!</Text>
        </Box>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeScreen);