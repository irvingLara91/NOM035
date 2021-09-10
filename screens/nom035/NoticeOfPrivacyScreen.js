import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {ScrollView, Text, View} from "react-native";
import {Button, Checkbox} from "native-base";
import {connect} from "react-redux";
import {initResponseNom035, responseQuestion, saveRsponseSocio} from "../../redux/ducks/nom035Duck";
import {textSizeRender} from "../../utils/utils";
import moment from "moment";

const NoticeOfPrivacyScreen = (props) => {

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
                            <Text style={{textAlign:'justify',fontFamily: "Poligon_Regular"}}>
                                <Text style={{textAlign:'justify',fontFamily: "Poligon_Bold"}}>{"1. “Responsable” del tratamiento de sus datos personales.\n\n"}</Text>
                                {"" +
                                "@-HIUMAN, S.A. de C.V, es la persona moral que de acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) se entiende como el “Responsable” ya que decide sobre el tratamiento de los datos personales que recaba de usted, como “Titular” de los mismos, entendiéndose como “Titular” la persona física a quien corresponden los datos personales, y por estos últimos, cualquier información concerniente a una persona física identificada o identificable.\n\n" +
                                "Para el “Responsable”, el tratar sus datos de manera legítima y en apego a la Ley Federal de la Materia, resulta un tema prioritario. Este Aviso de Privacidad complementa cualesquiera otros avisos de privacidad simplificados o cortos que el “Responsable” haya puesto a su disposición por ser el titular de sus datos personales y resulta supletorio en todo aquello que expresamente no refieran tales avisos, y al respecto le informamos lo siguiente:\n" +
                                " \n"}
                            </Text>

                            <Text style={{textAlign:'justify',fontFamily: "Poligon_Regular"}}>
                                <Text style={{textAlign:'justify',fontFamily: "Poligon_Bold"}}>
                                {"2. Domicilio del “Responsable”.\n\n"}
                            </Text>
                                {"Avenida Insurgentes Sur 933, Piso 4, Colonia Nápoles, código postal 03810, Ciudad de México.\n" +
                                "Dicho domicilio es el establecido por el “Responsable” para oír y recibir notificaciones.\n" +
                                " \n\n"}
                            </Text>

                            <Text style={{textAlign:'justify',fontFamily: "Poligon_Regular"}}>
                                <Text style={{textAlign:'justify',fontFamily: "Poligon_Bold"}}>
                                    {"3. Datos personales que se utilizarán y fines.\n\n"}
                                </Text>
                                {"¿Para qué fines utilizaremos sus datos personales?\n\n" +
                                "Los datos personales que recabaremos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:\n\n" +
                                "\t\t•\tComercialización de nuestros productos y \n\t\t\t\tservicios\n" +
                                "\t\t•\tGestión y administración de recursos humanos\n" +
                                "\t\t•\tServicios de selección, reclutamiento,\n\t\t\t\tcapacitación y desarrollo de persona\n\n" +
                                "¿Qué datos personales utilizaremos para estos fines?\n\n" +
                                "Para llevar a cabo las finalidades descritas en el presente Aviso de Privacidad, utilizaremos los siguientes datos personales:\n\n" +
                                "\t\t•\tNombre (s) y apellidos.\n" +
                                "\t\t•\tDomicilio\n" +
                                "\t\t•\tEstado civil\n" +
                                "\t\t•\tFecha de nacimiento\n" +
                                "\t\t•\tNúmeros telefónicos\n" +
                                "\t\t•\tDirecciones de correo electrónico\n" +
                                "\t\t•\tDatos laborales\n" +
                                "\t\t•\tDatos académicos\n\n" +
                                "Además de los datos personales mencionados anteriormente, para las finalidades informadas en el presente Aviso de Privacidad, utilizaremos los siguientes datos personales considerados como sensibles, que requieren de especial protección:\n\n" +
                                "\t\t•\tDatos de cuentas bancarias\n" +
                                "\t\t•\tDatos de su situación fiscal\n" +
                                "\t\t•\tDatos de su estado de salud\n" +
                                "\t\t•\tResultados de evaluaciones realizadas en \n\t\t\t\tlos diversos módulos de nuestros sistemas\n\n" +
                                "Sus datos personales también podrán utilizarse para los siguientes fines que, aunque no son necesarios para el servicio que solicita, nos permiten y facilitan brindarle una mejor atención:\n\n" +
                                "\t\t•\tAtención al cliente en línea mediante plataforma\n\t\t\t\telectrónica (sitio web)\n" +
                                "\t\t•\tAplicación de encuestas y evaluaciones\n\t\t\t\tpara mejorar la calidad de los productos y\n\t\t\t\tservicios que ofrecemos\n" +
                                "\t\t•\tFines mercadotécnicos, estadísticos, de\n\t\t\t\t marketing o de prospección comercial\n\n" +
                                "En caso de que no desee que sus datos personales sean tratados para los fines adicionales antes indicados, podrá solicitarlo a través de los mecanismos de atención establecidos en el presente aviso de privacidad.\n"}
                            </Text>

                            <Text style={{textAlign:'justify',fontFamily: "Poligon_Regular"}}>
                                <Text
                                    style={{textAlign:'justify',fontFamily: "Poligon_Bold"}}>{"4. Transferencias de datos personales dentro de México y al extranjero.\n\n"}</Text>
                                {"Los datos personales que se registren en nuestro sitio web www.grupohuman.com, para efectos de su respaldo, almacenamiento y servicios de seguridad por proveedores de tecnología de la información, así como por la administración del sitio web y el análisis de dichos datos, se compartirían fuera del país, con la o las sociedades que se requiriera, pertenecientes a la Red global de @-HUMAN, S.A. de C.V., por lo que es importante que usted esté enterado, de que sus datos se encuentran protegidos en virtud de que dichas sociedades operan y cuentan con una Política de Protección de Datos Personales y también con una Política de Protección de Datos y Privacidad; en el entendido de que en caso de remisión y/o transferencia de datos entre sociedades pertenecientes a la Red global de @-HUMAN, S.A. de C.V., no se requiere el consentimiento de usted como titular de los datos, por ser uno de los supuestos previstos en el artículo 37 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.\n\n" +
                                "Salvo lo anterior, le reiteramos que no transferiremos datos personales a terceros para su divulgación o comercialización.\n"}
                            </Text>



                            <Text style={{textAlign:'justify',fontFamily: "Poligon_Regular"}}>
                                <Text
                                    style={{textAlign:'justify',fontFamily: "Poligon_Bold"}}>{"5. Medios para ejercer los Derechos de Acceso, Rectificación, Cancelación y Oposición (Derechos  ARCO).\n\n"}</Text>
                                {"" +
                                "Cómo puede Acceder Rectificar o Cancelar sus datos personales, ¿u Oponerse a su uso?\n" +
                                "Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada conforme a los principios, deberes y obligaciones previstas en la normativa (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.\n" +
                                "Para atender cualquier solicitud acerca del ejercicio de sus derechos ARCO, para la revocación del consentimiento que haya otorgado para el tratamiento de sus datos personales, para limitar el uso o divulgación de sus datos, o acerca de las finalidades para el tratamiento de sus datos personales, ponemos a su disposición nuestro Departamento de Privacidad, en los siguientes medios de contacto:\n" +
                                "Correo electrónico: proteccion@grupohuman.com\n\n" +
                                "Para poder comunicarnos con usted, necesitamos los siguientes datos personales y de contacto en su solicitud:\n\n" +
                                "\t\t•\tNombre y apellidos del titular\n" +
                                "\t\t•\tCarta de autorización en caso de que la solicitud\n\t\t\t\tla haga otra persona que no sea el titular\n" +
                                "\t\t•\tCopia de identificación del titular\n" +
                                "\t\t•\tCorreo electrónico\n" +
                                "\t\t•\tTeléfono\n\n" +
                                "Después de recibir su solicitud, recibirá nuestra respuesta en un plazo máximo de veinte días hábiles por los medios de contacto que nos proporcione.\n\n" +
                                "¿Cómo puede revocar su consentimiento para el uso de sus datos personales?\n\n" +
                                "Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal queramos seguir tratando sus datos personales. Asimismo, usted deberá considerar que para ciertos fines, la revocación de su consentimiento implicará que no le podamos seguir prestando el servicio que nos solicitó, o la conclusión de su relación con nosotros.\n\n" +
                                "Para conocer el procedimiento y requisitos para la revocación de su consentimiento, usted podrá ponerse en contacto con nuestro Departamento de Privacidad a través de los medios especificados en el presente aviso.\n\n" +
                                "¿Cómo puede limitar el uso o divulgación de su información personal?\n\n" +
                                "Si usted desea limitar el uso o divulgación de su información personal podrá solicitarlo a nuestro Departamento de Privacidad a través de los medios especificados en el presente aviso.\n\n" +
                                "Adicionalmente, podemos poner a su disposición procedimientos y mecanismos específicos mediante los cuales puede limitar el uso de su información personal. Estos procedimientos y \n\n" +
                                "mecanismos específicos se informarán a través de los medios que utilicemos para comunicarnos con usted u otros que consideremos adecuados.\n\n"}
                            </Text>

                            <Text style={{textAlign:'justify',fontFamily: "Poligon_Regular"}}>
                                <Text style={{textAlign:'justify',fontFamily: "Poligon_Bold"}}>{"6. Uso de Cookies y tecnologías de rastreo\n\n"}</Text>
                                {
                                    "Las cookies son pedazos de información en forma de pequeños archivos que se localizan en su disco duro y son generados por nuestro sitio web. Existen dos tipos de cookies que se utilizan en este sitio:\n\n" +
                                "•\tCookies de sesión (Transient): estas cookies seeliminan cuando cierra su navegador, y no recopila información desde su ordenador. Este tipo de cookie suele almacenar información en forma de una sesión de identificación que no identifica personalmente al usuario.\n\n" +
                                "•\tCookies persistentes (Permanente/Almacenada): este tipo de cookies se almacenan en su disco duro hasta que estas expiran o hasta que usted las elimine. Estas cookies se utilizan para recopilar información sobre la identificación del usuario, tales como el comportamiento cuando navega en internet o las preferencias del usuario dentro de un sitio en específico.\n\n" +
                                "Si usted prefiere deshabilitar las cookies completamente, lo puede hacer en la mayoría de los exploradores de internet. Tenga en cuenta que este sitio puede dejar de funcionar correctamente al hacerlo. En las versiones más recientes de los exploradores Mozilla Firefox, Internet Explorer y Google Chrome, la opción para deshabilitar las cookies se encuentra en la sección de “Privacidad” en las opciones de configuración de cada explorador.\n\n" +
                                "Le informamos que las cookies y otras tecnologías de rastreo las utilizamos para las siguientes finalidades:\n\n" +
                                "\t\t\t•\tPara permitir el registro e inicio de sesión en nuestro sitio\n\n" +
                                "La información protegida bajo la Ley Federal de Protección de Datos Personales en Posesión de los Particulares que ingrese a nuestro chat de esta página web, se encuentra protegida en los mismo términos que la información que ingrese en la misma con y para los fines que han quedado establecidos en el presente aviso.\n\n"
                               }
                            </Text>

                            <Text style={{textAlign:'justify',fontFamily: "Poligon_Regular"}}>
                                <Text style={{textAlign:'justify',fontFamily: "Poligon_Bold"}}>{"7. Modificaciones al aviso de privacidad.\n\n"}</Text>
                                {"El presente Aviso de Privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.\n\n" +
                                "¿Cómo puede conocer los cambios a este Aviso de Privacidad?\n\n" +
                                "Los cambios al Aviso de Privacidad se informarán a través de este sitio web.\n"}
                            </Text>

                            <Text style={{textAlign:'justify',fontFamily: "Poligon_Regular"}}>
                                <Text style={{textAlign:'justify',fontFamily: "Poligon_Bold"}}>{"8. Derecho de promover los procedimientos de protección de derechos y de verificación que sustancia el INAI.\n\n"}</Text>
                                {"Cualquier queja o información adicional respecto al tratamiento de sus datos personales o duda en relación con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares o con su Reglamento, podrá dirigirla al Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).\n" +
                                " \n\n\n" +
                                "Fecha de última actualización: abril de ."+moment().year()+"\n\n" +
                                "\n\n" +
                                "Este sitio web cuenta con el sistema KHOR- A PEOPLE MANAGEMENT FRAMEWORK® bajo licencia temporal concedida por su titular a @-HIUMAN S.A DE C.V., quien derivado del uso de dicha licencia, será responsable de cumplir con lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de Particulares."}
                            </Text>
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
                                He leído el Aviso de privacidad y estoy de acuerdo con los términos de uso del sitio.
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
                                props.navigation.navigate("GeneralPoliciesScreen")
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

export default connect(mapState)(NoticeOfPrivacyScreen);
