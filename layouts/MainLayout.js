import React, {useEffect} from "react";
import {Box, Text, Button, Heading, Center, Container, VStack} from "native-base";
import {View} from "react-native";

const MainLayout = (props) => {


    return (

        <Center flex={1}>
            <VStack space={4} flex={1} w="90%" mt={4}>
                {props.children}
            </VStack>
        </Center>



    )
}


export default MainLayout;
