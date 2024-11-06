import React,{ useState,useEffect,useRef } from 'react'
import { View, Text,Image,StyleSheet,Dimensions,TouchableOpacity,ScrollView } from 'react-native'
 
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

const images = [
  { uri: require('../assets/about.jpg')},
  { uri: require('../assets/about2.jpg') }, 
  { uri: require('../assets/about15.jpg')},
  { uri: require('../assets/about.jpg')},
];

const About = ({navigation}) => {
	 const scrollViewRef = useRef(null);
	 const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: activeIndex * width, animated: true });
    }
  }, [activeIndex]);
	return (
	<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View style={{width: '100%',height:70,backgroundColor: '#267147',flexDirection: 'row' }} >
				<TouchableOpacity style={{ marginHorizontal:15,marginVertical:20}} onPress={()=>navigation.goBack()}>
					<Image source={require('../assets/a1.png')} style={{width:14,height:12,}} />
				</TouchableOpacity>
				<Text style={{ marginHorizontal:58,marginVertical:22,color: '#fff',fontFamily:"Roboto",fontSize:20}} >A propos de ADGY</Text>
			</View>

					 <View style={{ width }}>
				              <ScrollView
				                horizontal
				                pagingEnabled
				                showsHorizontalScrollIndicator={false}
				                style={styles.swiper}
				                ref={scrollViewRef}
				              >
				                {images.map((image, index) => (
				                  <View key={index} style={styles.child}>
				                    <Image source={image.uri} style={{ width, height: 230 }} />
				                  </View>
				                ))}
				              </ScrollView>
				            </View>
					<Text style={{ 
						marginVertical:22,
						color: '#000',
						fontFamily:"Roboto",
						fontSize:15,
						textAlign:'center',
						width: '100%',
						fontWeight: 'bold',
					}} >
					Mission & Vision
					</Text>
					<Text style={{marginHorizontal:15}} >
						‘’ADGY : Est une association apolitique et laïque à but non lucratif. Elle ne
								remplace pas les associations déjà existantes. Elle ne s’occupe que des sujets de
								développement dont la solution à un impact visible et palpable sur
								l’amélioration des conditions de vie des populations du groupement
								Yemessomo.
						</Text>
						<Text style={{marginHorizontal:15,marginVertical:22}}>
								Son siège est à Momebelenga I chef-lieu du groupement Yemessomo dans
								l’arrondissement d’Awae, département de la Mefou-Afamba, région du Centre,
								sa durée est indéterminée.

						</Text>

						

						<Text style={{marginHorizontal:15,marginVertical:22,color: '#000',fontSize:20,...styles.shadow,width:50,borderRadius:50,padding:10}}>
						    0 1
						</Text>
						<Text style={{marginHorizontal:15,marginVertical:22,color:'#000',fontWeight:'bold'}}>
							Développer le groupement
					    </Text>

					    <View style={{marginHorizontal:15}}>
							<Image source={require('../assets/about.jpg')} style={{padding:25,backgroundColor:'#fff',borderColor: '#dee2e6',borderStyle: 'solid' ,borderWidth: 1,borderRadius: 25,maxWidth: '100%',height:300 }} />
						</View>


						<Text style={{marginHorizontal:15,marginVertical:22,color: '#000',fontSize:20,...styles.shadow,width:50,borderRadius:50,padding:10}}>
						    0 2
						</Text>
						<Text style={{marginHorizontal:15,marginVertical:22,color:'#000',fontWeight:'bold'}}>
							Améliorer les conditions de vie des populations
					    </Text>

					    <View style={{marginHorizontal:15}}>
							<Image source={require('../assets/about4.jpg')} style={{padding:25,backgroundColor:'#fff',borderColor: '#dee2e6',borderStyle: 'solid' ,borderWidth: 1,borderRadius: 25,maxWidth: '100%',height:300 }} />
						</View>

						<Text style={{marginHorizontal:15,marginVertical:22,color: '#000',fontSize:20,...styles.shadow,width:50,borderRadius:50,padding:10}}>
						    0 3
						</Text>
						<Text style={{marginHorizontal:15,marginVertical:22,color:'#000',fontWeight:'bold'}}>
							Promouvoir le vivre ensemble et les projets entre les villages ;
					    </Text>

					    <View style={{marginHorizontal:15}}>
							<Image source={require('../assets/about5.jpg')} style={{padding:25,backgroundColor:'#fff',borderColor: '#dee2e6',borderStyle: 'solid' ,borderWidth: 1,borderRadius: 25,maxWidth: '100%',height:300,padding:10,resizeMode: 'contain' }} />
						</View>

						<Text style={{marginHorizontal:15,marginVertical:22,color: '#000',fontSize:20,...styles.shadow,width:50,borderRadius:50,padding:10}}>
						    0 4
						</Text>
						<Text style={{marginHorizontal:15,marginVertical:22,color:'#000',fontWeight:'bold'}}>
							Assister les membres lors des évènements heureux et malheureux ;
					    </Text>

					    <View style={{marginHorizontal:15}}>
							<Image source={require('../assets/about10.jpg')} style={{padding:25,backgroundColor:'#fff',borderColor: '#dee2e6',borderStyle: 'solid' ,borderWidth: 1,borderRadius: 25,maxWidth: '100%',height:300 }} />
						</View>

					<View style={{height:350,backgroundColor:'#267147',width,marginTop:20}}>
						<View style={{flexDirection:'row',justifyContent:'center',marginTop:10  }} >
							<Image source={require('../assets/bg_green3.png')} style={{width:50,height:50,borderRadius:50,padding:10}} />
							<Text style={{marginLeft:10,fontSize:20,fontFamily:'Roboto',fontWeight:'bold',color: '#fff',marginVertical:13}} >ADGY</Text>
						</View>

						<Text style={{textAlign:'left',fontSize:20,fontFamily:'Roboto',color: '#fff',marginHorizontal:10}} >Est une association apolitique et laïque à but non lucratif. des populations du groupement
							Yemessomo
						</Text>

						<View style={{flexDirection:'row',marginTop:10,marginHorizontal:15,justifyContent: 'space-between',  }} >
							<AntDesign name="google" size={24} color="#fff" />

							<FontAwesome name="facebook" size={24} color="#fff" />

							<FontAwesome name="instagram" size={24} color="#fff" />
						</View>

							<Text style={{textAlign:'left',fontSize:20,fontFamily:'Roboto',color: '#fff',marginHorizontal:10,marginTop:10}} >Nos Contact
						</Text>

						<View style={{flexDirection:'column',marginTop:10,marginHorizontal:15  }} >
								<View style={{flexDirection:'row',marginHorizontal:10,marginBottom:10}}>
									<FontAwesome name="home" size={24} color="#fff" />
									<Text style={{textAlign:'left',fontSize:20,fontFamily:'Roboto',color: '#fff',marginVertical:5}}> Yemessomo</Text>
								</View>
							
								<View style={{flexDirection:'row',marginHorizontal:10,marginBottom:10}}>
									<Ionicons name="call" size={24} color="#fff" />
									<Text style={{textAlign:'left',fontSize:20,fontFamily:'Roboto',color: '#fff',marginVertical:5}}> +237 652 35 21 01 / 659 29 15 70 </Text>
								</View>


								<View style={{flexDirection:'row',marginHorizontal:10,marginBottom:10}}>
									<Ionicons name="mail-open" size={24} color="#fff" />
									<Text style={{textAlign:'left',fontSize:20,fontFamily:'Roboto',color: '#fff',marginVertical:1}}> adyyemessomo@gmail.com</Text>
								</View>
							
						</View>
						<View style={{width,height:50,backgroundColor:'#75d18f'}} >
						<Text style={{color: '#fff',marginVertical:15,textAlign:'center',fontFamily:'Roboto',}} >Association de Développement du Groupement Yemessomo</Text>
						</View>
					</View>
					
		</ScrollView>
	)
}

export default About

const styles = StyleSheet.create({
    video:{
        width,
        height:"100%",
        position:'relative',
        top:8,
        left:0,
        padding:20 
        
    },
    container:{
        backgroundColor:"#fff",
        justifyContent:"center"
    },
    shadow:{
    shadowOffset: {
      width: 0,
      height:10
    },
    shadowRadius:5,
    shadowColor:'#000000',
    shadowOpacity: 0.50,
  },
  content: { flex: 1, backgroundColor: '#fff' },
  child: { width,height: 300},
  image: { width, height: 300 },
    swiper: {
   flex: 1,
  },
})