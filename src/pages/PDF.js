import React,{ useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';



const ExternalProfile = (props) => {
  const [info, setInfo] = useState({});
  function studentData(){
      fetch("https://raw.githubusercontent.com/4GeeksAcademy/student-external-profile/master/src/students/"+ props.student + ".yml")
      .then(resp => resp.text())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }
  useEffect(() =>{
      studentData();
  }, [])
 return <Document>
    <Page style={styles.body}>
      <View style={styles.dflex}>
        <View>
          <Text style={styles.name}>{props.student}</Text>
          <Text style={styles.lastname}>MONRROY</Text>
          <Text style={styles.career}>Software Developer</Text>
        </View>
        <View style={styles.contactInfoView}>
          <Text style={styles.contactInfoText}>Email</Text>
          <Text style={styles.contactInfoText}>Phone</Text>
          <Text style={styles.contactInfoText}>Github</Text>
          <Text style={styles.contactInfoText}>LinkedIn</Text>
        </View>

        <Image
          style={styles.avatar}
          src="https://pbs.twimg.com/profile_images/1073734307104071685/z_UhjNKI_400x400.jpg"
        />

      </View>
      <View>
        <Text style={styles.title}>PROFILE</Text>
        <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
        mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
        antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
        carnero, salpicón las más noches, duelos y quebrantos los sábados,
        lentejas los viernes, algún palomino de añadidura los domingos,</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.skills}>
          <Text style={styles.title}>SKILLS</Text>
          <View>
            <Text style={styles.subtitle}>TOOLSET</Text>
            <Text style={styles.description}>Python - Intermediate</Text>
            <Text style={styles.description}>Python - Intermediate</Text>
            <Text style={styles.description}>Python - Intermediate</Text>
            <Text style={styles.description}>Python - Intermediate</Text>
            <Text style={styles.description}>Python - Intermediate</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>PROJECTS</Text>
            <Text style={styles.sub}>CURRENT</Text>
            <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
             mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            <Text style={styles.sub}>ASSIGMENTS</Text>
            <View>
              <Text style={styles.description}>My postcard</Text>
              <Text style={styles.description}>github.com/andinoga/Instagramfeed</Text>
              <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            </View>
            <View>
              <Text style={styles.description}>My postcard</Text>
              <Text style={styles.description}>github.com/andinoga/Instagramfeed</Text>
              <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            </View>
            <View>
              <Text style={styles.description}>My postcard</Text>
              <Text style={styles.description}>github.com/andinoga/Instagramfeed</Text>
              <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            </View>
            <View>
            <Text style={styles.sub}>LANGUAGES</Text>
              <Text style={styles.description}>English - Native</Text>
              <Text style={styles.description}>Spanish - Advanced</Text>
            </View>
          </View>
        </View>
        <View style={styles.experience}>
          <Text style={styles.title}>EXPERIENCE</Text>
          <View>
              <Text style={styles.sub}>JOB TITLE</Text>
              <View style={styles.section}>
                <Text style={styles.description}>Company Name</Text>
                <Text style={styles.descriptionB}>Time 2020 - 2025</Text>
              </View>
              <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            </View>
            <View>
              <Text style={styles.sub}>JOB TITLE</Text>
              <View style={styles.section}>
                <Text style={styles.description}>Company Name</Text>
                <Text style={styles.descriptionB}>Time 2020 - 2025</Text>
              </View>
              <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            </View>
            <View>
              <Text style={styles.sub}>JOB TITLE</Text>
              <View style={styles.section}>
                <Text style={styles.description}>Company Name</Text>
                <Text style={styles.descriptionB}>Time 2020 - 2025</Text>
              </View>
              <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            </View>
            <View>
              <Text style={styles.sub}>JOB TITLE</Text>
              <View style={styles.section}>
                <Text style={styles.description}>Company Name</Text>
                <Text style={styles.descriptionB}>Time 2020 - 2025</Text>
              </View>
              <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            </View>
            <View>
              <Text style={styles.sub}>JOB TITLE</Text>
              <View style={styles.section}>
                <Text style={styles.description}>Company Name</Text>
                <Text style={styles.descriptionB}>Time 2020 - 2025</Text>
              </View>
              <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
            </View>
            <Text style={styles.title}>EDUCATION</Text>
            <View style={styles.section}>
              <View style={styles.div}>
                <Text style={styles.sub}>DEGREE</Text>
                <Text style={styles.description}>University</Text>
                <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
                <Text style={styles.description}>Time 2020 - 2025</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.sub}>DEGREE</Text>
                <Text style={styles.description}>University</Text>
                <Text style={styles.description}>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
               mucho tiempo que vivía un hidalgo de los de lanza en astillero</Text>
                <Text style={styles.description}>Time 2020 - 2025</Text>
              </View>
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
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  name: {
    fontSize: 35,
    textAlign: 'left',
    letterSpacing: 1.2,
    fontFamily: 'Oswald'
  },
  lastname: {
    fontSize: 35,
    textAlign: 'left',
    letterSpacing: 1.2,
    fontFamily: 'Oswald'
  },
  career: {
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 40,
  },
  dflex: {
    display: "flex",
    flexDirection: "row"
  },
  contactInfoText: {
    fontSize: 14,
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
  section: {
    display: "flex",
    flexDirection: "row"
  },
  skills: {
    width: "40%"
  },
  experience: {
    width: "60%"
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Oswald',
    letterSpacing: 1.2
  },
  sub: {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Oswald',
    letterSpacing: 1.2
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Oswald',
    letterSpacing: 1.2
  },
  description: {
    fontSize: 11,
    textAlign: 'left',
    fontFamily: 'Oswald',
  },
  descriptionB: {
    fontSize: 11,
    textAlign: 'left',
    fontFamily: 'Oswald',
    paddingLeft: 170
  },
  div:{
    width:"50%"
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});


export default ExternalProfile;