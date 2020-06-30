import React, { Component } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { Container, Button } from '@material-ui/core'
import AuthContext from '../../context/auth-context'
import ThreadDialog from '../Threads/ThreadDialog'
import NewThreadDialog from '../Threads/NewThreadDialog'

class MyForum extends Component {
  state = {
    threads: [
      {
        threadId: 0,
        threadTitle: 'TIFU by pretending to be deaf for the entire quarantine.',
        subRedditId: 0,
        subReddit: 'TIFU',
        content: 'So, three months ago or whenever it was that the Quarantine started I started an online course for a few subjects. To provide some background, these aren’t my school classes or anything and I’ve never met these people before. There are maybe ten other kids in class and the teacher is actually pretty great.So the first two days go pretty well but on the third day I fuck up big time. We were in between a Physics class that had already been going on for an hour and I’d completely gotten distracted half way through. I have an incredibly low attention span and this was already too much for me.When the teacher called my name to answer his question, I had no idea what he’d been talking about so I tried to google it. However I have shitty internet so it took like really long to load and the teacher was getting pissed as to why I wasn’t responding and why I was typing. So, completely freaking out I decided to text him on the Google Meet chat and make an excuse that my laptop’s audio AND microphone are not working today and I’ve been reading the subtitles which take quite some time to load so I hadn’t quite gotten his question.||||In my immense panic I phrased this somewhat vaguely and said - I can’t actually hear I’ve been reading the subtitles they take quite some time to loadTo which the instructor said - Oh! I’m so sorry. I wasn’t aware that you are deafIn my intense panic and anxiety I just went along with it.Dumb as fuck.It actually worked out fine, I’d type out all the answers sent to me and even bought a hearing aid that I sometimes wore in class. Now I say sometimes because I don’t actually have the focus and commitment to remember to put it on every class. When asked about it I told the people in class that even with the hearing aid I can’t hear much so I don’t usually bother wearing it. They bought it.Everyone in class likes me a lot now too and they find me very endearing. There’s a girl, Carla who says I have the most beautiful smile she’s ever seen. So this was actually going really well for me.But like most of my antics, this backfired on me big time.When I made this godforsaken decision all that time ago I was sure I’d get away with it. We were never going to meet irl. However, about a week ago the instructor decided to meet irl as the lockdown in my country has been lifted. I spent all night watching videos of deaf people and trying to figure out how to behave. I decided to pretend to also be completely dumb so I wouldn’t have to try to speak like them. It seemed very hard and I didn’t want to try.So anyway we meet up and everything goes well. No one uncovers my secret or anything. I spend the entire irl meet with Carla who is completely fucking stunning in real life. She’s smart, she’s funny, she’s kind. We keep handing each other notes on tissue papers and it’s the cutest shit ever. I haven’t ever been this attracted to anyone in my entire life. Toward the end of the meet however, Carla hands me a tissue paper with one little heartbreaking sentence on it.Will you date me?Fuck.Panicking, I tell her I need some time to think and she’s chill with it.I’m supposed to be meeting up with her tomorrow. I can’t pretend to be deaf and dumb while dating her it’s fucking impossible but if I have to keep this charade up I’ll have to let her go and I don’t want to do that either.There’s also the other option where I tell her it was all an act. Best case scenario is the extreme embarrassment + amazing girlfriend and the worst case scenario is she thinks I’m an asshole and I lose her anyway.tl;dr - I pretended to be deaf because I wasn’t paying attention in class and now I might be missing out an amazing girlfriend.Edit - She just texted me what time to pick her up. The date is actually TONIGHT not tomorrow so I have way lesser time to make this decision than I expected. Haha, I’m like a disaster that keeps on happening. Anyways, you should have an update in about 6-7 hours which is when I’ll meet her.UPDATE - So this is the update y’all have been waiting for, I just got back from the date with Carla.So basically I prepared really hard for the date, googled what the appropriate flowers for apologizing for your lies are and got her White Orchids. I then put on my best clothes and set out.She’d come to the date with a cute little notepad and two pencils for us to write notes in which melted me instantly but I was so anxious and nervous that at first I couldn’t bring myself to tell her. But as we sat waiting for our order to arrive, I kinda snapped cause of guilt and scribbled down into the notebook.Hey, there’s not easy way to break this but I’m not actually deaf . . . . . Or dumbTo which she replied with,I know you’re not deaf but you ARE pretty dumb :)At which point I said What the fuck out loud.She then laughed and explained that she’d thought I was so cute that she’d googled me long ago and found my Instagram which has highlighted stories from concerts where I’m screaming and vibing. So she only asked me out to figure out for how long I’d keep it going.So she was actually playing me the whole time.I was feeling pretty bummed that she only wanted to date me for that but nevertheless I apologized profusely and showed her the Reddit post to explain myself.Best.move.ever. (Thank you so much everyone in the comments who asked me to do this)She found the post funny and cute and ‘adorkable’. I told her I totally understand if she wants to end the date now but she didn’t! We had a great time and aren’t officially dating or anything but we did set a second date for next Wednesday.She also told me that while she understands why I did what I did and that anxiety, especially social anxiety is so hard to deal with but she also believes that I was a little offensive especially with the hearing aid. She explained to me why that was so insensitive and I’d like to apologize for anyone I might have offended on here, it really wasn’t my intention!Also, for our second date we’re planning to volunteer at a centre for deaf kids so I can redeem myself.Thank you fucking Reddit, y’all might’ve just got me a girlfriend!',
        author: 'yeetawayaccount101',
        published: {
          date: '2020-06-12',
          time: '08:30:25'
        },
        upVote: 25,
        downVote: 12,
        comments: null
      }, {
        threadId: 1,
        threadTitle: 'TIFU by jumping into a lake in my bra/panties to save a man that turned out to be an elite military scuba diver in training',
        subRedditId: 0,
        subReddit: 'TIFU',
        content: 'I’m couch-surfing with my sister and her BF; I work for him at the lake-side bar, trying to pay for college. My state is “open” and while I’m not thrilled, I need both the job and my scored sofa accommodations to make it work. To give them their space, and myself a break from the doomscrolling, I take a run by the lake in the mornings. This lake is bombass and draws scuba divers to the flooded town at the bottom.Today, I was in my own head running when a dark mass floated to the surface 40 feet away. I was on the craggy side of the lake and this dude looked dead. D.E.A.D. Facing away from me, his head was tipped back, eyes closed, bobbing like a fishing lure. No one else was around, so I thought he was quantum crazy out here scuba diving alone at the crackass of dawn, giving himself the bends or some nonsense.Like a jackass, I didn’t yell at him to check-in. Instead, I toed off my shoes and stripped to my skivvies to save the imbecile. The movie trailer in my head had me taking three glorious steps and launching into the deep blue water, black widow style. Instead, my tender feet hit the sharp rocks and I contorted under the pain like a slinky as I uncoordinatedly pitched myself into the water, doing a side-flop. I was also wearing my contacts so I swam hard in his direction with my eyes closed.When I open them, he was dead-ass staring at me like I’d lost my ever-lovin’ mind, so I blurted, “Are you okay?”He removed the regulator and incredulously said “yes”.My brain blue-screened while I tread water. The lake felt infinitely deep. Before I could terrify myself by hearing the jaws theme song, I turned to nope the hell out of there, yelling over my shoulder, “I thought you needed saving” to explain my idiocy.As I pivoted, another dude cleared his throat from 30 feet away on the other side. I never heard a sound from him so I freaked out, failing and belting an ear wounding scream at him.Both asshats laughed as a few more heads surfaced around us. I was surrounded by divers all wildly entertained by my ridiculous high-octane FU. After pointing to me and the beach, the merman that was my original target cautiously swam toward me after I nodded and “escorted” me to the shore.The beach was much further than I had anticipated, so I was trying to low-key breath, hiding my need to suck all of the O2 from the air. Also, the comedy of the situation consumed me and I started to giggle. Finally, I joked, “Dude, you are lucky you weren’t actually dying because It would have taken everything I have to drag your sorry ass this far.”He chuckled before offering me a “tow.”“Hell, no! Not gonna happen.” Even if I had to dog paddle, I wouldn’t openly accept that defeat.He quietly mocked me the rest of the way to the shore. I’m a secret sap for it.They were cadets or recent graduates from a military college, here for the summer. They’ve been training in pools and were doing some “open water” exercises; they had been out there at least part of the night. I’m sure I blew-up whatever drill they were running. He’s training for pre-dive school (?) and since I am an expert googler, I’m guessing that means combat diving.At the shore, I did my best to throw my shoulders back and march out of the water in my sports bra and undies in front of what I can only imagine are some pretty badass men. I did invite him and his clandestine crew for an absurdly overpriced beer at the bar tonight before shame-jogging back into the woods for my clothes.TL;DR I tried to save an injured diver-ended up crashing some kind of military training.EDIT: It\'s Lake Jocassee in SC. Also, the mereman cheated: he was wearing a floaty vest and fins, that bastard. Ok, I’ll admit there is a part of me that is attracted to his mysterious appearance from the shadow realm, and I’m definitely imaging that he’s constructed from some kind of aluminum steel alloy, but he was also funny and kind. I was vibing his proclivity for witty and sarcastic comments and have a million questions I want to ask him. HaEDIT2: Okay, at work now and had to turn off the notifications because you snippers are blowing me up. To all the ladies giving advice earlier...yes, I left the dragon-flies at home and went full cute sundress and Jesus sandals. Tried to wear my hair straight, but it\'s hot as hate out here and it\'ll be beach wave sweaty before long. My sister\'s BF has blabbed the whole thing and all of the staff is in full-on ribbing mode. Kinda great actually. They are currently reading the Reddit post so they are cackling at you people too. So, even if he doesn\'t show, we\'re gonna have a great night. We have a long way to go since it\'s just the dinner crowd, but thanks for making my day great people.EDIT3: Solid dinner crowd, but no mereman, or frog prince as you people have started to call him. Our lakeside drinking crew will start rolling in another 1-2 hours. I thought you salty bastards of TIFU would chew me up and spit me out, but look at you all showing up in the name of love! You guys are awesome, even if I get ditched it was worth the day with you.EDIT4: 1 hor later. Still no show :(EDIT5: HE SHOWED! Holy shit, a little bit ago. Yes, I was as dorky as you would have imagined and now I’m typing this from the bathroom like a dumbass again, but I feel like you people are on the ride with me. He’s handsome and funny and he smells great. Yes, I hugged him. I’m southern…its what we do…not the smelling, the hugging. He’s nice, and smart and keeps defending me from my jackass friends at the bar, who have almost called him merman to his face. I think he low-key likes that everyone knew who he was, but not sure how he’ll feel about being a Reddit celebrity. I’ve learned a lot about him, but it wouldn’t be fair to share without his permission. His whole crew did not come, only one and his bud immediately started flirting with my co-worker. That’s a good sign. I think. Holy, shit you’d think I’d never met up with a guy before. Also, my friend straight up asked him if he saw my “dragonfly undies that look like penises with MASSIVE, glow-in-the-dark turquoise blue balls” only she used the Reddit version (thanks for that nickname Reddit). He didn’t answer but smirked the truth to me after she left. It was cheeky but cute. He’s also been sharing some of the shit that he\'s been taking today from being “saved”. He has the same self-deprecating sense of humor as me. I think we are vibing. So, that’s all the updates for tonight. He’s getting the rest of my attention. Keep sending me those good vibes and peace people.EDIT6: Last and final update because you guys are not letting up. I know this may seem weird since I posted this whole situation out into cyberspace for everyone to see, but yesterday it was just a comical story about a guy I didn\'t think I would ever see again. Something funny to share when we all need a giggle. Today...well...it feels different to talk about him now that we\'ve spent some time together. I like him. There’s chemistry and similar interest and we have plans to see each other again. I don’t need the pressure of Reddit to help me screw things up. You guys know I’m a bit of an expert in that regard. That’s all, so go do something you love and find a way to at least balance the doomscrolling with some belly laughs. Sending much love to each of you.',
        author: 'CheerfulChaosPancake',
        published: {
          date: '2020-06-12',
          time: '08:30:25'
        },
        upVote: 94,
        downVote: 25,
        comments: null
      }
    ],
    currentUser: 'bon',
    isSignedIn: true,

    dialogThreadOn: false,
    dialogThreadKey: null,

    dialogNewThreadOn: false,
  }

  debug = () => {
  }

  openCreateNewThread = () => {
    this.setState({ dialogNewThreadOn: true });
  }
  closeNewThreadModal = () => {
    this.setState({ dialogNewThreadOn: false });
  }

  onThreadDialogClicked = (id) => {
    this.setState({ dialogThreadOn: true });
    this.setState({ dialogThreadKey: id });
  }

  closeModal = () => {
    this.setState({ dialogThreadOn: false });
    this.setState({ dialogThreadKey: null });
  }

  createNewThread = (event) => {
    event.preventDefault();
    const title = event.target[0].value;
    const content = event.target[1].value;
    const date = new Date();
    const isoDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let oldThreadState = this.state.threads;
    let newThreads = {
      threadId: oldThreadState.length,
      threadTitle: title,
      subRedditId: 0,
      subReddit: 'TIFU',
      content: content,
      author: this.state.currentUser,
      published: {
        date: isoDate,
        time: time
      },
      upVote: 0,
      downVote: 0,
      comments: null
    };
    oldThreadState.push(newThreads);
    this.setState({ newThreads: oldThreadState });
    event.target.reset();
    this.setState({ dialogNewThreadOn: false })
  }

  onLoginListener = (event) => {
    event.preventDefault();
    let username = event.target[0].value;
    let password = event.target[1].value;
    if (username === 'bon' && password === 'bon') {
      this.setState({ currentUser: username });
      this.setState({ isSignedIn: true });
      // alert('Welcome');
    } else {
      alert('Incorrect credential');
    }
  }

  getContent = () => {
    // Generate contents on Thread
    const threads =
      [
        {
          threadId: 0,
          threadTitle: 'TIFU by pretending to be deaf for the entire quarantine.',
          subRedditId: 0,
          subReddit: 'TIFU',
          content: 'So, three months ago or whenever it was that the Quarantine started I started an online course for a few subjects. To provide some background, these aren’t my school classes or anything and I’ve never met these people before. There are maybe ten other kids in class and the teacher is actually pretty great.So the first two days go pretty well but on the third day I fuck up big time. We were in between a Physics class that had already been going on for an hour and I’d completely gotten distracted half way through. I have an incredibly low attention span and this was already too much for me.When the teacher called my name to answer his question, I had no idea what he’d been talking about so I tried to google it. However I have shitty internet so it took like really long to load and the teacher was getting pissed as to why I wasn’t responding and why I was typing. So, completely freaking out I decided to text him on the Google Meet chat and make an excuse that my laptop’s audio AND microphone are not working today and I’ve been reading the subtitles which take quite some time to load so I hadn’t quite gotten his question.||||In my immense panic I phrased this somewhat vaguely and said - I can’t actually hear I’ve been reading the subtitles they take quite some time to loadTo which the instructor said - Oh! I’m so sorry. I wasn’t aware that you are deafIn my intense panic and anxiety I just went along with it.Dumb as fuck.It actually worked out fine, I’d type out all the answers sent to me and even bought a hearing aid that I sometimes wore in class. Now I say sometimes because I don’t actually have the focus and commitment to remember to put it on every class. When asked about it I told the people in class that even with the hearing aid I can’t hear much so I don’t usually bother wearing it. They bought it.Everyone in class likes me a lot now too and they find me very endearing. There’s a girl, Carla who says I have the most beautiful smile she’s ever seen. So this was actually going really well for me.But like most of my antics, this backfired on me big time.When I made this godforsaken decision all that time ago I was sure I’d get away with it. We were never going to meet irl. However, about a week ago the instructor decided to meet irl as the lockdown in my country has been lifted. I spent all night watching videos of deaf people and trying to figure out how to behave. I decided to pretend to also be completely dumb so I wouldn’t have to try to speak like them. It seemed very hard and I didn’t want to try.So anyway we meet up and everything goes well. No one uncovers my secret or anything. I spend the entire irl meet with Carla who is completely fucking stunning in real life. She’s smart, she’s funny, she’s kind. We keep handing each other notes on tissue papers and it’s the cutest shit ever. I haven’t ever been this attracted to anyone in my entire life. Toward the end of the meet however, Carla hands me a tissue paper with one little heartbreaking sentence on it.Will you date me?Fuck.Panicking, I tell her I need some time to think and she’s chill with it.I’m supposed to be meeting up with her tomorrow. I can’t pretend to be deaf and dumb while dating her it’s fucking impossible but if I have to keep this charade up I’ll have to let her go and I don’t want to do that either.There’s also the other option where I tell her it was all an act. Best case scenario is the extreme embarrassment + amazing girlfriend and the worst case scenario is she thinks I’m an asshole and I lose her anyway.tl;dr - I pretended to be deaf because I wasn’t paying attention in class and now I might be missing out an amazing girlfriend.Edit - She just texted me what time to pick her up. The date is actually TONIGHT not tomorrow so I have way lesser time to make this decision than I expected. Haha, I’m like a disaster that keeps on happening. Anyways, you should have an update in about 6-7 hours which is when I’ll meet her.UPDATE - So this is the update y’all have been waiting for, I just got back from the date with Carla.So basically I prepared really hard for the date, googled what the appropriate flowers for apologizing for your lies are and got her White Orchids. I then put on my best clothes and set out.She’d come to the date with a cute little notepad and two pencils for us to write notes in which melted me instantly but I was so anxious and nervous that at first I couldn’t bring myself to tell her. But as we sat waiting for our order to arrive, I kinda snapped cause of guilt and scribbled down into the notebook.Hey, there’s not easy way to break this but I’m not actually deaf . . . . . Or dumbTo which she replied with,I know you’re not deaf but you ARE pretty dumb :)At which point I said What the fuck out loud.She then laughed and explained that she’d thought I was so cute that she’d googled me long ago and found my Instagram which has highlighted stories from concerts where I’m screaming and vibing. So she only asked me out to figure out for how long I’d keep it going.So she was actually playing me the whole time.I was feeling pretty bummed that she only wanted to date me for that but nevertheless I apologized profusely and showed her the Reddit post to explain myself.Best.move.ever. (Thank you so much everyone in the comments who asked me to do this)She found the post funny and cute and ‘adorkable’. I told her I totally understand if she wants to end the date now but she didn’t! We had a great time and aren’t officially dating or anything but we did set a second date for next Wednesday.She also told me that while she understands why I did what I did and that anxiety, especially social anxiety is so hard to deal with but she also believes that I was a little offensive especially with the hearing aid. She explained to me why that was so insensitive and I’d like to apologize for anyone I might have offended on here, it really wasn’t my intention!Also, for our second date we’re planning to volunteer at a centre for deaf kids so I can redeem myself.Thank you fucking Reddit, y’all might’ve just got me a girlfriend!',
          author: 'yeetawayaccount101',
          published: {
            date: '2020-06-12',
            time: '08:30:25'
          },
          upVote: 25,
          downVote: 12,
          comments: null
        }, {
          threadId: 1,
          threadTitle: 'TIFU by jumping into a lake in my bra/panties to save a man that turned out to be an elite military scuba diver in training',
          subRedditId: 0,
          subReddit: 'TIFU',
          content: 'I’m couch-surfing with my sister and her BF; I work for him at the lake-side bar, trying to pay for college. My state is “open” and while I’m not thrilled, I need both the job and my scored sofa accommodations to make it work. To give them their space, and myself a break from the doomscrolling, I take a run by the lake in the mornings. This lake is bombass and draws scuba divers to the flooded town at the bottom.Today, I was in my own head running when a dark mass floated to the surface 40 feet away. I was on the craggy side of the lake and this dude looked dead. D.E.A.D. Facing away from me, his head was tipped back, eyes closed, bobbing like a fishing lure. No one else was around, so I thought he was quantum crazy out here scuba diving alone at the crackass of dawn, giving himself the bends or some nonsense.Like a jackass, I didn’t yell at him to check-in. Instead, I toed off my shoes and stripped to my skivvies to save the imbecile. The movie trailer in my head had me taking three glorious steps and launching into the deep blue water, black widow style. Instead, my tender feet hit the sharp rocks and I contorted under the pain like a slinky as I uncoordinatedly pitched myself into the water, doing a side-flop. I was also wearing my contacts so I swam hard in his direction with my eyes closed.When I open them, he was dead-ass staring at me like I’d lost my ever-lovin’ mind, so I blurted, “Are you okay?”He removed the regulator and incredulously said “yes”.My brain blue-screened while I tread water. The lake felt infinitely deep. Before I could terrify myself by hearing the jaws theme song, I turned to nope the hell out of there, yelling over my shoulder, “I thought you needed saving” to explain my idiocy.As I pivoted, another dude cleared his throat from 30 feet away on the other side. I never heard a sound from him so I freaked out, failing and belting an ear wounding scream at him.Both asshats laughed as a few more heads surfaced around us. I was surrounded by divers all wildly entertained by my ridiculous high-octane FU. After pointing to me and the beach, the merman that was my original target cautiously swam toward me after I nodded and “escorted” me to the shore.The beach was much further than I had anticipated, so I was trying to low-key breath, hiding my need to suck all of the O2 from the air. Also, the comedy of the situation consumed me and I started to giggle. Finally, I joked, “Dude, you are lucky you weren’t actually dying because It would have taken everything I have to drag your sorry ass this far.”He chuckled before offering me a “tow.”“Hell, no! Not gonna happen.” Even if I had to dog paddle, I wouldn’t openly accept that defeat.He quietly mocked me the rest of the way to the shore. I’m a secret sap for it.They were cadets or recent graduates from a military college, here for the summer. They’ve been training in pools and were doing some “open water” exercises; they had been out there at least part of the night. I’m sure I blew-up whatever drill they were running. He’s training for pre-dive school (?) and since I am an expert googler, I’m guessing that means combat diving.At the shore, I did my best to throw my shoulders back and march out of the water in my sports bra and undies in front of what I can only imagine are some pretty badass men. I did invite him and his clandestine crew for an absurdly overpriced beer at the bar tonight before shame-jogging back into the woods for my clothes.TL;DR I tried to save an injured diver-ended up crashing some kind of military training.EDIT: It\'s Lake Jocassee in SC. Also, the mereman cheated: he was wearing a floaty vest and fins, that bastard. Ok, I’ll admit there is a part of me that is attracted to his mysterious appearance from the shadow realm, and I’m definitely imaging that he’s constructed from some kind of aluminum steel alloy, but he was also funny and kind. I was vibing his proclivity for witty and sarcastic comments and have a million questions I want to ask him. HaEDIT2: Okay, at work now and had to turn off the notifications because you snippers are blowing me up. To all the ladies giving advice earlier...yes, I left the dragon-flies at home and went full cute sundress and Jesus sandals. Tried to wear my hair straight, but it\'s hot as hate out here and it\'ll be beach wave sweaty before long. My sister\'s BF has blabbed the whole thing and all of the staff is in full-on ribbing mode. Kinda great actually. They are currently reading the Reddit post so they are cackling at you people too. So, even if he doesn\'t show, we\'re gonna have a great night. We have a long way to go since it\'s just the dinner crowd, but thanks for making my day great people.EDIT3: Solid dinner crowd, but no mereman, or frog prince as you people have started to call him. Our lakeside drinking crew will start rolling in another 1-2 hours. I thought you salty bastards of TIFU would chew me up and spit me out, but look at you all showing up in the name of love! You guys are awesome, even if I get ditched it was worth the day with you.EDIT4: 1 hor later. Still no show :(EDIT5: HE SHOWED! Holy shit, a little bit ago. Yes, I was as dorky as you would have imagined and now I’m typing this from the bathroom like a dumbass again, but I feel like you people are on the ride with me. He’s handsome and funny and he smells great. Yes, I hugged him. I’m southern…its what we do…not the smelling, the hugging. He’s nice, and smart and keeps defending me from my jackass friends at the bar, who have almost called him merman to his face. I think he low-key likes that everyone knew who he was, but not sure how he’ll feel about being a Reddit celebrity. I’ve learned a lot about him, but it wouldn’t be fair to share without his permission. His whole crew did not come, only one and his bud immediately started flirting with my co-worker. That’s a good sign. I think. Holy, shit you’d think I’d never met up with a guy before. Also, my friend straight up asked him if he saw my “dragonfly undies that look like penises with MASSIVE, glow-in-the-dark turquoise blue balls” only she used the Reddit version (thanks for that nickname Reddit). He didn’t answer but smirked the truth to me after she left. It was cheeky but cute. He’s also been sharing some of the shit that he\'s been taking today from being “saved”. He has the same self-deprecating sense of humor as me. I think we are vibing. So, that’s all the updates for tonight. He’s getting the rest of my attention. Keep sending me those good vibes and peace people.EDIT6: Last and final update because you guys are not letting up. I know this may seem weird since I posted this whole situation out into cyberspace for everyone to see, but yesterday it was just a comical story about a guy I didn\'t think I would ever see again. Something funny to share when we all need a giggle. Today...well...it feels different to talk about him now that we\'ve spent some time together. I like him. There’s chemistry and similar interest and we have plans to see each other again. I don’t need the pressure of Reddit to help me screw things up. You guys know I’m a bit of an expert in that regard. That’s all, so go do something you love and find a way to at least balance the doomscrolling with some belly laughs. Sending much love to each of you.',
          author: 'CheerfulChaosPancake',
          published: {
            date: '2020-06-12',
            time: '08:30:25'
          },
          upVote: 94,
          downVote: 25,
          comments: null
        }
      ];

    return threads;
  }

  render() {
    let threadDialog = null;
    let createDialog = null;

    if (this.state.dialogNewThreadOn) {
      createDialog = <NewThreadDialog
        dialogNewThreadOn={this.state.dialogNewThreadOn}
        closeModal={this.closeNewThreadModal}
        submitNewThread={this.createNewThread}
      />
    }
    if (this.state.dialogThreadKey != null) {
      const currentId = this.state.dialogThreadKey;
      const currentThread = this.state.threads[currentId];
      threadDialog = <ThreadDialog
        thread={currentThread}
        dialogThreadOn={this.state.dialogThreadOn}
        closeModal={this.closeModal}
      />
    }
    return (
      <AuthContext.Provider value={{
        currentUser: this.state.currentUser,
        loginHandler: this.onLoginListener
      }}>
        <div>
          <Header currentUser={this.state.currentUser} />
          <Container maxWidth="md">
            <Body
              isSignedIn={this.state.isSignedIn}
              threads={this.state.threads}
              onThreadDialogClicked={this.onThreadDialogClicked}
              openCreateNewThread={this.openCreateNewThread}
              closeNewThreadModal={this.closeNewThreadModal}
            />
            <Button
              onClick={this.debug}
              variant="contained"
              color="secondary"> Debug</Button>

            {threadDialog}
            {createDialog}
            <Footer />
          </Container>
        </div>
      </AuthContext.Provider>
    )
  }
}


export default MyForum
