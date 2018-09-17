export class Task {
    $id?: string;
    taskId?: number;
    summary: string;
    description?: string;
    startDate?: any;
    endDate?: any;
    priority?: number;
    status?: string;
    projectId: number;
    parentId?: number;
    userId?: number;
  }
