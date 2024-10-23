import { Request, Response } from 'express';
import * as dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

// A unique identifier for the given session
const sessionId = uuidv4();

// Set up Dialogflow credentials and client
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: '/chatai.json', // Add your Google Service Account credentials here
});

export const sendMessageToDialogflow = async (req: Request, res: Response) => {
  const { userMessage } = req.body;

  // Define the session path
  const sessionPath = sessionClient.projectAgentSessionPath('ageless-thought-439510-v2', sessionId);

  // The Dialogflow query request
  const request: dialogflow.protos.google.cloud.dialogflow.v2.IDetectIntentRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
        languageCode: 'en', // Change this to match your language if needed
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    // Send back the response from Dialogflow
    res.json({ reply: result?.fulfillmentText });
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error communicating with Dialogflow');
  }
};
