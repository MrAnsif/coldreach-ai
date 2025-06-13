import { buildPrompt } from '@/lib/promptBuilder';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import { auth } from '@clerk/nextjs/server';
import { calculateSpamScore } from '@/lib/spamAnalyzer';

export async function POST(req) {
  await dbConnect();
  const { userId } = await auth();




  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { inputs } = await req.json();

  // Check user's message limit based on subscription
  // Implementation depends on your subscription model

  try {
    // Build the prompt
    const { systemPrompt, userPrompt } = buildPrompt(inputs);

    // Call DeepSeek API (or your chosen AI service)
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    console.log(data)

    const generatedMessage = data.choices[0].message.content;

    // Calculate spam score
    const spamScore = calculateSpamScore(generatedMessage);


    // Save to database
    const newMessage = new Message({
      userId,
      inputs,
      generatedMessage,
      spamScore,
      createdAt: new Date()
    });

    await newMessage.save();

    return NextResponse.json({
      message: generatedMessage,
      spamScore
    });

  } catch (error) {
    console.error('Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate message', details: error.message },
      { status: 500 }
    );
  }
}