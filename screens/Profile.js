import React,{useEffect} from 'react'
import { View, Text,ScrollView,TouchableOpacity,StatusBar,Dimensions,Image,StyleSheet  } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({route,navigation}) => {
    const {image,name,status,email,numero} = route.params 

    useEffect(() => {
        console.log(image)
    }, [])
  const [medias, setMedias] = React.useState([
   {id:1,nom:"PHOTOS",active:true},
   {id:2,nom:"MEDIAS",active:false},
  ])

   const president = [
    "Il représente l’association dans les actes de la vie civile et publique ;",
    "Il convoque les assemblées générales ordinaires et extraordinaires qu’il préside ;",
    "Il coordonne l’action du bureau exécutif ;",
    "Il assure l’application du présent statut et diffuse les résolutions issues des sessions ;",
    "Il a pleine autorité pour modérer les débats et assurer le maintien de l’ordre au cour des réunions du bureau exécutif de l’assemblée générale ;",
    "Il rend compte à l’assemblée générale des actes et engagements pris au nom de l’association ;",
    "Il peut déléguer certains de ses pouvoirs au vice-président ;",
    "Il est l’ordonnateur des dépenses et contre signe toute entrée et sortie d’argent ;",
    "Il est d’office membre de toutes les commissions qui peuvent être créées en dehors de la commission de contrôle (Audit) et de la commission électorale ;",
    "Il approuve et coordonne tous les projets de développements ;",
    "Il a tous les pouvoirs de diriger l’association."
  ];

      const vice = [
    "C’est la deuxième autorité de l’organe exécutif",
    " Il assiste le président dans l’exercice de ses fonctions ;",
    "Il assure l’intérim en cas d’absence du président ;",
    "Il reçoit délégation des pouvoirs du président",
  ];


       const sg = [
    "Il assure l’administration permanente de l’association",
    " Il assure le secrétariat lors du bureau exécutif et de l’assemblée générale ;",
    "Il prépare et notifie les réunions convoquées par le bureau exécutif ou assemblée générale ;",
    "Il exécute ou fait exécuter, tous les travaux que l’association pourrait recueillir, en vue de s’acquitter efficacement de ses missions ;",
    "Il prépare toutes les réunions et en rédige les rapports et procès-verbaux ;",
    "Il rédige les actes et correspondances de l’association et donne lecture des rapports ;",
    "Il assure la conservation de la documentation de l’association ;",
    "Il peut déléguer certains de ses pouvoirs au secrétaire général adjoint."
  ];

     const sga = [
    "Il assure les fonctions du Secrétaire General en cas d’absence ou de vacance de celui-ci",
    " Il reçoit délégation des pouvoirs du Secrétaire General.",
  ];

  return (
  <ScrollView>
    <View style={{flex:1,backgroundColor:'#fff'}} >
                <TouchableOpacity style={{position:"absolute",top:30,left:10,zIndex:9999}} onPress={()=>navigation.goBack()}>
                    <Image source={require('../assets/a1.png')} style={{width:14,height:12,}} />
                </TouchableOpacity>
       <Image style={{width:windowWidth,height:windowHeight / 4}} 
       source={{uri:image}}
       resizeMode="cover" 
       />

       <Image style={{
        width:100,
        height:100,
        position:"absolute",
        top:140,
        right:0,
        left:0,
        zIndex: 1,
        padding:10,
        marginLeft:20,
        borderRadius:50,
        borderWidth: 2,
        borderColor: '#fff'
      }} 
       source={{uri:image}}
       resizeMode="contain" 
       />
       <View style={{
        position:"absolute",
        bottom:400,
        right:20,
        zIndex: 1,
        flexDirection:"row",
        justifyContent:'space-between',
      }}>
         <Entypo name="star-outlined" 
         style={{
          backgroundColor:'#f5fffa',
          borderRadius:50,
          padding:8,
          borderWidth:0.5,
          borderColor:"#e3e3e3",
          marginRight:12,
          textAlign:"center"
        }} size={24} color="#00bfff" />
         <FontAwesome name="share-square-o" 
         style={{
          backgroundColor:'#f5fffa',
          borderRadius:50,
          padding:8,
          borderWidth:0.5,
          borderColor:"#e3e3e3",
          textAlign:"center"
        }} size={24} color="#00bfff" />
       </View>
       <View style={{marginTop:94,marginHorizontal:15}} >
          <Text style={{fontSize:20,fontWeight:'bold'}} >{name} @</Text>
          <Text style={{fontSize:15,color:"grey",marginBottom:10}} >@fdsdf-vu pour la dernierre fois il y'a 12 heures</Text>
          <Text style={{fontSize:20,marginBottom:1}} >CEO {email}...</Text>
          <Text style={{fontSize:15,color:"#00bfff",marginBottom:10}} >plus d'informations...</Text>
          

           <Text style={{
                fontSize:20,
                color:'grey',
                marginBottom:10,
              }} >
            Status
          </Text>
           <View style={{
                  backgroundColor:"#00aff0",
                  borderRadius:20,
                  padding:20,
                  flexDirection:"row",
                  justifyContent:'space-between'
                }} >
              <Text style={{color:"#fff"}} >Mobile </Text>
              <Text style={{color:"#fff"}} >{numero}</Text>
           </View>

           <View style={{
                  flexDirection:"row",
                  justifyContent:'space-between',
                  marginTop:20,
                  borderWidth:1,
                  borderColor:"#c3c3c3",
                }}>
                  
                  <TouchableOpacity style={{
                    padding:20,
                    borderRightWidth:1,
                    borderColor:"#c3c3c3",
                  }} >
                      <Text style={{textAlign:"center"}} >Postes</Text>
                      <Text style={{textAlign:"center"}} >{status}  </Text>
                  </TouchableOpacity>

                  {
                    status == "président" ? (
                        <ScrollView contentContainerStyle={styles.container}>
                          {president.map((item, index) => (
                            <View key={index} style={styles.listItem}>
                              <Ionicons name="checkmark" size={24} color="green" />
                              <Text style={styles.listText}>{item}</Text>
                            </View>
                          ))}
                        </ScrollView>
                        ) : (null)
                  }

                    {
                    status == "vice-président" ? (
                        <ScrollView contentContainerStyle={styles.container}>
                          {vice.map((item, index) => (
                            <View key={index} style={styles.listItem}>
                              <Ionicons name="checkmark" size={24} color="green" />
                              <Text style={styles.listText}>{item}</Text>
                            </View>
                          ))}
                        </ScrollView>
                        ) : (null)
                  }

                 {
                    status == "vice-président" ? (
                        <ScrollView contentContainerStyle={styles.container}>
                          {vice.map((item, index) => (
                            <View key={index} style={styles.listItem}>
                              <Ionicons name="checkmark" size={24} color="green" />
                              <Text style={styles.listText}>{item}</Text>
                            </View>
                          ))}
                        </ScrollView>
                        ) : (null)
                  }

           </View>

          
       </View>
    </View>
  </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listText: {
    marginLeft: 10,
    fontSize: 16,
  },
});