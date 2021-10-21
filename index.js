const { IdTokenClient } = require("google-auth-library")
const{google}= require("googleapis")

const {OAuth2} = google.auth

const OAuth2Client = new OAuth2('240424088747-o8l20ig27ai04v36kinca8mkj0v6cfcq.apps.googleusercontent.com','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')

OAuth2Client.setCredentials({refresh_token: '1//04ooSgXYRrp93CgYIARAAGAQSNwF-L9IrT7uJqBaDBxdqnP9dJqVB-Aqys0NphO0_2WOj7J5eb6K7ialjH-HWnEwNfN_Mya0MnbU',
})

const calendar = google.calendar( { version: 'v3', auth: OAuth2Client  })


const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDate() + 2)

const eventEndTime = new Date ()
eventEndTime.setDate(eventEndTime.setDate + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes () + 45)


const event = {
    summary : 'Meet with AW Tech',
    location : '406 ตำบล คลองขุด อำเภอเมืองสตูล สตูล 91000',
    description :
                'Follow up meeting with our project that anyproject',
    start : {
        dateTime: eventStartTime,
        timeZone:'Bangkok',
    },

    end : {
    dateTime:eventEndTime,
    timeZone:'Bangkok',
    },
    ColerID: 1,




    calendar,freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,   
        timeMax: eventEndTime,
        timeZone: 'Bangkok',
        items: [{ id: 'primary' }],
      },
    },
    (err, res) => {
      
      if (err) return console.error('Free Busy Query Error: ', err)
  
      
      const eventArr = res.data.calendars.primary.busy
  
    
      if (eventArr.length === 0)
   
        return calendar.events.insert(
          { calendarId: 'primary', resource: event },
          err => {
           
            if (err) return console.error('Error Creating Calender Event:', err)
           
            return console.log('Calendar event successfully created.')
          }
        )
  
     
      return console.log(`Sorry I'm busy.`)
    }
  )
}
