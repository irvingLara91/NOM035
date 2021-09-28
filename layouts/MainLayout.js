import React, {useEffect} from "react";
import {Box, Text, Button, Heading, Center, Container, VStack} from "native-base";
import {View} from "react-native";

const MainLayout = (props) => {


    return (

        <Center flex={1}>
            <VStack space={4} backgroundColor={props.isWhite ?"white":null} flex={1} w="100%">
                {props.children}
            </VStack>
        </Center>



    )
}


export default MainLayout;
