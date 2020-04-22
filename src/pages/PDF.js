import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';


const ExternalProfile = (props) => {
    const stripJumps = (s) => s.split('').map(l => l.charCodeAt(0) === 10 ? " " : l).join('');

    //Funcion para que se permita solo un nombre y un apellido
    const stripName = (s) => {
        let arr =  s.split(' ')
        if(arr.length > 0){
            return arr[0]
        } else {
            return s.join(' ')
        }
    }

    //Funcion para que retornar skill level
    const convertSkill = (s) => {
        s.replace("[^0-9a-zA-Z]+", "");
        if(s < "80" && s > "50"){
            return "Intermediate"
        } else if( s < "50" ){
            return "Basic"
        } else {
            return "Advanced"
        }
    } 
 return <Document>
    <Page style={styles.body}>
      <View style={styles.dflex}>
        <View style={styles.studenName}>
          <Text style={styles.name}>{props.node.basic_info.first_name != undefined ? stripName(props.node.basic_info.first_name.toUpperCase()): "FIRST NAME"}</Text>
          <Text style={styles.lastname}>{props.node.basic_info.last_name != undefined ? stripName(props.node.basic_info.last_name.toUpperCase()): "LAST NAME"}</Text>
          <Text style={styles.career}>Software Developer</Text>
        </View>
        <View style={styles.contactInfoView}>
         <View style={styles.dflex}>
          <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/480px-Octicons-mark-github.svg.png' style={styles.img}/>
          <Text style={styles.contactInfoText}>{props.node.basic_info.github != undefined ? props.node.basic_info.github : "Your Github"}</Text>
          </View>
          <View style={styles.dflex}>
          <Image src='https://cdn4.iconfinder.com/data/icons/squared-line-communication/64/mail-circle-512.png' style={styles.img}/>
          <Text style={styles.contactInfoText}>{props.node.basic_info.email != undefined ? props.node.basic_info.email: "Your Email"}</Text>
          </View>
          <View style={styles.dflex}>
          <Image src='https://cdn2.iconfinder.com/data/icons/font-awesome/1792/phone-512.png' style={styles.img}/>
          <Text style={styles.contactInfoText}> { props.node.basic_info.phone != undefined ?  props.node.basic_info.phone : "Your Phone" }</Text>
          </View>
          <View style={styles.dflex}>
          <Image src='https://cdn.onlinewebfonts.com/svg/img_408253.png' style={styles.img}/>
           <Text style={styles.contactInfoText}>{props.node.basic_info.linkedin != undefined ? props.node.basic_info.linkedin : "Your Linkedin"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.pb}>
        <Text style={styles.titleB}>SUMMARY</Text>
        <Text style={styles.descriptionD}>{stripJumps(props.node.basic_info.summary)}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.skills}>
          <Text style={styles.title}>SKILLS</Text>
          <View>
            <Text style={styles.subtitle}>TOOLSET</Text>
            {props.node.skills.toolset != null ? props.node.skills.toolset.map((item,i) => <Text style={styles.description} key={i}>{item.name + " - " + convertSkill(item.level)}</Text>) : <Text style={styles.description}>Python - Intermediate</Text>}
          </View>
          <View>
            <Text style={styles.subtitle}>PROJECTS</Text>
           {
            props.node.projects.assignments != null ?
            props.node.projects.assignments.map((item, i) => 
           <View key={i}>
              <Text style={styles.descriptionC}>{item.title != null ? item.title.toUpperCase(): <Text style={styles.description}>Item Title</Text>}</Text>
              <Text style={styles.description}>{item.link}</Text>
              <Text style={styles.description}>{item.tagline}</Text>
            </View>
            ) :<Text style={styles.description}>Python - Intermediate</Text>
            }
            </View>
            <View>
            <Text style={styles.subtitle}>LANGUAGES</Text>
             {props.node.basic_info.languages != null ? props.node.basic_info.languages.map((item, i) => <Text style={styles.description} key={i}>{item.idiom + " - " + item.level}</Text>) : <Text style={styles.description}>Item Title</Text>}
            </View>
          </View>
        <View style={styles.experience}>
          <Text style={styles.title}>EXPERIENCE</Text>
          {props.node.experiences != null ? props.node.experiences.map( (item, i) =>
          <View key={i}>
              <Text style={styles.sub}>{item.role}</Text>
              <View style={styles.section}>
                <Text style={styles.description}>{item.company.toUpperCase()}</Text>
                <Text style={styles.descriptionB}>Time {item.time}</Text>
              </View>
              <Text style={styles.descriptionD}>{stripJumps(item.details)}</Text>
          </View>) : <Text style={styles.description}>Python - Intermediate</Text>}
            <Text style={styles.title}>EDUCATION</Text>
            <View>
              {props.node.education != null ? props.node.education.map( (item, i) => 
              <View style={styles.div} key={i}>
                <Text style={styles.sub}>{item.degree != null ? item.degree.toUpperCase() : <Text style={styles.description}>Item Title</Text>}</Text>
             <View style={styles.section}>
                <Text style={styles.description}>{item.university.toUpperCase()}</Text>
                <Text style={styles.descriptionB}>{item.time}</Text>
              </View>
                <Text style={styles.descriptionD}>{item.details != null ? stripJumps(item.details) : "Details here"}</Text>
              </View>) 
               : <Text style={styles.description}>Item Title</Text>}
            </View>
        </View>
      </View>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
}


const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  name: {
    fontSize: 30,
    textAlign: 'left',
    letterSpacing: 1.2
  },
  lastname: {
    fontSize: 30,
    textAlign: 'left',
    letterSpacing: 1.2,

  },
  career: {
    fontSize: 10,
    textAlign: 'left',
    marginBottom: 40,
  },
  dflex: {
    display: "flex",
    flexDirection: "row"
  },
  contactInfoText: {
    fontSize: 12,
    textAlign: 'left',
    marginTop:5,
    marginLeft:5
  },
  contactInfoView: {
    paddingLeft: 45,
    width:"60%"
  },
  avatar: {
    paddingLeft: 125,
    maxHeight: "2in",
    maxWidth: "3.5in"
  },
  sectionA: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 15
  },
  section: {
    display: "flex",
    flexDirection: "row",
    paddingBottom:2.5,
    paddingTop:2.5
  },
  divB: {
      width:"100%"
  },
  skills: {
    width: "40%"
  },
  experience: {
    width: "60%",
    border:"solid",
    marginLeft:10,
    borderLeft:1,
    borderLeftColor: "orange",
    paddingLeft: 10
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'left',
    letterSpacing: 1.2,
    paddingBottom: 5,
    paddingTop: 5,
    textDecoration:"underline",
    textDecorationColor:"orange"
  },
  sub: {
    fontSize: 10,
    textAlign: 'left',
    paddingBottom: 5,
    paddingTop: 5,
    letterSpacing: 1.2,
    textDecoration:"underline",
    textDecorationColor:"orange"
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 1.2,
    paddingBottom:5,
    paddingTop:5,
    marginLeft: 70,
    marginRight:70,
    marginBottom:10,
    marginTop: 10,
    color: "white",
    backgroundColor:"black",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
  },
  titleB: {
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 1.2,
    paddingBottom:5,
    paddingTop:5,
    marginLeft: 160,
    marginRight:160,
    marginBottom:10,
    marginTop: 10,
    color: "white",
    backgroundColor:"black",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
  },
  descriptionD: {
    fontSize: 9,
    textAlign: 'left',
    width:"100%"
  },
   description: {
    fontSize: 9,
    textAlign: 'left',
    width:"70%",
    fontWeight:"bold"
  },
  descriptionC: {
    fontSize: 9,
    paddingBottom:5,
    paddingTop:5,
    textAlign: 'left',
    width:"100%",
    fontWeight:"bold"
  },
  descriptionB: {
    fontSize: 9,
    textAlign: "justify",
    width:"30%",
    fontWeight:"bold"
  },
  div:{
    paddingRight: 5
  },
  header: {
    fontSize: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  pb:{
      paddingBottom: 10
  },
  studenName:{
      width:"40%"
  },
  img:{
    width:20,
    height:20,
    backgroundColor:"orange",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
  }
});



export default ExternalProfile;