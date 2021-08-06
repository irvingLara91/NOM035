import React, {useEffect} from "react";
import {Box, Text, Button, Heading, Center, Container, Flex} from "native-base";
import {connect} from "react-redux";
import productsDuck from "../../redux/ducks/productsDuck";
import MainLayout from "../../layouts/MainLayout";

const LoginAdmin = ({productsDuck}) => {

    useEffect(() => {
        console.log(productsDuck)
    }, [])

    return (

        <MainLayout>
            <Flex direction={'column'}>
                <Center>
                    <Box>
                        <Heading style={{color:'black', marginTop:'30%'}} size="lg" mb={3}>
                            Login
                        </Heading>
                    </Box>
                </Center>

                <Button size={'lg'} onPress={() => console.log("hello world")}>ingresar</Button>
            </Flex>
        </MainLayout>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(LoginAdmin);
