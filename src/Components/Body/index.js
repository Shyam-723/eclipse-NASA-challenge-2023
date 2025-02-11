import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Eclipse from '../Eclipse'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { itemData } from '../Card1/index.js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// INTERACTIVE CARD IMPLEMENTATION

export default function InteractiveLearning() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showImage, setShowImage] = useState(false);
  
    const currentQuestion = itemData[questionIndex];
  

    const handleNextQuestion = () => {
        if (questionIndex < itemData.length - 1) {
          // increment the question index to move to the next question
          setQuestionIndex(questionIndex + 1);
          // clear the user's answer for the next question
          setShowAnswer(false);
          setShowImage(false); // Reset to hide the image
        }
      };

    const handlePreviousQuestion = () => {
        if (questionIndex > 0) {
            // decrement the question index to move to the previous question
            setQuestionIndex(questionIndex - 1);
            // clear the user's answer for next question
            setShowAnswer(false);
        }
    };

    const currentAnswer = showAnswer ? currentQuestion.answer : 'Click me to reveal answer';

    const handleToggleAnswer = () => {
        // Toggle between showing the answer and image
        if (showAnswer) {
          setShowAnswer(false);
          setShowImage(true);
        } else if (showImage) {
          setShowImage(false);
        } else {
          setShowAnswer(true);
        }
      };

    const isLastQuestion = questionIndex === itemData.length - 1;
    const isFirstQuestion = questionIndex === 0;

    return (
        <div className="App-body">
          <h4>Eclipse Simulation</h4>
          <Eclipse />
          <h4>Trivia</h4>
          <Card className='App-card' sx={{ width: "50%" }} id="card-deck">
            <div className="accordion-container">
              <Accordion expanded={showAnswer || showImage} onChange={handleToggleAnswer}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5" component="div">
                    {currentQuestion.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ minHeight: showAnswer ? 'auto' : 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showImage && (
                    <img src={currentQuestion.src} alt="Eclipse" width= "fitcontent"/>
                )}
                <Typography variant="body2" style={{ marginBottom: '10px' }}>
                    {showAnswer ? currentQuestion.answer : ''}
                </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div>
              {isLastQuestion ? (
                <button>
                  <a href='https://science.nasa.gov/eclipses/'>That's it! Click to learn more!</a>
                </button>
              ) : (
                <div>

                <button onClick={handleNextQuestion}>Next</button> 
                <button onClick={handlePreviousQuestion} >Back</button>
                </div>
              )}
            </div>
          </Card>
          {isLastQuestion && (

            <>
             <p style={{color: 'white', fontSize: '16px'}}>
                        Congratulations!! You've read through all the questions. Here are a list of resources to learn more about Eclipses!
            </p>
            </>
          )}
        </div>
      );
    }
    
// INFINITE SCROLL IMPLEMENTATION

// const initialLoadCount = 3;
// const loadMoreCount = 3;

// export default function InfiniteScroll() {

//     // define state to track the loaded content
//     const [content, setContent] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // load initial content 
//         const initialContent = itemData.slice(0, initialLoadCount);
//         setContent(loadInitialContent);
//     }, []);

//     // function to load initial content
//     const loadInitialContent = () => {
//         const initialContent = itemData.slice(0, 11); // replace with your content retrieval method
//         setContent(initialContent);
//     };

//     // function to handle endless scrolling
//     const handleEndlessScroll = () => {
//         const contentHeight = document.documentElement.scrollHeight;
//         const scrollPosition = window.innerHeight + window.scroll;

//         // detects when user is near bottom of the page
//         if (scrollPosition >= contentHeight - 200 && !loading) {
//             setLoading(true);

//             // Calculate range for loading more data
//             const startIndex = content.length;
//             const endIndex = startIndex + loadMoreCount;

//             // fetch and append the next set of content 
//             const nextContent = itemData.slice(startIndex, endIndex);

//             // append the new content to the existing content
//             setContent((prevContent) => [...prevContent, nextContent]);
//             setLoading(false);
//         }
//     };

//     // add scroll event listener to trigger infinite scrolling
//     useEffect(() => {
//         loadInitialContent(); // load initial content when the component mounts
//     }, []);


//     useEffect(() => {
//         window.addEventListener('scroll', handleEndlessScroll);
//         return () => {
//             window.removeEventListener('scroll', handleEndlessScroll);
//         };
//     }, [content]);

//     return (
//         <div className="App-body">
//             {content.map((item, index) => (
//                 <Card key={index} className='App-card' sx={{ width: "50%"}}>
//                     <CardContent border={1} className='cardContent'>
//                         <Typography variant="h5" component="div">
//                             {item.question}
//                         </Typography>
//                         <Typography variant="body2">
//                             {item.answer}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             ))}
//             {loading && <p>Loading more content...</p>}
//         </div>
//     );
// }
