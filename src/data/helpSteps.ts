import { HelpStep } from '../interfaces/dataInterface'

export const helpSteps: HelpStep[] = [
  {
    iconName: 'Create',
    title: 'Write Your Document',
    description:
      'Start by writing your document content in the editor. Use the formatting tools to style your text.',
    tips: [
      'Use headings for structure',
      'Bold important terms',
      'Format for readability',
    ],
  },
  {
    iconName: 'Mouse',
    title: 'Select Text',
    description:
      'Select any text in your document that should be replaced with dynamic content.',
    tips: [
      'Drag to select text',
      'Selection triggers automatic assignment',
      'Or use manual assign button',
    ],
  },
  {
    iconName: 'Timer',
    title: 'Wait for Modal',
    description:
      'After selecting text, wait 700ms for the assignment modal to appear automatically.',
    tips: [
      'Modal appears after delay',
      'Ensures complete selection',
      'Can also assign manually',
    ],
  },
  {
    iconName: 'Assignment',
    title: 'Assign Fields',
    description:
      'Choose a field type and provide a variable name for your selected text.',
    tips: [
      'Select from existing fields',
      'Create new fields if needed',
      'Use descriptive variable names',
    ],
  },
  {
    iconName: 'Visibility',
    title: 'Preview Document',
    description:
      'Use the preview section to see how your template will look with sample data.',
    tips: [
      'Edit sample values',
      'See real-time updates',
      'Download when ready',
    ],
  },
  {
    iconName: 'Save',
    title: 'Save Template',
    description:
      'Provide a name and description, then save your template for future use.',
    tips: [
      'Descriptive names help',
      'Add detailed descriptions',
      'Templates can be reused',
    ],
  },
]
