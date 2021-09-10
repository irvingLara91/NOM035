import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {Dimensions, Image, ScrollView, Text, View} from "react-native";
import {textSizeRender} from "../../utils/utils";
import {Button, Checkbox} from "native-base";
import {connect} from "react-redux";
const {height, width} = Dimensions.get('window')

const GeneralPoliciesScreen = (props) => {
    const [check,setCheck]= useState(false)

    return (
        <MainLayout>
            <View style={{
                backgroundColor:'white',
                width: '100%',
                flex: 1,
            }}>
                <View style={{padding: 20, flex: 1}}>
                    <ScrollView>
                        <View>
                            <Text style={{textAlign: 'justify', fontFamily: "Poligon_Regular"}}>
                                <Text style={{
                                    fontSize: textSizeRender(3),
                                    textAlign: 'justify',
                                    fontFamily: "Poligon_Bold"
                                }}>{"POLTICA GENERAL DE RESPETO Y BIENESTAR DE NUESTROS COLABORADORES.\n\n"}</Text>
                                {"En GRUPO MÉXICO somos respetuosos de nuestros valiosos colaboradores y del trabajo que desempeñan. Nos apegamos a nuestro Código de Ética y nuestras Políticas Corporativas como la de Derechos Humanos. Aquí todos nos cuidamos y nos respetamos promoviendo un entorno organizacional favorable, no toleramos la violencia laboral y prevenimos los factores de riesgo psicosocial, por el bienestar de nuestra gente.\n\n" +
                                "Es obligación de todos nosotros, empezando por nuestros Ejecutivos, Directores, Gerentes y líderes de todos los niveles aplicar esta política, participar y predicar con el ejemplo en nuestros lugares de trabajo.\n\n"}
                            </Text>


                            <Text style={{
                                fontSize: textSizeRender(2.5),
                                textAlign: 'justify',
                                fontFamily: "Poligon_Regular"
                            }}>{"Nuestros Compromisos:\n"}</Text>
                            <Text style={{paddingLeft:10,textAlign: 'justify', fontFamily: "Poligon_Regular"}}>
                                {"•\tLos actos de violencia laboral no son tolerados, así como ningún incidente que propicie factores de riesgo psicosocial o acciones en contra del entorno organizacional favorable.\n" +
                                "•\tAplicamos medidas encaminadas a la prevención de los factores de riesgo psicosocial, de violencia laboral, y la promoción de un entorno organizacional favorable, para prevenir sus consecuencias adversas. \n" +
                                "•\tSe cuenta con un Procedimiento de Denuncias justo, para conocer cualquier falta a esta u otras Políticas de la empresa, misma que no permite castigo alguno para el denunciante; evita reclamaciones abusivas o carentes de fundamento, y que garantiza la confidencialidad de los casos. \n" +
                                "•\tNos comprometemos a vigilar el cumplimiento de las normas dirigidas a prevenir cualquier conducta o comportamiento que implique violencia laboral, a salvaguardar la información que sea recolectada, dar trámite e intervenir, de forma oportuna, en las quejas que se reciban por los medios establecidos.\n" +
                                "•\tSe realizan acciones de sensibilización, programas de información y capacitación de nuestras políticas. \n" +
                                "•\tSe divulgan de forma eficaz las Políticas y Procedimientos de Seguridad y Salud, así como las medidas de prevención de riesgos a la salud.\n" +
                                "•\tSe respeta al ejercicio de los derechos del personal para observar sus creencias o prácticas o para satisfacer sus necesidades relacionadas con la raza, sexo, religión, etnia o edad o cualquier otra condición que pueda dar origen a la discriminación, y \n" +
                                "•\tSe crean espacios de participación y consulta, teniendo en cuenta las ideas de todos.\n"}
                            </Text>

                            <Text style={{
                                fontSize: textSizeRender(2.5),
                                textAlign: 'justify',
                                fontFamily: "Poligon_Regular"
                            }}>{"Nuestros Principios:\n"}</Text>
                            <Text style={{paddingLeft:0,textAlign: 'justify', fontFamily: "Poligon_Regular"}}>
                                {'Para generar un entorno organizacional favorable en Grupo México:\n\n'}
                            </Text>
                            <Text style={{paddingLeft:10,textAlign: 'justify', fontFamily: "Poligon_Regular"}}>
                                {"•\tEstamos orientados hacia nuestra gente, todas y todos los colaboradores son muy importantes.\n" +
                                "•\tMantenemos una comunicación abierta y franca entre todas las personas y contamos con diversos canales de comunicación.\n" +
                                "•\tMantenemos limpias y en orden nuestras áreas de trabajo, así como las áreas comunes, como son: comedores, sanitarios y accesos.\n" +
                                "•\tTratamos con amabilidad y cortesía a los compañeros de trabajo, jefes, subalternos, visitantes, proveedores y clientes. \n" +
                                "•\tRealizamos exámenes médicos al personal de nuevo ingreso y exámenes médicos periódicos a nuestro personal, para dar seguimiento a su estado de salud.\n" +
                                "•\tLlevamos a cabo exámenes psicométricos para orientar a cada persona en el puesto en el que mejor se desempeña.\n" +
                                "•\tLlevamos a cabo planes de capacitación y desarrollo continuos para nuestros líderes y toda nuestra gente. \n" +
                                "•\tDefinimos las responsabilidades de cada uno y nos aseguramos de la difusión de los Manuales de Organización, Procedimientos Seguros de Trabajo y de las Descripciones de Puesto. \n" +
                                "•\tDefinimos una distribución adecuada de cargas de trabajo, con jornadas de trabajo definidas acorde a las leyes aplicables.\n" +
                                "•\tReconocemos y evaluamos de forma periódica el desempeño de nuestros colaboradores, brindamos retroalimentación como parte de nuestra forma de trabajo y determinamos el reconocimiento o beneficios a los colaboradores sobresalientes.\n"}
                            </Text>
                            <Text style={{paddingLeft:0,textAlign: 'justify', fontFamily: "Poligon_Regular"}}>
                                {'Los líderes de Grupo México en todos los niveles de la organización son los principales responsables de aplicar, cumplir y hacer cumplir esta política, apoyados por nuestra estructura de Gobierno Corporativo, las Políticas de la empresa, estructura Organizacional, Contratos y Reglamentos de Trabajo, así como las Leyes, Reglamentos y Normas que rigen en los países donde tenemos presencia. Hacemos esfuerzos continuos para la difusión y capacitación de nuestros Líderes en esta materia.'}
                            </Text>
                            <View style={{flexDirection:'row',width:width}}>
                                <View style={{flex:1}}>
                                    <Image resizeMode={'contain'}
                                           style={{width: textSizeRender(32),height:textSizeRender(32), marginLeft: 10}}
                                           source={require('../../assets/firmaOGR.png')}/>
                                </View>
                                <View style={{flex:1}}>
                                    <Image resizeMode={'contain'}
                                           style={{width: textSizeRender(32),height:textSizeRender(32), marginLeft: 10}}
                                           source={require('../../assets/firmaXGQ.png')}/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{flex: 0, padding: 20,justifyContent:'center'}}>
                    <View style={{paddingHorizontal: 15, paddingVertical: 0,flexDirection:'row',alignItems:'center'}}>
                        <Checkbox
                            size="lg"
                            value={check}
                            onChange={va=>setCheck(va)}
                        />

                        <Text style={{fontSize:textSizeRender(2.5),marginLeft: 10, color: props.app.color, fontFamily: "SharpGroteskBook"}}>
                            Confirmo que he recibido y comprendido la Política de Bienestar.
                        </Text>

                    </View>
                    <Button size={'lg'}
                            isDisabled={!check}
                            _light={{
                                borderColor: props.app.colorNom35,
                                borderWidth: 2,
                                bg: props.app.colorNom35,
                                _text: {
                                    fontSize: textSizeRender(4.3),
                                    color: props.app.fontColor, fontFamily: 'Poligon_Bold'
                                }
                            }}
                            _pressed={{
                                borderColor: props.app.colorNom35Hover,
                                borderWidth: 0,
                                bg: props.app.colorNom35Hover,
                                _text: {
                                    fontSize: textSizeRender(4.3),
                                    color: props.app.fontColor
                                }
                            }}
                        /***fin***/
                            style={{marginTop: 20}} onPress={() => {
                        props.navigation.navigate("SociodemographicPage")
                    }}>Continuar</Button>
                </View>
            </View>
        </MainLayout>
    )
}
const mapState = (state) => {
    return {
        nom035: state.nom035,
        app: state.app
    }
}

export default connect(mapState)(GeneralPoliciesScreen);
