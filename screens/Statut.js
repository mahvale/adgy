import React,{useEffect,useRef,useState} from 'react'
import { View, Text,ImageBackground,ScrollView,TouchableOpacity,Dimensions,StyleSheet,StatusBar,Image,FlatList } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window')

const Statut = ({ navigation }) => {
const [members, setMembers] = useState([{id:1,textes:"ccc"}])
      const scrollViewRef = useRef(null);

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }; 

    useEffect(() => {
    
    }, [])
   const renderItem = ({ item }) => (
    <View style={{marginHorizontal: 10,marginTop:10}} >
            
               <Text style={{fontFamily: 'Times New Roman',fontSize:30,fontWeight: 'bold',color: '#205e23', }} >Statut et Règlement Interieur</Text>

               <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23', }}>Préambule</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> Vu la constitution de la république du Cameroun,
                    <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> No 90/053 du 19</Text>
                    <Text style={{fontFamily: 'Times New Roman',}}>décembre</Text>
                    <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> 1990</Text>
                    <Text style={{fontFamily: 'Times New Roman',}}> portant sur la liberté d’association au
Cameroun modifiée et complétée par la loi</Text>
                    <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> No 99/011 du 20 juillet 1999.</Text>
                    <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> Nous, fils, filles, amies, sympathisants du groupement Yemessomo, sans
distinction d’âge, de sexe, d’obédience religieuse ou de lieu de résidence.</Text>
                 </Text>

                 <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Considérant nos us et coutumes et soucieux de les préserver ;</Text>
                 </View>

                  <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Considérant le sous-développement des différentes familles du
                      groupement Yemessomo,</Text>
                 </View>


                <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Considérant la nécessité et l’engagement d’éradiquer le sousdéveloppement qui sévit dans le groupement ;</Text>
                 </View>

                 <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Considérant l’effet des synergies que dégage l’adage
                    <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> « l’union fait la
                        force »</Text>
                    <Text style={{fontFamily: 'Times New Roman',}}> et affirmant notre volonté de doter chaque village du groupement
                      des projets de développement et la matérialisation de ces projets ;</Text>
                   </Text>
                 </View>


                 <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Considérant notre attachement aux différents projets de développement
                        aux lois et règlements en vigueur du Cameroun,</Text>
                 </View>
                <Text style={{fontFamily: 'Times New Roman',}}> Réunis en assemblée générale au groupement Yemessomo, arrondissement
                  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> d’Awae,</Text>
                  <Text style={{fontFamily: 'Times New Roman',}}> département de la</Text>
                  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> Mefou et Afamba,</Text>
                  <Text style={{fontFamily: 'Times New Roman',}}>région du centre, le</Text>
                  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> 30 juillet
                          2023, </Text>
                  <Text style={{fontFamily: 'Times New Roman',}}> nous convenons de ce qui suit :</Text>
                </Text>

                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}> TITRE I : DISPOSITIONS GENERALES</Text>

                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}> Article I : De la création de L’ ADGY</Text>

                 <Text style={{fontFamily: 'Times New Roman',}}> Il est créé au sein du groupement Yemessomo une association dénommée</Text>

                 <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000'}}> ADGY : Association de Développement du Groupement Yemessomo </Text>

                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}> Titre II : Du but et des objectifs</Text>

                 <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> ‘’ADGY : 
                 <Text style={{fontFamily: 'Times New Roman',}}>Est une association apolitique et laïque à but non lucratif. Elle ne
                            remplace pas les associations déjà existantes. Elle ne s’occupe que des sujets de
                            développement dont la solution à un impact visible et palpable sur
                            l’amélioration des conditions de vie des populations du groupement
                            Yemessomo, les objectifs sont déclinés ainsi qu’il suit :</Text>
                </Text>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Développer le groupement</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Améliorer les conditions de vie des populationst</Text>
                </View>
                
                <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Promouvoir le vivre ensemble et les projets entre les villages ;</Text>
                </View>

               <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}>Assister les membres lors des évènements heureux et malheureux ;</Text>
                </View>

                <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}> Articles III : du siège et la durée</Text>


                  <Text style={{fontFamily: 'Times New Roman',}}>Son siège est à 
                 <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> Momebelenga I</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> chef-lieu du groupement</Text>
                 <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> Yemessomo</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}>dans
                        l’arrondissement</Text>
                  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> d’Awae, </Text>
                  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> département de la</Text>
                  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}} >Mefou-Afamba,</Text>
                  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> région du Centre,
                        sa durée est indéterminée</Text>
                </Text>

                  <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}>Article IV : du logo</Text>
                  <Text style={{fontFamily: 'Times New Roman',}}>Son logo est constitué de :</Text>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Du nom de l’association</Text>
                </View>

               <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> De la devise</Text>
                </View>

               <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   {/*sous titre*/}
                   <Text style={{fontFamily: 'Times New Roman',}}> Et de la couronne de plante</Text>
                    {/* ***sous titre*/}
                </View>

                {/*grand titre*/}

                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}>Article V : de la devise</Text>
               {/* ***grand titre*/}
                <Text style={{fontFamily: 'Times New Roman',}}>  Sa devise est
                  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> Fraternité-Engagement-Développement</Text>
                </Text>

                <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}> Article VI Des droits et devoirs : 
                 {/* titre*/}
                <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> tous les membres sont égaux en droits et
                  devoirs mais le respect des ainés est primordial.
                   {/* ****titre*/}
                  </Text>
                </Text>

                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}> Article VII : du cadre juridique</Text>
                <Text style={{fontFamily: 'Times New Roman',}}> Le présent statut régit le fonctionnement, la structuration, la charte et les
                        missions de l’association, conformément à la loi Camerounaise sur les
                        associations.</Text>

                    {/*grand titre*/}
                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}>Titre II : des membres et de l’adhésion</Text>
               {/* ***grand titre*/}

                {/*grand titre*/}
                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}>Article VIII : des membres de l’ADGY</Text>
               {/* ***grand titre*/}

                 {/*grand titre*/}
                <Text style={{marginTop:3}} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 1 :
                </Text>
              {/*sous titre*/}
                   <Text style={{fontFamily: 'Times New Roman',textDecorationLine: 'none',}}> tout fils, fille, amis, et sympathisant, du groupement
                    {/* titre*/}
                <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',textDecorationLine: 'none',}}> Yemessomo
                   {/* ****titre*/}
                    {/*sous titre*/}
                   <Text style={{fontFamily: 'Times New Roman',textDecorationLine: 'none',}}> qui
                      accepte de se soumettre aux dispositions du présent statut et textes connexes.</Text>
                    {/* ***sous titre*/}
                   </Text>
                    {/* ***sous titre*/}
                 </Text>
                 </Text>
               {/* ***grand titre*/}

               

                   {/*grand titre*/}
                <Text style={{marginTop:3}} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 2 : 
                  </Text>
                   {/*sous titre*/}
                   <Text style={{fontFamily: 'Times New Roman',textDecorationLine: 'underline', }}> 
                   Est considéré comme membre régulier et actif tout membre ayant
                          accepté le présent statut et charte relatif à la plateforme numérique, ayant
                          assisté à une assemblée générale et ayant participé financièrement à un ou
                          plusieurs projets lié au développement du Groupement.</Text>
                    {/* ***sous titre*/}
                
                 </Text>
               {/* ***grand titre*/}
                 <Text style={{marginTop:3}} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 3 :
                 </Text>
                  <Text style={{fontFamily: 'Times New Roman',textDecorationLine: 'none',}}> a qualité de membre se perd par décès ou exclusion définitive.
                L’exclusion est prononcée lors de l’Assemblée générale, sur proposition du
                bureau qui est l’organe exécutif de l’association, en cas de manquement grave à
                l’éthique du groupement et aux objectifs décrits au titre I.</Text>
                 </Text>
              
                   <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}>Titre III : structure fonctionnelle</Text>
                  <Text style={{fontFamily: 'Times New Roman',}}> Les organes de l’association sont :</Text>

                 <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> L’assemblée générale ;</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Le bureau exécutif ;</Text>
                </View>
               <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Les conseillers ;</Text>
                </View>
            <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}>Article VIII : de l’assemble générale (A G)</Text>

                            <Text style={{fontFamily: 'Times New Roman',}}> L’assemblée générale, organe suprême de l’association est composée de tous les
fils, filles, amis et sympathisants du groupement   <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> Yemessomo
                  </Text> <Text style={{fontFamily: 'Times New Roman',}}> qui remplissent les conditions de</Text>
  <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> l’Article 8, titre 2
                <Text style={{fontFamily: 'Times New Roman',}}> .La voix élective étant réservée aux membres
réguliers. A ce titre,</Text>
                  </Text> 
                  </Text>

                <Text style={{marginTop:3}} >
               <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 1 
                </Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> : elle définit la politique générale de l’association, élit les membres du
bureau exécutif et en détermine le mandat, examine, approuve les plans de
développements du dit bureau. Elle élabore, examine, amende, et adopte les
termes du statut et du règlement intérieur.</Text>

       
               </Text>

               <Text style={{marginTop:3}} > 
<Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 2  </Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> : elle préside chaque session sur proposition du bureau exécutif, par le
président ou le vice-président.</Text>
</Text>

                
          <Text style={{marginTop:3}} >      
      <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 3  </Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> : elle donne son avis sur les rapports d’activités, de développements et
financiers, et approuve les comptes de l’exercice.</Text>
                  
               </Text>

                <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 4 </Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> : : elle statue sur tous les problèmes liés au développement de
l’association, notamment :</Text>
                  
               </Text>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 1 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Les projets de développements ;</Text>
                </View>

                  <View style={{flexDirection: 'row',marginTop:15 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 2 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Les sanctions disciplinaires ;</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 3 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> La révision des comptes ;</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 4 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> La révision du statut et du règlement intérieur ;</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20}}> 5 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> La charte concernant la plate-forme numérique de l’association ;</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                   <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',textDecorationLine: 'underline',}}>6- La planification et l’organisation des projets de développements
(routes, forages, écoles, centres de santés, électrification …)</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 7 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Organisation des évènements imprévus (Maladies, deuils, Visites etc…)</Text>
                </View>

                <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 5 </Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> elle approuve les accords de coopération avec d’autres associations,
d’autres groupements poursuivant les mêmes objectifs,</Text>
</Text>
<Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 6 </Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> elle se réunit une fois par an, sauf invitation spéciale du bureau
                  exécutif à Momebelenga I groupement Yemessomo, dans l’arrondissement
                  d’Awae, département de la Mefou-Afamba, région du Centre.
                  Elle peut être convoquée en session extraordinaire, sur proposition du bureau
                  exécutif.</Text>
                  </Text>
              <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#205e23',textDecorationLine: 'underline' }}>Article X : du bureau exécutif</Text>

              <Text style={{fontFamily: 'Times New Roman',}}> Le bureau exécutif est l’organe de direction de l’association. A ce titre :</Text>

              <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',textDecorationLine: 'underline',}}> Alinéa 1 :</Text>

                <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il est responsable devant l’assemblée générale et lui rend compte de la vie
et des engagements pris au nom de l’association ;</Text>
            </View>

              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il applique la politique générale de développements arrêtée par
l’assemblée générale et veille à la matérialisation des résolutions prises ;</Text>
            </View>


              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assure la coordination, la gestion et l’animation de l’association tout au
long de sa mandature ;</Text>
            </View>


              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il est chargée de l’organisation pratique, du suivi des activités engagées
par l’association et est garant de leur pérennité ;;</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il est chargé de l’évaluation des besoins, de la collecte des contributions et
de leur bonne gestion ;</Text>
            </View>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il est responsable de la tenue des sessions de l’assemblée générale
ordinaire et extraordinaire ;</Text>
            </View>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> En fin d’exercice, il rédige un rapport détaillé. </Text>
            </View>



             <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 2 </Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> les décisions du bureau exécutif sont prises, à la majorité simple des
membres qui la composent. En cas d’égalité des voix ; celle du président et du
vice-président sont prépondérantes,</Text>  
               </Text>

        <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 3 </Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> il est composé de 14 membres élus par l’assemblée générale et des
conseillers pour un mandat d’un an dont :,</Text>  
               </Text>

             
                 <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Un président</Text> </Text>
                   <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginHorizontal:15}}>EBINI EBOZOA CLAUDE</Text>


                   <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Un vice-président</Text> </Text>
                   <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>OLOMO NKOULOU RAPHAEL MARCEL</Text>
             

                  <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Secrétaire générale</Text> </Text>
  <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>NGOA 2 BERNARD PERNODET ERIC</Text>


  <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Un secrétaire générale Adjoint</Text> </Text>
  <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>SENGUENA PAUL</Text>



  <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Trésorerie général</Text> </Text>
  <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>ABAH FRANCINE</Text>

                 

  <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Commissaire aux comptes 1</Text> </Text>
  <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>ONDOA EBINI PIERRE</Text>



<Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Commissaire aux comptes 2</Text> </Text>
  <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>MBENG ATEBA ROSINE</Text>



           
    <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Un Délégué chargé de la conception et de l’élaboration des projets</Text> </Text>
  <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>TSALA JEAN LOUIS</Text>




 <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Contrôleurs des travaux 1</Text> </Text>
  <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>MVONDO COMES</Text>




<Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Contrôleurs travaux 3</Text> </Text>
  <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>conseillers Municipaux</Text>
               


                 <View style={{flexDirection: 'row',marginTop:8 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 1 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> NKONO MBIDA MARTIN</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:8 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 2 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> BILONGO EBOZOA JACQUELINE</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:8 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 3 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> OLOMO THEOPHILE</Text>
                </View>


                  <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Censeur 1</Text> </Text>
                    <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>ONDOA EBESSA PASCALC</Text>



                    <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Censeur 2</Text> </Text>
                    <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>MVONDO GALLUS</Text>


                   <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Chargé de la communication 1</Text> </Text>
                    <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>ANGOA FIDELE</Text>


                   <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>Chargé de la communication 2</Text> </Text>
                    <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>BEKONO JULIEN</Text>

                     <Text style={{}} >  - <Text style={{fontFamily: 'Times New Roman',fontSize:20,textDecorationLine: 'underline',marginTop:3,}}>CONSEILLERS</Text> </Text>
                      <Text style={{fontFamily: 'Times New Roman',marginTop:3,marginBottom:10,marginHorizontal:15}}>OHANA JEAN PAUL</Text>

                 <View style={{flexDirection: 'row',marginTop:10, }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 1 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Chef de groupement</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 2 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Chefs traditionnels du groupement Yemessomo (7)</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 3 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> ONDOA MARC</Text>
                </View>


                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 4 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> AMBANI EBINI ALAIN</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 5 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}>  MVE MINSI MAX CONSTANT</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 6 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> ESSAMA JEAN PAUL</Text>
                </View>


                <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 7 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> TSALA ABENG</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 8 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}>  ATENGA ALEXANDRE</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 9 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> BOVOLO MATHIEU</Text>
                </View>


                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 10 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> ONDOA JEAN PAUL</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 11 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}>  EKOBO LUCIE</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 12 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> P. NGONO ARMAND</Text>
                </View>


                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 13 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> EBELA Léonie</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 14 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}>  Essinga Calixte</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 15 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Belobo Germaine Philomène</Text>
                </View>



                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 16 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}>  Fouda Anastasie</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 17 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}>  Dr. Ebini Claude</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 18 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Etoundi Guy Siméon</Text>
                </View>


                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 19 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Ele Ondoa Thomas</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 20 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}>  Zang Zang Charles Elie</Text>
                </View>

                 <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 21 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Mve Ebini Maxime</Text>
                </View>


                <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 22 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Zeh Roger</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop:10 }} >
                 <Text style={{fontFamily: 'Times New Roman',fontSize:20,}}> 23 - </Text>
                   <Text style={{fontFamily: 'Times New Roman',}}> Mengomo Aline</Text>
                </View>

                <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 4 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> le président du bureau exécutif peut en cas de besoin créer des postes
complémentaires.</Text>
               </Text>


              <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 5 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}> toute personne occupant un ou plusieurs postes dans le bureau
exécutif est soumis au principe de bénévolat</Text>
      </Text>

       <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Article XI :</Text>
                 <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',textDecorationLine: 'underline'}}> des conseillers</Text>
      </Text>

       <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 1 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',}}>  ils sont garants du respect des traditions, ils sont chargés de guider,
orienter les décisions prises par le président ou le vice-président sur les projets
liés au développement.t</Text>
      </Text>

        <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000'}}>Ils peuvent proposer des projets de développements.</Text>
               </Text>

               <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 2 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> leur désignation se fait en assemblée générale et leur nombre est
continu.</Text>
               </Text>

               <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Article XII :</Text>
                 <Text style={{fontFamily: 'Times New Roman',fontWeight: 'bold',color: '#000000',textDecorationLine: 'underline'}}> des attributions des membres du bureau exécutif</Text>
      </Text>

         <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 1 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}> du président :</Text>
               </Text>



             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il représente l’association dans les actes de la vie civile et publique ;</Text>
            </View>

              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il convoque les assemblées générales ordinaires et extraordinaires qu’il
préside ;</Text>
            </View>


              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il coordonne l’action du bureau exécutif ;</Text>
            </View>


              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assure l’application du présent statut et diffuse les résolutions issues
des sessions ;</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il a pleine autorité pour modérer les débats et assurer le maintien de
l’ordre au cour des réunions du bureau exécutif de l’assemblée générale ;</Text>
            </View>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il rend compte à l’assemblée générale des actes et engagements pris au
nom de l’association ;</Text>
            </View>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il peut déléguer certains de ses pouvoirs au vice-président ; </Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il est l’ordonnateur des dépenses et contre signe toute entrée et sortie
d’argent ;</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il est d’office membre de toutes les commissions qui peuvent être créées
en dehors de la commission de contrôle (Audit) et de la commission
électorale ; </Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il approuve et coordonne tous les projets de développements ;</Text>
            </View>

            <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il a tous les pouvoirs de diriger l’association.</Text>
            </View>



             <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 2 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}>  le Vice-Président :</Text>
               </Text>



             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> C’est la deuxième autorité de l’organe exécutif ;</Text>
            </View>

              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assiste le président dans l’exercice de ses fonctions ;</Text>
            </View>


              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assure l’intérim en cas d’absence du président ;</Text>
            </View>

            <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 3 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}>  du secrétaire général :</Text>
               </Text>


              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assure l’administration permanente de l’association ;</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assure le secrétariat lors du bureau exécutif et de l’assemblée générale ;</Text>
            </View>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il prépare et notifie les réunions convoquées par le bureau exécutif ou
assemblée générale ;</Text>
            </View>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il exécute ou fait exécuter, tous les travaux que l’association pourrait
recueillir, en vue de s’acquitter efficacement de ses missions ; </Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il prépare toutes les réunions et en rédige les rapports et procès-verbaux ;</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il rédige les actes et correspondances de l’association et donne lecture des
rapports ; </Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assure la conservation de la documentation de l’association ;</Text>
            </View>

            <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il peut déléguer certains de ses pouvoirs au secrétaire général adjoint.</Text>
            </View>




            {/*Alinea *****/}

             <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 4 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}>  Du Secrétaire General Adjoint:</Text>
               </Text>


              <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assure les fonctions du Secrétaire General en cas d’absence ou de
vacance de celui-ci</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il reçoit délégation des pouvoirs du Secrétaire General.</Text>
            </View>

              {/*Alinea *****/}

             <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 5 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}>  du Trésorier:</Text>
               </Text>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il assure la gestion permanente des ressources financières et matérielles de
l’Association </Text>
            </View>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il encaisse et assure la garde des fonds à l’aide du compte bancaire de
l’association ; </Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il effectue les mouvements sur le compte après autorisation préalable du
président, et signature conjointe du président et d’un commissaire aux
comptes ;</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il rend compte au Bureau Exécutif de tous les mouvements financiers et
en cas de nécessite, à l’Assemble générale ; </Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il tient la comptabilité de l’association, et assure la conservation des
documents afférents à sa comptabilité ;</Text>
            </View>

            <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Il contresigne tous les rapports des mouvements de fonds.</Text>
            </View>

            {/*Alinea *****/}

             <Text style={{marginTop:3}} > 
         <Text style={{fontFamily: 'Times New Roman',fontSize: 20,fontWeight: 'bold',color: '#000',textDecorationLine: 'underline', }}>Alinéa 6 :</Text>
                 <Text style={{fontFamily: 'Times New Roman',}}>  Des commissaires aux comptes:</Text>
               </Text>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Ils vérifient les valeurs et les documents comptables de l’association et
contrôlent la conformité de sa comptabilité, conformément aux règles de
l’art ; </Text>
            </View>


             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Ils procèdent à la certification de la régularité et de la sincérité des états
financiers de l’association à travers des états de rapprochement ; </Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Ils donnent une image fidèle de la situation financière et du patrimoine de
l’Association ;</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Ils font état de leurs observations dans un rapport adressé à l’Assemblée
Générale ; </Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Ils peuvent, agir ensemble ou séparément, mais ils établissent un rapport
commun. En cas de désaccord entre les commissaires, le rapport indique
les différentes opinions exprimées;</Text>
            </View>

            <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}> Ils sont chargés de la vérification et du contrôle des dépenses et tiennent
les documents financiers ;</Text>
            </View>

             <View style={{flexDirection: 'row',marginTop:15 }} >
                  <Image source={require('../assets/a2.png')} style={{width:10,height:10,resizeMode:'cover',marginVertical:3,marginHorizontal:20}} />
                   <Text style={{fontFamily: 'Times New Roman',}}>  Ils peuvent, à la demande soit du président ou de l’Assemblée Générale
présenter le rapport financier en cours d’exercice.</Text>
            </View>

        </View>
  );


  return (
  <>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
     <ImageBackground 
    style={{
        backgroundColor:"#fff",
        width,
        height,
        resizeMode: 'contain'
    }} 
    source={require('../assets/bg_green.png')} 
    >

         <View style={{flexDirection:"row",justifyContent: "center",}} >

                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color:"#000",
                        fontFamily:"Felix Titling",
                        marginLeft:10,
                        color:"darkgreen"
                    }}>
                          A
                    </Text>

                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color:"#000",
                        fontFamily:"Felix Titling",
                        marginLeft:10,
                        color:"blue"
                    }}>
                          D
                    </Text>

                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color:"#000",
                        fontFamily:"Felix Titling",
                        marginLeft:10,
                        color:"red"
                    }}>
                          G
                    </Text>

                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color:"#000",
                        fontFamily:"Felix Titling",
                        marginLeft:10,
                        color:"green"
                    }}>
                          Y 
                    </Text>

                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color:"#000",
                        fontFamily:"Felix Titling",
                        marginLeft:10,
                        color:"#000"
                    }}>
                          👋
                    </Text>

                    </View>
       
                     <FlatList
                      data={members}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                />
            </ImageBackground> 
        </ScrollView>
        <TouchableOpacity 
        onPress={()=>{navigation.navigate("Home")}}
        style={{
          backgroundColor:"#dff1e8",
          padding:20,
          ...styles.shadow,
          position:'fixed',
          bottom:0,
          width,
          borderTopColor: '#fff',
          borderTopWidth: 4,
        }} > 
          <Text style={{
                fontFamily: 'Times New Roman',
                color: '#fff',
                backgroundColor:"#205e23",
                padding:20,
                borderRadius: 10 
            }} >ACCEPTER ET COMMENCER </Text> 
            </TouchableOpacity>
             <StatusBar hidden={true} />
       </>
  )
}

export default Statut

const styles = StyleSheet.create({

    shadow:{
    shadowOffset: {
      width: 0,
      height:10
    },
    shadowRadius:5,
    shadowColor:'#000000',
    shadowOpacity: 0.50,
  },
})