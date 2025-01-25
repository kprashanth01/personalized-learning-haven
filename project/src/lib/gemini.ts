import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAZmTdvQQ2lK-CXY2FhpUxGDM3nCqjYmiE');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generateRoadmap(topic: string) {
  try {
    // Get the textual content
    const textPrompt = `Create a comprehensive learning roadmap for ${topic}. Format the response in markdown with the following structure:

# ${topic} Learning Roadmap

## Overview
Brief overview of the learning path and expected outcomes.

## Prerequisites
- List essential prerequisites with explanations
- Include recommended background knowledge

## Weekly Schedule

### Week 1: [Foundation Topic]
#### Learning Objectives
- Clear objectives for the week

#### Core Concepts
- Detailed explanation of each concept
- Code examples where applicable
- Real-world applications

[Continue similar structure for subsequent weeks]

## Final Project Ideas
- Detailed project suggestions
- Learning outcomes
- Implementation guidelines

## Advanced Topics
- Future learning paths
- Specialization areas
- Industry applications`;

    const textResult = await model.generateContent(textPrompt);
    const textContent = await textResult.response.text();

    // Get the visual roadmap nodes
    const nodesPrompt = `Create a learning path for ${topic} with key milestones, concepts, and projects. Return ONLY a JSON array of nodes with this exact structure:

[
  {
    "id": "unique-id",
    "title": "Node Title",
    "description": "Brief description",
    "status": "locked" | "current" | "completed",
    "type": "milestone" | "concept" | "project"
  }
]

Include 6-8 nodes that represent the key learning points. The first node should be "completed", the second "current", and the rest "locked".`;

    const nodesResult = await model.generateContent(nodesPrompt);
    const nodesContent = await nodesResult.response.text();
    
    // Extract the JSON array from the response
    const nodesMatch = nodesContent.match(/\[[\s\S]*\]/);
    const nodes = nodesMatch ? JSON.parse(nodesMatch[0]) : [];

    return {
      content: textContent,
      nodes: nodes
    };
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
}

export async function chatWithAI(message: string) {
  try {
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
}

export async function generateQuiz(topic: string, weekNumber: number) {
  try {
    const prompt = `Create a quiz for the topic "${topic}". Return the response in this exact JSON format:

{
  "questions": [
    {
      "id": "unique-id",
      "text": "Question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0
    }
  ]
}

Create 5 multiple choice questions. The correctAnswer should be the index (0-3) of the correct option.`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    
    // Extract the JSON object from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const quiz = jsonMatch ? JSON.parse(jsonMatch[0]) : { questions: [] };
    
    return quiz.questions;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}

export async function getLearningMaterials(topic: string, concept: string) {
  try {
    const prompt = `Create detailed learning materials for "${concept}" within the context of ${topic}. Include:

1. Concept Overview
2. Key Points
3. Detailed Explanations
4. Examples (with code if applicable)
5. Best Practices
6. Common Pitfalls
7. Real-world Applications

Format the response in markdown with proper headings, code blocks, and formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting learning materials:', error);
    throw error;
  }
}