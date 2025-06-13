# coldreach-ai

## Project Title and Description

Coldreach AI is a Next.js application designed to generate personalized outreach messages. It leverages AI to create compelling content for various platforms, including email, LinkedIn, and Twitter, tailored to different contexts like sales, job inquiries, partnerships, and content collaborations. The application allows users to input details about the sender and recipient, specify the desired tone, format, and length of the message, and incorporate personalization triggers to increase engagement. Additionally, it includes a spam analyzer to help users avoid sending messages that are likely to be flagged as spam.

## Features and Functionality

-   **Message Generation:** Creates personalized outreach messages using AI based on user inputs.
-   **Multi-Platform Support:** Generates messages for email, LinkedIn, and Twitter.
-   **Contextual Templates:** Offers templates for different outreach contexts (sales, job inquiry, partnership, content collaboration).
-   **Customizable Tone and Length:** Allows users to select the tone (formal, friendly, casual, enthusiastic) and length (short, medium, long) of the message.
-   **Personalization Triggers:** Enables users to include specific details to personalize the message for the recipient.
-   **Spam Analysis:** Calculates a spam score to help users avoid sending messages that are likely to be flagged as spam.
-   **User Authentication:** Implements user authentication using Clerk.
-   **Subscription Tiers:** Offers different subscription tiers with varying message limits and features.
-   **Message History:** (Currently commented out in `src/app/page.js`, but component exists) Stores and displays previously generated messages (requires uncommenting the `MessageHistory` component within the `src/app/page.js` file)

## Technology Stack

-   **Frontend:**
    -   React
    -   Next.js
    -   Clerk (for authentication)
    -   Tailwind CSS (for styling)
    -   `next/font` (Geist and Geist Mono)
-   **Backend:**
    -   Node.js
    -   Next.js API routes
    -   Mongoose (for MongoDB interaction)
-   **AI Integration:**
    -   OpenRouter.ai (DeepSeek API)
-   **Database:**
    -   MongoDB

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js (version 18 or later)
-   npm or yarn package manager
-   MongoDB database
-   Clerk account and API keys
-   OpenRouter.ai API Key (DeepSeek API)

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MrAnsif/coldreach-ai.git
    cd coldreach-ai
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory of the project and add the following environment variables:

    ```
    MONGODB_URI=<Your MongoDB connection string>
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Your Clerk publishable key>
    CLERK_SECRET_KEY=<Your Clerk secret key>
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    DEEPSEEK_API_KEY=<Your DeepSeek API key from OpenRouter.ai>
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    ```

    Replace the placeholder values with your actual credentials.

4.  **Run database migrations (if necessary):**

    This project assumes your MongoDB schema is automatically updated upon saving the model. If you require manual migration steps, please implement them.

5.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage Guide

1.  **Sign in/Sign up:** Use the Clerk authentication on the top right corner to sign in or sign up for an account.

2.  **Message Form:** The main page (`/`) contains a multi-step form to customize your outreach message.

    -   **Step 1: Message Type:** Select the message type (email, LinkedIn, or Twitter), tone, format, context and length.  Enter a call to action.
    -   **Step 2: Sender Details:** Enter your information (full name, job title, company).
    -   **Step 3: Recipient Details:** Enter recipient information (name, job title, company, shared connection, personalization triggers).

3.  **Generate Message:** Click the "Generate Message" button to generate the outreach message. The generated message and its spam score will be displayed below the form.

4.  **Subscription Tier:**  The `SubscriptionTier` component displays the available subscription tiers and their features.

## API Documentation

The application includes a single API endpoint for generating messages:

-   **`POST /api/generate`**

    This endpoint accepts a JSON payload with the following structure:

    ```json
    {
      "inputs": {
        "messageType": "email",
        "tone": "friendly",
        "format": "paragraph",
        "context": "sales",
        "length": "medium",
        "cta": "Schedule a call",
        "senderInfo": {
          "fullName": "John Doe",
          "jobTitle": "Sales Manager",
          "company": "Acme Corp"
        },
        "recipientInfo": {
          "name": "Jane Smith",
          "jobTitle": "Marketing Director",
          "company": "Beta Inc",
          "sharedConnection": "John Doe",
          "triggers": ["Interested in AI"]
        }
      }
    }
    ```

    The endpoint returns a JSON response with the following structure:

    ```json
    {
      "message": "Generated outreach message",
      "spamScore": 25
    }
    ```

    If an error occurs, the endpoint returns a JSON response with an error message and status code 500.

    ```json
    {
      "error": "Failed to generate message",
      "details": "Error message"
    }
    ```

    The API uses the DeepSeek API via OpenRouter.ai to generate the message based on the prompt built using the user inputs. Ensure that the `DEEPSEEK_API_KEY` environment variable is set correctly.

## Contributing Guidelines

Contributions are welcome! To contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Test your changes thoroughly.
5.  Submit a pull request with a clear description of your changes.

## License Information

This project has no specified license. All rights are reserved.

## Contact/Support Information

For questions, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/MrAnsif/coldreach-ai).