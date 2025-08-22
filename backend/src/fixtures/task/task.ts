import type { GetTasks } from "../../types/task.js";

export const GET_TASKS_DATA: GetTasks = Array.from(
  { length: 3 },
  (value, index) => ({
    id: index,
    uuid: `${value}-${index}`,
    title: `test-${index}`,
    description: `description-${index}`,
    position: index,
    createdAt: new Date(),
    updatedAt: new Date(),
    statusId: index,
    status: {
      id: index,
      name: `status-${index}`,
      color: `color-${index}`,
      isDefault: true,
      position: index,
    },
  }),
);
