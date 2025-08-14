export interface Room {
  id: string;
  name: string;
  icon: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isSent: boolean;
  transactionId?: string;
}

export interface BotMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

export const dummyRooms: Room[] = [
  {
    id: '1',
    name: 'General Chat',
    icon: '💬',
    lastMessage: 'Hey everyone! How\'s it going?',
    timestamp: '2:30 PM',
    unreadCount: 3
  },
  {
    id: '2',
    name: 'Project Alpha',
    icon: '🚀',
    lastMessage: 'The deployment was successful!',
    timestamp: '1:45 PM',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Design Team',
    icon: '🎨',
    lastMessage: 'New mockups are ready for review',
    timestamp: '12:15 PM',
    unreadCount: 5
  },
  {
    id: '4',
    name: 'Development',
    icon: '💻',
    lastMessage: 'Code review needed for PR #123',
    timestamp: '11:30 AM',
    unreadCount: 1
  },
  {
    id: '5',
    name: 'Marketing',
    icon: '📈',
    lastMessage: 'Campaign performance metrics',
    timestamp: 'Yesterday',
    unreadCount: 0
  }
];

export const dummyMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      content: 'Hey everyone! How\'s the new project coming along?',
      sender: 'Alice Johnson',
      timestamp: '2:25 PM',
      isSent: false,
      transactionId: 'tx_abc123'
    },
    {
      id: '2',
      content: 'Going great! We just finished the initial design phase.',
      sender: 'You',
      timestamp: '2:26 PM',
      isSent: true,
      transactionId: 'tx_def456'
    },
    {
      id: '3',
      content: 'That sounds awesome! Can\'t wait to see the mockups.',
      sender: 'Bob Smith',
      timestamp: '2:28 PM',
      isSent: false,
      transactionId: 'tx_ghi789'
    },
    {
      id: '4',
      content: 'I\'ll share them in the design channel shortly!',
      sender: 'You',
      timestamp: '2:30 PM',
      isSent: true,
      transactionId: 'tx_jkl012'
    }
  ],
  '2': [
    {
      id: '1',
      content: 'The deployment to production went smoothly!',
      sender: 'DevOps Team',
      timestamp: '1:40 PM',
      isSent: false,
      transactionId: 'tx_deploy001'
    },
    {
      id: '2',
      content: 'Excellent work! All tests are passing.',
      sender: 'You',
      timestamp: '1:45 PM',
      isSent: true,
      transactionId: 'tx_deploy002'
    }
  ]
};

export const dummyBotMessages: BotMessage[] = [
  {
    id: '1',
    content: 'Hello! I\'m your AI assistant. How can I help you today?',
    isBot: true,
    timestamp: '2:00 PM'
  },
  {
    id: '2',
    content: 'Hi there! Can you help me with project management tips?',
    isBot: false,
    timestamp: '2:01 PM'
  },
  {
    id: '3',
    content: 'Of course! Here are some effective project management tips:\n\n1. Set clear goals and objectives\n2. Break tasks into smaller, manageable pieces\n3. Use project management tools for tracking\n4. Communicate regularly with your team\n5. Monitor progress and adjust as needed',
    isBot: true,
    timestamp: '2:02 PM'
  }
];