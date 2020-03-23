import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';


const ExternalProfile = (props) => {
 return <Document>
    <Page style={styles.body}>
      <View style={styles.dflex}>
        <View>
          <Text style={styles.name}>{props.node.basic_info.first_name != undefined ? props.node.basic_info.first_name.toUpperCase(): "FIRST NAME"}</Text>
          <Text style={styles.lastname}>{props.node.basic_info.last_name != undefined ? props.node.basic_info.last_name.toUpperCase(): "LAST NAME"}</Text>
          <Text style={styles.career}>Software Developer</Text>
        </View>
        <View style={styles.contactInfoView}>
          <Text style={styles.contactInfoText}>Email - {props.node.basic_info.email != undefined ? props.node.basic_info.email: "Your Email"}</Text>
          <Text style={styles.contactInfoText}>Github - {props.node.basic_info.github != undefined ? props.node.basic_info.github : "Your Github"}</Text>
          <Text style={styles.contactInfoText}>LinkedIn - {props.node.basic_info.linkedin != undefined ? props.node.basic_info.linkedin : "Your Linkedin"}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>PROFILE</Text>
        <Text style={styles.description}>{props.node.basic_info.summary != undefined ? props.node.basic_info.summary: "Your Summary"}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.skills}>
          <Text style={styles.title}>SKILLS</Text>
          <View>
            <Text style={styles.subtitle}>TOOLSET</Text>
            {props.node.skills.toolset != null ? props.node.skills.toolset.map((item,i) => <Text style={styles.description} key={i}>{item.name + " - " + item.level}</Text>) : <Text style={styles.description}>Python - Intermediate</Text>}
          </View>
          <View>
            <Text style={styles.subtitle}>PROJECTS</Text>
           {
            props.node.projects.assignments != null ?
            props.node.projects.assignments.map((item, i) => 
           <View key={i}>
              <Text style={styles.description}>{item.title != null ? item.title.toUpperCase(): <Text style={styles.description}>Item Title</Text>}</Text>
              <Text style={styles.description}>{item.link}</Text>
              <Text style={styles.description}>{item.tagline}</Text>
            </View>
            ) :<Text style={styles.description}>Python - Intermediate</Text>
            }
            </View>
            <View>
            <Text style={styles.sub}>LANGUAGES</Text>
             {props.node.basic_info.languages != null ? props.node.basic_info.languages.map((item, i) => <Text style={styles.description} key={i}>{item.idiom + " - " + item.level}</Text>) : <Text style={styles.description}>Item Title</Text>}
            </View>
          </View>
        <View style={styles.experience}>
          <Text style={styles.title}>EXPERIENCE</Text>
          {props.node.experiences != null ? props.node.experiences.map( (item, i) =>
          <View key={i}>
              <Text style={styles.sub}>{item.role}</Text>
              <View style={styles.section}>
                <Text style={styles.description}>{item.company}</Text>
                <Text style={styles.descriptionB}>Time {item.time}</Text>
              </View>
              <Text style={styles.description}>{item.details}</Text>
          </View>) : <Text style={styles.description}>Python - Intermediate</Text>}
            <Text style={styles.title}>EDUCATION</Text>
            <View style={styles.section}>
              {props.node.education != null ? props.node.education.map( (item, i) => 
              <View style={styles.div} key={i}>
                <Text style={styles.sub}>{item.degree != null ? item.degree.toUpperCase() : <Text style={styles.description}>Item Title</Text>}</Text>
                <Text style={styles.description}>{item.university}</Text>
                <Text style={styles.description}>{item.details}</Text>
                <Text style={styles.description}>Time {item.time}</Text>
              </View>
              ) : <Text style={styles.description}>Item Title</Text>}
            </View>
        </View>
      </View>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
}

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  name: {
    fontSize: 30,
    textAlign: 'left',
    letterSpacing: 1.2,
    fontFamily: 'Oswald'
  },
  lastname: {
    fontSize: 30,
    textAlign: 'left',
    letterSpacing: 1.2,
    fontFamily: 'Oswald'
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
    fontFamily: 'Oswald'
  },
  contactInfoView: {
    paddingTop: 10,
    paddingLeft: 45
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
    fontFamily: 'Oswald',
    letterSpacing: 1.2,
    paddingBottom: 5,
    paddingTop: 5,
    textDecoration:"underline",
    textDecorationColor:"orange"
  },
  sub: {
    fontSize: 10,
    textAlign: 'left',
    fontFamily: 'Oswald',
    letterSpacing: 1.2,
    textDecoration:"underline",
    textDecorationColor:"orange"
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Oswald',
    letterSpacing: 1.2,
    paddingBottom:10,
    textDecoration:"underline",
    textDecorationColor:"orange"
  },
  description: {
    fontSize: 9,
    textAlign: 'left',
    fontFamily: 'Oswald',
  },
  descriptionB: {
    fontSize: 9,
    textAlign: "justify",
    fontFamily: 'Oswald',
    paddingLeft: 140
  },
  div:{
    width:"50%"
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
});



export default ExternalProfile;