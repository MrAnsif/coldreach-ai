import { SYSTEM_PROMPTS } from './systemPrompts';
import { getTemplate } from './templates';

export const buildPrompt = (inputs) => {
  const {
    messageType, // email/linkedin/twitter
    tone, // formal/casual/friendly
    format, // paragraph/bullet
    context, // sales/job/partnership/content
    length, // short/medium/long
    senderInfo,
    recipientInfo,
    triggers,
    cta
  } = inputs;

  // Get the appropriate system prompt
  const systemPrompt = SYSTEM_PROMPTS[context] || SYSTEM_PROMPTS.sales;

  // Get the template
  let userPrompt = getTemplate(messageType);

  // Replace placeholders
  userPrompt = userPrompt
    .replace('{tone}', tone)
    .replace('{format}', format)
    .replace('{context}', context)
    .replace('{length}', length)
    .replace('{cta}', cta)
    .replace('{senderName}', senderInfo.fullName)
    .replace('{senderTitle}', senderInfo.jobTitle)
    .replace('{senderCompany}', senderInfo.company)
    .replace('{recipientName}', recipientInfo.name)
    .replace('{recipientTitle}', recipientInfo.jobTitle)
    .replace('{recipientCompany}', recipientInfo.company)
    .replace('{triggers}', triggers.join(', '))
    .replace('{connection}', recipientInfo.sharedConnection || 'none');

  return {
    systemPrompt,
    userPrompt
  };
};