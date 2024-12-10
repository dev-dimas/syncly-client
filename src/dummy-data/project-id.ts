export type Task = {
  title: string;
  description: string;
  status: "Active" | "Paused" | "Completed";
  dueDate: string;
  assignedTo: {
    userId: string;
    name: string;
    avatar: string;
  }[];
  assignedCount: number;
  createdAt: string;
};

export type ProjectIDPlaceholderType = {
  title: string;
  member: {
    userId: string;
    name: string;
    avatar: string;
  }[];
  memberCount: number;
  owner: string;
  createdAt: string;
  activeTask: Task[];
  completedTask: Task[];
  overdueTask: Task[];
};

const TASK: Task[] = [
  {
    title: "Task 1",
    description: "Description 1",
    status: "Active",
    dueDate: "2024-01-08T00:00:00.000Z",
    assignedTo: [
      {
        userId: "userId-1",
        name: "Fabriano Moza",
        avatar: "#",
      },
      {
        userId: "userId-2",
        name: "Damian Blaise",
        avatar: "#",
      },
      {
        userId: "userId-3",
        name: "Rafael Ortega",
        avatar: "#",
      },
    ],
    assignedCount: 20,
    createdAt: "2024-01-08T00:00:00.000Z",
  },
];

export const PLACEHOLDER: ProjectIDPlaceholderType = {
  title: "Timmy - SaaS Website",
  member: [
    {
      userId: "userId-1",
      name: "Fabriano Moza",
      avatar: "#",
    },
    {
      userId: "userId-2",
      name: "Damian Blaise",
      avatar: "#",
    },
    {
      userId: "userId-3",
      name: "Rafael Ortega",
      avatar: "#",
    },
    {
      userId: "userId-4",
      name: "Walter Smith",
      avatar: "#",
    },
  ],
  memberCount: 10,
  owner: "Fabriano Moza",
  activeTask: TASK,
  completedTask: [{ ...TASK[0], title: "Completed Task" }],
  overdueTask: [{ ...TASK[0], title: "Overdue Task" }],
  createdAt: "2024-01-08T00:00:00.000Z",
};
